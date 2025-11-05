'use client'

import { useState, useEffect } from 'react'
import { useWallet, useTransactions } from '../../../lib/hooks/useWallet'
import { TransactionSchema } from '../../../lib/types/blockchain'
import { submitTransactionAction } from '../../../lib/actions/wallet'
import type { TransactionInput } from '../../../lib/types/blockchain'
import { TransactionList } from './TransactionList'
import { WalletInfo } from './WalletInfo'
import { ErrorBoundary } from './ErrorBoundary'
import { GifDisplay } from './GifDisplay'

export function WalletClient() {
  const [isMounted, setIsMounted] = useState(false)
  const { wallet, loading: walletLoading, isInitialized, connectWallet, refreshBalance } = useWallet()
  const { transactions, loading: transactionLoading, fetchTransactions, sendTransaction } = useTransactions(wallet.address)
  
  const [formData, setFormData] = useState<TransactionInput>({
    addressTo: '',
    amount: '',
    keyword: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Ensure component is mounted before rendering wallet-dependent content
  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  // Prevent hydration issues by ensuring client-side only rendering
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⏳</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-gray-900">Loading...</h2>
            <p className="text-gray-600">
              Preparing wallet interface...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show loading during initial connection check
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">⏳</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-gray-900">Checking Connection</h2>
            <p className="text-gray-600">
              Checking for existing wallet connection...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!wallet.isConnected) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🔗</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-gray-900">Connect Your Wallet</h2>
            <p className="text-gray-600">
              Connect your MetaMask wallet to start sending transactions
            </p>
          </div>
          <button
            onClick={connectWallet}
            disabled={walletLoading.isLoading}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {walletLoading.isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
          {walletLoading.error && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
              {walletLoading.error}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <WalletInfo 
          wallet={wallet} 
          onRefresh={refreshBalance}
          loading={walletLoading.isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Form */}
          <div className="bg-white border border-gray-100 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Send Transaction</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="addressTo" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  id="addressTo"
                  name="addressTo"
                  value={formData.addressTo}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    formErrors.addressTo ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {formErrors.addressTo && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.addressTo}</p>
                )}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    formErrors.amount ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {formErrors.amount && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.amount}</p>
                )}
              </div>

              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                        formErrors.keyword ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    {formErrors.keyword && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.keyword}</p>
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Optional message..."
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 ${
                    formErrors.message ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || transactionLoading.isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors duration-200"
              >
                {isSubmitting ? 'Sending...' : 'Send Transaction'}
              </button>
            </form>
          </div>

          {/* Transaction List */}
          <div className="bg-white border border-gray-100 rounded-lg p-6">
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