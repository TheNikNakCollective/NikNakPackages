import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'

export function login(router: express.Router, ctx: AppContext) {
    router.post(
        '/login',
        handler(async function login(req, res) {
          const handle = req.body?.handle

          const url = await ctx.oauthClient.authorize(handle, {
            scope: 'atproto transition:generic',
          })
          
          console.log('url', url);

          return res.status(200).json({ url: url.toString() })
        })
      )
}