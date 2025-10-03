'use client'

import type { FormattedTransaction, LoadingState } from '../../../lib/types/blockchain'
import { shortenAddress } from '../../../lib/utils/blockchain'
import { FaSync } from 'react-icons/fa'

interface TransactionListProps {
  transactions: FormattedTransaction[]
  loading: LoadingState
  onRefresh: () => void
}

export function TransactionList({ transactions, loading, onRefresh }: TransactionListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        <button
          onClick={onRefresh}
          disabled={loading.isLoading}
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          <FaSync className={`h-3 w-3 ${loading.isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {loading.error && (
        <div className="error mb-4">
          {loading.error}
        </div>
      )}

      {loading.isLoading && transactions.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-600 mb-2">No transactions yet</p>
          <p className="text-sm text-gray-500">
            Send your first transaction to see it appear here!
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
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
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <span className="text-lg font-semibold text-blue-600">
          {transaction.amount} ETH
        </span>
        <span className="text-xs text-gray-500">
          {transaction.timestamp}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">From:</span>
          <code className="text-gray-900 font-mono">
            {shortenAddress(transaction.addressFrom)}
          </code>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">To:</span>
          <code className="text-gray-900 font-mono">
            {shortenAddress(transaction.addressTo)}
          </code>
        </div>

        {transaction.message && (
          <div className="pt-2 border-t">
            <span className="text-gray-600">Message:</span>
            <p className="text-gray-900 italic mt-1">{transaction.message}</p>
          </div>
        )}

        {transaction.keyword && (
          <div className="pt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {transaction.keyword}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}