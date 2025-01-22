import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'
import { getIronSession } from 'iron-session'
import { Session } from '../session'
import assert from 'node:assert'
import { env } from '@app/env'

export function oauthCallback(router: express.Router, ctx: AppContext) {
  router.get(
    '/oauth/callback',
    handler(async (req, res) => {
      const params = new URLSearchParams(req.originalUrl.split('?')[1])
      
      try {
        const { session } = await ctx.oauthClient.callback(params)

        const clientSession = await getIronSession<Session>(req, res, {
          cookieName: 'sid',
          password: env.COOKIE_SECRET,
        })

        assert(!clientSession.did, 'session already exists')

        clientSession.did = session.did

        await clientSession.save()
      } catch (err) {
        ctx.logger.error({ err }, 'oauth callback failed')

        return res.redirect('/?error')
      }

      return res.redirect('/')
    })
  )
}