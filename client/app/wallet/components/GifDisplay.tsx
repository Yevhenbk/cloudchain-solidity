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
        <div className={`${sizeClasses[size]} bg-slate-100 rounded-xl border-2 border-slate-200 flex items-center justify-center`}>
          <div className="w-6 h-6 border-3 border-slate-300 border-t-slate-700 rounded-full"></div>
        </div>
        {showKeyword && (
          <span className="text-slate-600 font-semibold truncate max-w-full">{keyword}</span>
        )}
      </div>
    )
  }

  if (error || !gif || imageError) {
    return (
      <div className={`flex flex-col items-center space-y-2 ${containerClasses[size]} ${className}`}>
        <div className={`${sizeClasses[size]} bg-slate-100 rounded-xl border-2 border-slate-200 flex items-center justify-center`}>
          <span className="text-slate-700 font-bold text-2xl">
            {keyword.charAt(0).toUpperCase()}
          </span>
        </div>
        {showKeyword && (
          <span className="text-slate-900 font-bold truncate max-w-full">
            {fallbackText || keyword}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${containerClasses[size]} ${className}`}>
      <div className={`${sizeClasses[size]} rounded-xl overflow-hidden border-2 border-slate-200`}>
        <img
          src={gif.images.fixed_height.url}
          alt={gif.title || keyword}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
      {showKeyword && (
        <span className="text-slate-900 font-bold truncate max-w-full" title={keyword}>
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
      <div className={`inline-block w-6 h-6 bg-slate-100 rounded border-2 border-slate-200 ${className}`} />
    )
  }

  if (!gif || imageError) {
    return (
      <span className={`inline-flex items-center justify-center w-6 h-6 bg-slate-100 text-slate-700 text-xs font-bold rounded border-2 border-slate-200 ${className}`}>
        {keyword.charAt(0).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={gif.images.fixed_width_small.url}
      alt={keyword}
      className={`inline-block w-6 h-6 rounded object-cover border-2 border-slate-200 ${className}`}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  )
}