'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { fetchGifByKeyword, type GiphyGif } from '../utils/giphy'
import { GIF_CONFIG } from '../utils/gifConfig'

// Debounce utility
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

interface UseGifOptions {
  keyword?: string
  enabled?: boolean
  debounced?: boolean
  debounceDelay?: number
}

interface UseGifReturn {
  gif: GiphyGif | null
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Custom hook to fetch and manage GIF state based on keywords
 */
export function useGif({ 
  keyword, 
  enabled = true, 
  debounced = false,
  debounceDelay = GIF_CONFIG.previewDebounce 
}: UseGifOptions): UseGifReturn {
  const [gif, setGif] = useState<GiphyGif | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Apply debouncing if requested (useful for form previews)
  const debouncedKeyword = useDebounce(keyword || '', debounceDelay)
  const effectiveKeyword = debounced ? debouncedKeyword : keyword

  const fetchGif = useCallback(async () => {
    if (!effectiveKeyword || !enabled || !GIF_CONFIG.enabled) {
      setGif(null)
      setLoading(false)
      setError(null)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const fetchedGif = await fetchGifByKeyword(effectiveKeyword)
      setGif(fetchedGif)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GIF')
      setGif(null)
    } finally {
      setLoading(false)
    }
  }, [effectiveKeyword, enabled])

  // Fetch GIF when keyword changes
  useEffect(() => {
    fetchGif()
  }, [fetchGif])

  const refetch = useCallback(() => {
    fetchGif()
  }, [fetchGif])

  return {
    gif,
    loading,
    error,
    refetch
  }
}

/**
 * Hook for managing multiple GIFs (useful for transaction lists)
 */
export function useMultipleGifs(keywords: string[]): Record<string, UseGifReturn> {
  const [gifsState, setGifsState] = useState<Record<string, UseGifReturn>>({})

  useEffect(() => {
    const fetchAllGifs = async () => {
      const newState: Record<string, UseGifReturn> = {}

      for (const keyword of keywords) {
        if (!keyword) continue

        newState[keyword] = {
          gif: null,
          loading: true,
          error: null,
          refetch: () => {}
        }
      }

      setGifsState(newState)

      // Fetch GIFs concurrently
      const promises = keywords.map(async (keyword) => {
        if (!keyword) return

        try {
          const gif = await fetchGifByKeyword(keyword)
          setGifsState(prev => ({
            ...prev,
            [keyword]: {
              gif,
              loading: false,
              error: null,
              refetch: () => {}
            }
          }))
        } catch (error) {
          setGifsState(prev => ({
            ...prev,
            [keyword]: {
              gif: null,
              loading: false,
              error: error instanceof Error ? error.message : 'Failed to fetch GIF',
              refetch: () => {}
            }
          }))
        }
      })

      await Promise.all(promises)
    }

    if (keywords.length > 0) {
      fetchAllGifs()
    }
  }, [keywords])

  return gifsState
}