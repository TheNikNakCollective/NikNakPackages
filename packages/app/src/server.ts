import type http from 'node:http'
import events from 'node:events'
import {
    createBidirectionalResolver,
    createIdResolver,
} from '@niknak/id-resolver'
import express from 'express'
import { env } from './env'
import { AppContext, createContextMiddleware } from './context'
import { createClient } from './auth/client'
import { RegisterRoutes } from './routes'
import swaggerUi from 'swagger-ui-express'
import prisma from '@niknak/prisma'

export class Server {
    constructor(
        public app: express.Application,
        public server: http.Server,
        public ctx: AppContext
    ) {}

    static async create(db: typeof prisma) {
        const baseIdResolver = createIdResolver()
        const resolver = createBidirectionalResolver(baseIdResolver)

        const oauthClient = await createClient(db)

        const swaggerDoc = await import('./swagger.json')

        const ctx = {
            db,
            logger: console,
            oauthClient,
            resolver,
        }

        const contextMiddleware = createContextMiddleware(ctx)

        const app = express()

        app.set('trust proxy', true)
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(contextMiddleware)

        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {}))
        app.get('/swagger.json', (req, res) => {
            res.json(swaggerDoc)
        })

        RegisterRoutes(app)

        app.use((_req, res) => {
            res.sendStatus(404)
        })

        const server = app.listen(env.PORT)

        await events.once(server, 'listening')

        return new Server(app, server, ctx)
    }

    async close() {
        this.ctx.logger.info('sigint received, shutting down')

        return new Promise<void>((resolve) => {
            this.server.close(() => {
                this.ctx.logger.info('server closed')
                resolve()
            })
        })
    }
}

export const run = async (db: typeof prisma) => {
    console.log('Starting server...')

    const server = await Server.create(db)

    const onCloseSignal = async () => {
        setTimeout(() => process.exit(1), 10000).unref() // Force shutdown after 10s
        await server.close()
        process.exit()
    }

    process.on('SIGINT', onCloseSignal)
    process.on('SIGTERM', onCloseSignal)

    console.log('Server successfully started!')
}
