import { Suspense } from 'react'
import Link from 'next/link'
import { FaEthereum, FaArrowLeft } from 'react-icons/fa'
import { WalletClient } from './components/WalletClient'

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaEthereum className="h-8 w-8 text-gray-900" />
              <h1 className="text-2xl font-semibold text-gray-900">Cloudchain</h1>
            </div>
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <FaArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-2">Digital Wallet</h2>
          <p className="text-gray-600">
            Send and receive Ethereum transactions on Sepolia testnet
          </p>
        </div>

        <Suspense fallback={<WalletLoading />}>
          <WalletClient />
        </Suspense>
      </main>
    </div>
  )
}

function WalletLoading() {
  return (
    <div className="space-y-8">
      {/* Wallet info skeleton */}
      <div className="bg-white border border-gray-100 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-6 bg-gray-100 rounded w-32"></div>
            <div className="h-8 bg-gray-100 rounded w-48"></div>
          </div>
          <div className="h-12 w-24 bg-gray-100 rounded"></div>
        </div>
      </div>
      
      {/* Form skeleton */}
      <div className="bg-white border border-gray-100 rounded-lg p-6">
        <div className="h-6 bg-gray-100 rounded w-40 mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 rounded"></div>
          <div className="h-12 bg-gray-100 rounded"></div>
          <div className="h-12 bg-gray-100 rounded"></div>
          <div className="h-12 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  )
}