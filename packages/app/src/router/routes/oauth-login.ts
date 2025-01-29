import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'

export function oauthLogin(router: express.Router, ctx: AppContext) {
    router.post(
        '/oauth/login',
        handler(async function oauthLogin(req, res) {
          const handle = req.body?.handle

          const url = await ctx.oauthClient.authorize(handle, {
            scope: 'atproto transition:generic',
          })
          
          return res.status(200).json({ url: url.toString() })
        })
      )
}