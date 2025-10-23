'use client'

import { FaSync } from 'react-icons/fa'

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
  return (
    <button
      onClick={onRefresh}
      disabled={isLoading}
      className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label="Refresh transactions"
    >
      <FaSync className={`h-3 w-3 ${isLoading ? 'opacity-50' : ''}`} />
      <span>Refresh</span>
    </button>
  )
}