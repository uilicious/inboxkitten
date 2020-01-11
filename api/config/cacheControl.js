/**
 * Configure the various level of cache controls
 */
module.exports = {
    // Frequent changing dynamic content
    "dynamic"  : "public, max-age=1, max-stale=5, stale-while-revalidate=10, stale-if-error=86400",
    
    // Rarely changing static content
    // with very aggressive caching
    "static"   : "public, max-age=60, max-stale=120, stale-while-revalidate=3600, stale-if-error=86400",

    // Immutable content
    "immutable": "public, max-age=36000, max-stale=72000, stale-while-revalidate=360000, stale-if-error=864000"
}