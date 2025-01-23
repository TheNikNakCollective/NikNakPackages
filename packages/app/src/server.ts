import type http from 'node:http'
import events from 'node:events'
import { createBidirectionalResolver, createIdResolver } from '@niknak/id-resolver'
import express from 'express'
import { env } from './env'
import { AppContext } from './context'
import { createClient } from './auth/client'
import { NikNakDatabase } from '@niknak/orm'
import { createRouter } from './router'

export class Server {
    constructor(
        public app: express.Application,
        public server: http.Server,
        public ctx: AppContext
    ) {}

    static async create(db: NikNakDatabase) {
        const baseIdResolver = createIdResolver()
        const resolver = createBidirectionalResolver(baseIdResolver)

        const oauthClient = await createClient(db)

        const ctx = {
            db,
            logger: console,
            oauthClient,
            resolver,
        }

        const app = express()
        const router = createRouter(ctx)
        
        app.set('trust proxy', true)
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(router)
        app.use((_req, res) => res.sendStatus(404))

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

export const run = async (db: NikNakDatabase) => {
    console.log('Starting server...')
    
    const server = await Server.create(db)

    const onCloseSignal = async () => {
        setTimeout(() => process.exit(1), 10000).unref() // Force shutdown after 10s
        await server.close()
        process.exit()
    }

    process.on('SIGINT', onCloseSignal)
    process.on('SIGTERM', onCloseSignal)

    console.log('Server successfully started!');
}
