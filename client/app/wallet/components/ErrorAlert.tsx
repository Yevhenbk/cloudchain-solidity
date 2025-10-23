interface ErrorAlertProps {
  error: string
  className?: string
}

/**
 * ErrorAlert - Server Component
 * Displays error messages in a consistent format
 * Pure presentation component for error states
 */
export function ErrorAlert({ error, className = '' }: ErrorAlertProps) {
  return (
    <div className={`text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm ${className}`}>
      {error}
    </div>
  )
}