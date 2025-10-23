import type { FormattedTransaction } from '../../../lib/types/blockchain'
import { shortenAddress } from '../../../lib/utils/blockchain'
import { GifDisplay } from './GifDisplay'

interface TransactionCardProps {
  transaction: FormattedTransaction
}

/**
 * TransactionCard - Server Component
 * Displays transaction details in a clean card format
 * Pure presentation component with no client-side interactions
 */
export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex justify-between items-start mb-3">
        <span className="text-lg font-medium text-gray-900">
          {transaction.amount} ETH
        </span>
        <span className="text-xs text-gray-500">
          {transaction.timestamp}
        </span>
      </div>

      <div className="flex gap-4">
        {/* Transaction Details */}
        <div className="flex-1 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">From:</span>
            <code className="text-gray-900 font-mono text-xs">
              {shortenAddress(transaction.addressFrom)}
            </code>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">To:</span>
            <code className="text-gray-900 font-mono text-xs">
              {shortenAddress(transaction.addressTo)}
            </code>
          </div>

          {transaction.message && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600">Message:</span>
              <p className="text-gray-900 mt-1">{transaction.message}</p>
            </div>
          )}
        </div>

        {/* GIF Display */}
        {transaction.keyword && (
          <div className="flex-shrink-0">
            <GifDisplay 
              keyword={transaction.keyword} 
              size="medium"
              className="max-w-24"
            />
          </div>
        )}
      </div>
    </div>
  )
}