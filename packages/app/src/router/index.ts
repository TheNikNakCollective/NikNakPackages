import { AppContext } from "@app/context";
import express from 'express'
import { oauthLogin } from "./routes/oauth-login";
import { oauthLogout } from "./routes/oauth-logout";
import { oauthCallback } from "./routes/oauth-callback";
import { healthcheck } from "./routes/healthcheck";
import { oauthUserInfo } from "./routes/oauth-userinfo";
import { oauthRefresh } from "./routes/oauth-refresh";

export function createRouter(ctx: AppContext) {
    const router = express.Router()

    healthcheck(router, ctx);
    oauthLogin(router, ctx);
    oauthLogout(router, ctx);
    oauthCallback(router, ctx);
    oauthUserInfo(router, ctx);
    oauthRefresh(router, ctx);
    
    return router;
}