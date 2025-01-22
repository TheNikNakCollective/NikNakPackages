import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'

export function healthcheck(router: express.Router, _ctx: AppContext) {
    router.post(
        '/healthcheck',
        handler(async (_res, res) => {
          res.status(200).send('healthy')
        })
      )
}