// Configuration for GIF functionality
export const GIF_CONFIG = {
  // Enable/disable GIF fetching globally
  enabled: true,
  
  // Cache size limit (number of GIFs to cache)
  maxCacheSize: 100,
  
  // Request timeout in milliseconds
  requestTimeout: 5000,
  
  // Retry attempts for failed requests
  retryAttempts: 2,
  
  // Debounce delay for form preview (ms)
  previewDebounce: 800,
  
  // Default size preferences
  defaultSize: 'medium' as const,
  
  // Rate limiting
  maxRequestsPerMinute: 30,
} as const

export type GifSize = 'small' | 'medium' | 'large'