import express from 'express'

export function handler<T = void>(
    fn: (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => Promise<T>
) {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}
