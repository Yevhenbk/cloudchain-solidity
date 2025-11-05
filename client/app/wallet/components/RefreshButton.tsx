'use client'

import { FaSync } from 'react-icons/fa'
import { useState, useEffect } from 'react'

interface RefreshButtonProps {
  onRefresh: () => void
  isLoading: boolean
  className?: string
}

/**
 * RefreshButton - Client Component
 * Handles user interaction for refreshing data
 * Isolated client-side behavior for optimal performance
 */
export function RefreshButton({ onRefresh, isLoading, className = '' }: RefreshButtonProps) {
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const handleRefresh = () => {
    onRefresh()
    setLastRefresh(new Date())
  }

  useEffect(() => {
    if (!isLoading && !lastRefresh) {
      setLastRefresh(new Date())
    }
  }, [isLoading, lastRefresh])

  return (
    <div className={`flex flex-col items-end space-y-1 ${className}`}>
      <button
        onClick={handleRefresh}
        disabled={isLoading}
        className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded-md border border-gray-200 hover:border-gray-300`}
        aria-label="Refresh transactions"
      >
        <FaSync className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
      </button>
      {lastRefresh && (
        <span className="text-xs text-gray-400">
          Last updated: {lastRefresh.toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}