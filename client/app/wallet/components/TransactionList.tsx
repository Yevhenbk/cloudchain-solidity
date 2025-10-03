'use client'

import type { FormattedTransaction, LoadingState } from '../../../lib/types/blockchain'
import { shortenAddress } from '../../../lib/utils/blockchain'
import { FaSync } from 'react-icons/fa'
import { GifDisplay, InlineGif } from './GifDisplay'

interface TransactionListProps {
  transactions: FormattedTransaction[]
  loading: LoadingState
  onRefresh: () => void
}

export function TransactionList({ transactions, loading, onRefresh }: TransactionListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
        <button
          onClick={onRefresh}
          disabled={loading.isLoading}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <FaSync className={`h-3 w-3 ${loading.isLoading ? 'opacity-50' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading.error && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm mb-4">
          {loading.error}
        </div>
      )}

      {loading.isLoading && transactions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-4 animate-spin"></div>
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-600 mb-2">No transactions yet</p>
          <p className="text-sm text-gray-500">
            Send your first transaction to see it appear here!
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((transaction, index) => (
            <TransactionCard key={index} transaction={transaction} />
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}

function TransactionCard({ transaction }: { transaction: FormattedTransaction }) {
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