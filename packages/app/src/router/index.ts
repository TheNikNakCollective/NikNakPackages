import { AppContext } from "@app/context";
import express from 'express'
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { oauthCallback } from "./routes/oauth-callback";
import { healthcheck } from "./routes/healthcheck";
import { me } from "./routes/me";
import { oauthRefresh } from "./routes/oauth-refresh";

export function createRouter(ctx: AppContext) {
    const router = express.Router()

    healthcheck(router, ctx);
    login(router, ctx);
    logout(router, ctx);
    oauthCallback(router, ctx);
    me(router, ctx);
    oauthRefresh(router, ctx);
    
    return router;
}