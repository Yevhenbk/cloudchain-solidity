interface TransactionCounterProps {
  count: number
  className?: string
}

/**
 * TransactionCounter - Server Component
 * Displays transaction count with proper pluralization
 * Pure presentation component with computed text
 */
export function TransactionCounter({ count, className = '' }: TransactionCounterProps) {
  if (count === 0) return null

  return (
    <p className={`text-sm text-gray-500 text-center ${className}`}>
      Showing {count} transaction{count !== 1 ? 's' : ''}
    </p>
  )
}