/**
 * Configure the various level of cache controls
 */
module.exports = {
    // Frequent changing dynamic content
    "dynamic": "public, max-age=1, max-stale=1, stale-while-revalidate=10, stale-if-error=86400",
    
    // Rarely changing static content
    // with very aggressive caching
    "static": "public, max-age=10, max-stale=10, stale-while-revalidate=3600, stale-if-error=86400"
}