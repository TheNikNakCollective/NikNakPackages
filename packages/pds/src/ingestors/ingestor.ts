export interface IngestorConstructor {
    new (): Ingestor
}

export interface Ingestor {
    start(): Promise<void>
    destory(): Promise<void>
}
