// Giphy API utility functions
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_VITE_GIPHY_API || ''
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs'

export interface GiphyGif {
  id: string
  title: string
  images: {
    original: {
      url: string
      width: string
      height: string
    }
    fixed_height: {
      url: string
      width: string
      height: string
    }
    fixed_width_small: {
      url: string
      width: string
      height: string
    }
  }
}

export interface GiphyResponse {
  data: GiphyGif[]
  meta: {
    status: number
    msg: string
  }
}

// Cache for storing fetched GIFs to avoid repeated API calls
const gifCache = new Map<string, GiphyGif | null>()

/**
 * Fetch a GIF from Giphy API based on keyword
 * Returns the first suitable GIF or null if none found
 */
export async function fetchGifByKeyword(keyword: string): Promise<GiphyGif | null> {
  if (!keyword || !GIPHY_API_KEY) {
    return null
  }

  // Check cache first
  const cacheKey = keyword.toLowerCase().trim()
  if (gifCache.has(cacheKey)) {
    return gifCache.get(cacheKey) || null
  }

  try {
    const response = await fetch(
      `${GIPHY_BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(keyword)}&limit=10&rating=g&lang=en`
    )

    if (!response.ok) {
      throw new Error(`Giphy API error: ${response.status}`)
    }

    const data: GiphyResponse = await response.json()
    
    // Find a suitable GIF (prefer ones with reasonable dimensions)
    const suitableGif = data.data.find(gif => {
      const fixedHeight = gif.images.fixed_height
      const width = parseInt(fixedHeight.width)
      const height = parseInt(fixedHeight.height)
      
      // Prefer GIFs that aren't too tall or too wide
      return width > 100 && width < 500 && height > 100 && height < 400
    }) || data.data[0] // Fallback to first GIF if no suitable one found

    // Cache the result (even if null)
    gifCache.set(cacheKey, suitableGif || null)
    
    return suitableGif || null
  } catch (error) {
    console.error('Error fetching GIF from Giphy:', error)
    
    // Cache null result to avoid repeated failed requests
    gifCache.set(cacheKey, null)
    return null
  }
}

/**
 * Get a random trending GIF as fallback
 */
export async function getTrendingGif(): Promise<GiphyGif | null> {
  if (!GIPHY_API_KEY) return null

  try {
    const response = await fetch(
      `${GIPHY_BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=25&rating=g`
    )

    if (!response.ok) {
      throw new Error(`Giphy API error: ${response.status}`)
    }

    const data: GiphyResponse = await response.json()
    const randomIndex = Math.floor(Math.random() * data.data.length)
    
    return data.data[randomIndex] || null
  } catch (error) {
    console.error('Error fetching trending GIF:', error)
    return null
  }
}

/**
 * Clear the GIF cache (useful for memory management)
 */
export function clearGifCache(): void {
  gifCache.clear()
}