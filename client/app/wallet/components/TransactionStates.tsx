/**
 * EmptyState - Server Component
 * Displays when no transactions are available
 * Pure presentation component with no interactions
 */
export function EmptyState() {
  return (
    <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
      <p className="text-gray-600 mb-2">No transactions yet</p>
      <p className="text-sm text-gray-500">
        Send your first transaction to see it appear here!
      </p>
    </div>
  )
}

/**
 * LoadingState - Server Component  
 * Displays loading indicator with message
 * Static presentation component
 */
export function LoadingState({ message = "Loading transactions..." }: { message?: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-4 animate-spin"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  )
}