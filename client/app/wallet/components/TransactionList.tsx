'use client'

import type { FormattedTransaction, LoadingState } from '../../../lib/types/blockchain'
import { TransactionCard } from './TransactionCard'
import { RefreshButton } from './RefreshButton'
import { EmptyState, LoadingState as Loading } from './TransactionStates'
import { ErrorAlert } from './ErrorAlert'
import { TransactionCounter } from './TransactionCounter'

interface TransactionListProps {
  transactions: FormattedTransaction[]
  loading: LoadingState
  onRefresh: () => void
}

/**
 * TransactionList - Client Component (Container)
 * Orchestrates transaction display with proper state management
 * Minimal client-side logic, delegates to server components when possible
 */
export function TransactionList({ transactions, loading, onRefresh }: TransactionListProps) {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
        <RefreshButton 
          onRefresh={onRefresh}
          isLoading={loading.isLoading}
        />
      </div>

      {/* Error State */}
      {loading.error && (
        <ErrorAlert error={loading.error} className="mb-4" />
      )}

      {/* Content Section */}
      {loading.isLoading && transactions.length === 0 ? (
        <Loading />
      ) : transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((transaction, index) => (
            <TransactionCard key={index} transaction={transaction} />
          ))}
        </div>
      )}

      {/* Footer Section */}
      <TransactionCounter count={transactions.length} className="mt-4" />
    </div>
  )
}