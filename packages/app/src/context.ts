import { OAuthClient } from '@atproto/oauth-client-node'
import { BidirectionalResolver } from '@niknak/id-resolver'
import prisma from '@niknak/prisma'
import { NextFunction, Request, Response } from 'express'

export interface AppContext {
    db: typeof prisma
    logger: Console
    oauthClient: OAuthClient
    resolver: BidirectionalResolver
}

export interface RequestWithAppContext extends Request {
    context: AppContext
}

export function Context(): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        Reflect.defineMetadata(
            `context:${String(propertyKey)}:${parameterIndex}`,
            true,
            target
        )
    }
}

export function createContextMiddleware(ctx: AppContext) {
    return function contextMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        ;(req as RequestWithAppContext).context = ctx
        next()
    }
}
