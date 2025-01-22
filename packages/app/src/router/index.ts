import { AppContext } from "@app/context";
import express from 'express'
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { oauthCallback } from "./routes/oauth-callback";

export function createRouter(ctx: AppContext) {
    const router = express.Router()

    login(router, ctx);
    logout(router, ctx);
    oauthCallback(router, ctx);
    
    return router;
}