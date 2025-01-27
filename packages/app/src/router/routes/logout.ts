import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'
import { getIronSession } from 'iron-session'
import { Session } from '../session'
import { env } from '@app/env'

export function logout(router: express.Router, ctx: AppContext) {
    router.post(
        '/logout',
        handler(async (req, res) => {
            const session = await getIronSession<Session>(req, res, {
                cookieName: 'sid',
                password: env.COOKIE_SECRET,
            })

            session.destroy()

            return res.redirect('/')
        })
    )
}
