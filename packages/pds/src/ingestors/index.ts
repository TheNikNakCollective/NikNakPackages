import { IdResolver } from "@atproto/identity";
import { ingestors as BksyIngestors } from "./bksy";
import { Database } from "@app/database";
import { Ingestor } from "./ingestor";

export class Ingestors {
  private ingestors: Ingestor[];

  constructor(idResolver: IdResolver, db: Database) {
    this.ingestors = [...BksyIngestors].map((Ingestor) => {
      return new Ingestor(idResolver, db);
    });
  }

  public async start() {
    await Promise.all(
      this.ingestors.map(async (ingestor) => {
        await ingestor.start();
      }),
    );
  }

  public async destroy() {
    await Promise.all(
      this.ingestors.map(async (ingestor) => {
        await ingestor.destory();
      }),
    );
  }
}
