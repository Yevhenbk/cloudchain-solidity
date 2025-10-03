'use client'

import { useState } from 'react'
import { useGif } from '../../../lib/hooks/useGif'
import type { GiphyGif } from '../../../lib/utils/giphy'

interface GifDisplayProps {
  keyword: string
  className?: string
  size?: 'small' | 'medium' | 'large'
  showKeyword?: boolean
  fallbackText?: string
  debounced?: boolean
}

export function GifDisplay({ 
  keyword, 
  className = '', 
  size = 'medium',
  showKeyword = true,
  fallbackText,
  debounced = false
}: GifDisplayProps) {
  const { gif, loading, error } = useGif({ keyword, debounced })
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const containerClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  }

  if (loading) {
    return (
      <div className={`flex flex-col items-center space-y-2 ${containerClasses[size]} ${className}`}>
        <div className={`${sizeClasses[size]} bg-gray-200 rounded-lg animate-pulse flex items-center justify-center`}>
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        {showKeyword && (
          <span className="text-gray-600 truncate max-w-full">{keyword}</span>
        )}
      </div>
    )
  }

  if (error || !gif || imageError) {
    return (
      <div className={`flex flex-col items-center space-y-2 ${containerClasses[size]} ${className}`}>
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border-2 border-blue-300`}>
          <span className="text-blue-800 font-bold text-lg">
            {keyword.charAt(0).toUpperCase()}
          </span>
        </div>
        {showKeyword && (
          <span className="text-gray-700 font-medium truncate max-w-full">
            {fallbackText || keyword}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${containerClasses[size]} ${className}`}>
      <div className={`${sizeClasses[size]} rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm`}>
        <img
          src={gif.images.fixed_height.url}
          alt={gif.title || keyword}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
      {showKeyword && (
        <span className="text-gray-700 font-medium truncate max-w-full" title={keyword}>
          {keyword}
        </span>
      )}
    </div>
  )
}

// Inline GIF component for smaller displays
export function InlineGif({ keyword, className = '' }: { keyword: string; className?: string }) {
  const { gif, loading } = useGif({ keyword })
  const [imageError, setImageError] = useState(false)

  if (loading) {
    return (
      <div className={`inline-block w-6 h-6 bg-gray-200 rounded animate-pulse ${className}`} />
    )
  }

  if (!gif || imageError) {
    return (
      <span className={`inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-bold rounded ${className}`}>
        {keyword.charAt(0).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={gif.images.fixed_width_small.url}
      alt={keyword}
      className={`inline-block w-6 h-6 rounded object-cover ${className}`}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  )
}