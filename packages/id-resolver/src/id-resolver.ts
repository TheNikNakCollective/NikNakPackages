import { IdResolver, MemoryCache } from '@atproto/identity'

const HOUR = 60e3 * 60
const DAY = HOUR * 24

/**
 * Creates an instance of IdResolver with a memory cache.
 * The resolver is used to map decentralized identifiers (DIDs) to human-readable handles.
 *
 * @returns An instance of IdResolver configured with caching.
 */
export function createIdResolver() {
    return new IdResolver({
        didCache: new MemoryCache(HOUR, DAY),
    })
}

export interface BidirectionalResolver {
    /**
     * Resolves a single DID to its associated handle.
     *
     * @param {string} did - The decentralized identifier to resolve.
     * @returns {Promise<string>} The resolved handle or the original DID if resolution fails.
     */
    resolveDidToHandle(did: string): Promise<string>
    /**
     * Resolves multiple DIDs to their associated handles in parallel.
     * Gracefully handles errors by falling back to the original DID.
     *
     * @param {string[]} dids - An array of decentralized identifiers to resolve.
     * @returns {Promise<Record<string, string>>} A mapping of DIDs to their resolved handles.
     */
    resolveDidsToHandles(dids: string[]): Promise<Record<string, string>>
}

export function createBidirectionalResolver(
    resolver: IdResolver
): BidirectionalResolver {
    return {
        async resolveDidToHandle(did: string): Promise<string> {
            const didDoc = await resolver.did.resolveAtprotoData(did)
            const resolvedHandle = await resolver.handle.resolve(didDoc.handle)

            if (resolvedHandle === did) {
                return didDoc.handle
            }

            return did
        },

        async resolveDidsToHandles(
            dids: string[]
        ): Promise<Record<string, string>> {
            const didHandleMap: Record<string, string> = {}

            const resolves = await Promise.all(
                dids.map((did) =>
                    this.resolveDidToHandle(did).catch((_) => did)
                )
            )

            for (let i = 0; i < dids.length; i++) {
                didHandleMap[dids[i]] = resolves[i]
            }

            return didHandleMap
        },
    }
}
