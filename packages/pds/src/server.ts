import type http from "node:http";
import events from "node:events";
import { Database } from "./database";
import { createBidirectionalResolver, createIdResolver } from "./id-resolver";
import { Ingestors } from "./ingestors";
import express from "express";
import { env } from "./env";
import { AppContext } from "./context";
import pino from "pino";
import { createClient } from "./auth/client";

export class Server {
  constructor(
    public app: express.Application,
    public server: http.Server,
    public ctx: AppContext,
  ) {}

  static async create(db: Database) {
    const logger = pino({ name: "server start" });

    const baseIdResolver = createIdResolver();
    const resolver = createBidirectionalResolver(baseIdResolver);

    const ingestors = new Ingestors(baseIdResolver, db);

    await ingestors.start();

    const oauthClient = await createClient(db);

    const ctx = {
      db,
      ingestors,
      logger,
      oauthClient,
      resolver,
    };

    const app = express();

    app.set("trust proxy", true);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((_req, res) => res.sendStatus(404));

    const server = app.listen(env.PORT);

    await events.once(server, "listening");

    return new Server(app, server, ctx);
  }

  async close() {
    this.ctx.logger.info("sigint received, shutting down");

    await this.ctx.ingestors.destroy();

    return new Promise<void>((resolve) => {
      this.server.close(() => {
        this.ctx.logger.info("server closed");
        resolve();
      });
    });
  }
}

export const run = async (db: Database) => {
  const server = await Server.create(db);

  const onCloseSignal = async () => {
    setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    await server.close();
    process.exit();
  };

  process.on("SIGINT", onCloseSignal);
  process.on("SIGTERM", onCloseSignal);
};
