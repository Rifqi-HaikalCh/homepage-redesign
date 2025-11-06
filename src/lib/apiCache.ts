/**
 * Simple in-memory cache for API calls
 * Prevents duplicate simultaneous requests to the same endpoint
 * Auto-expires after 30 seconds
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  promise?: Promise<T>;
}

class APICache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private pendingRequests: Map<string, Promise<any>> = new Map();
  private readonly CACHE_DURATION = 30 * 1000; // 30 seconds

  /**
   * Fetch with caching and deduplication
   * Multiple simultaneous calls to the same endpoint will share the same Promise
   */
  async fetch<T>(url: string, init?: RequestInit): Promise<T> {
    const cacheKey = this.getCacheKey(url, init);

    // Check if data is in cache and still fresh
    const cachedEntry = this.cache.get(cacheKey);
    if (cachedEntry && this.isFresh(cachedEntry.timestamp)) {
      console.log(`📦 Cache HIT: ${url}`);
      return cachedEntry.data;
    }

    // Check if there's already a pending request for this URL
    const pendingRequest = this.pendingRequests.get(cacheKey);
    if (pendingRequest) {
      console.log(`⏳ Reusing pending request: ${url}`);
      return pendingRequest;
    }

    // Create new request
    console.log(`🌐 Cache MISS: ${url}`);
    const fetchPromise = this.performFetch<T>(url, init);

    // Store the pending promise
    this.pendingRequests.set(cacheKey, fetchPromise);

    try {
      const data = await fetchPromise;

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } finally {
      // Remove from pending requests
      this.pendingRequests.delete(cacheKey);
    }
  }

  private async performFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private getCacheKey(url: string, init?: RequestInit): string {
    // Create a cache key from URL and request method
    const method = init?.method || 'GET';
    return `${method}:${url}`;
  }

  private isFresh(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  /**
   * Clear all cached data
   */
  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
  }

  /**
   * Clear cache for a specific URL
   */
  clearUrl(url: string, init?: RequestInit): void {
    const cacheKey = this.getCacheKey(url, init);
    this.cache.delete(cacheKey);
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
export const apiCache = new APICache();

/**
 * Cached fetch function - drop-in replacement for fetch()
 * Usage: const data = await cachedFetch<Influencer[]>('/api/influencers')
 */
export async function cachedFetch<T = any>(
  url: string,
  init?: RequestInit
): Promise<T> {
  // Only cache GET requests
  if (!init?.method || init.method === 'GET') {
    return apiCache.fetch<T>(url, init);
  }

  // For non-GET requests, don't cache and clear related cache
  if (init.method === 'POST' || init.method === 'PUT' || init.method === 'DELETE') {
    // Clear cache for this URL
    apiCache.clearUrl(url);
  }

  // Perform the request without caching
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default apiCache;
