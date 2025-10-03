'use client'

import { useState } from 'react'
import { useWallet, useTransactions } from '../../../lib/hooks/useWallet'
import { TransactionSchema } from '../../../lib/types/blockchain'
import { submitTransactionAction } from '../../../lib/actions/wallet'
import type { TransactionInput } from '../../../lib/types/blockchain'
import { TransactionList } from './TransactionList'
import { WalletInfo } from './WalletInfo'
import { ErrorBoundary } from './ErrorBoundary'
import { GifDisplay } from './GifDisplay'

export function WalletClient() {
  const { wallet, loading: walletLoading, connectWallet, refreshBalance } = useWallet()
  const { transactions, loading: transactionLoading, fetchTransactions, sendTransaction } = useTransactions(wallet.address)
  
  const [formData, setFormData] = useState<TransactionInput>({
    addressTo: '',
    amount: '',
    keyword: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field-specific error
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validation = TransactionSchema.safeParse(formData)
    if (!validation.success) {
      const errors: Record<string, string> = {}
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as string] = issue.message
        }
      })
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setFormErrors({})

    try {
      // Send transaction
      const result = await sendTransaction(formData)
      
      if (result.success) {
        // Server action for optimistic updates
        await submitTransactionAction(formData)
        
        // Clear form
        setFormData({
          addressTo: '',
          amount: '',
          keyword: '',
          message: ''
        })
        
        // Refresh balance
        await refreshBalance()
        
        alert('Transaction sent successfully!')
      } else {
        alert(result.error || 'Transaction failed')
      }
    } catch (error) {
      console.error('Transaction error:', error)
      alert('Transaction failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!wallet.isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-8">
          Connect your MetaMask wallet to start sending transactions
        </p>
        <button
          onClick={connectWallet}
          disabled={walletLoading.isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          {walletLoading.isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
        {walletLoading.error && (
          <div className="error mt-4">
            {walletLoading.error}
          </div>
        )}
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        <WalletInfo 
          wallet={wallet} 
          onRefresh={refreshBalance}
          loading={walletLoading.isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Transaction Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Transaction</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="addressTo" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  id="addressTo"
                  name="addressTo"
                  value={formData.addressTo}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.addressTo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.addressTo && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.addressTo}</p>
                )}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.001"
                  step="0.000001"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.amount && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
                )}
              </div>

              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                  Keyword
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      value={formData.keyword}
                      onChange={handleInputChange}
                      placeholder="e.g., Payment, Happy, Cat"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.keyword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.keyword && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.keyword}</p>
                    )}
                  </div>
                  {formData.keyword && (
                    <div className="flex-shrink-0">
                      <GifDisplay 
                        keyword={formData.keyword} 
                        size="small"
                        showKeyword={false}
                        fallbackText="Preview"
                        debounced={true}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Optional message..."
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || transactionLoading.isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Transaction'}
              </button>
            </form>
          </div>

          {/* Transaction List */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <TransactionList
              transactions={transactions}
              loading={transactionLoading}
              onRefresh={fetchTransactions}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}