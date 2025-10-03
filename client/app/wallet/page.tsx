import { Suspense } from 'react'
import Link from 'next/link'
import { FaEthereum } from 'react-icons/fa'
import { WalletClient } from './components/WalletClient'

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-2">
              <FaEthereum className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Cloudchain</h1>
            </Link>
            <nav>
              <Link 
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Digital Wallet</h2>
            <p className="text-gray-600">
              Send and receive Ethereum transactions on Sepolia testnet
            </p>
          </div>

          <Suspense fallback={<WalletLoading />}>
            <WalletClient />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

function WalletLoading() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
      <p className="text-gray-600">Loading wallet...</p>
    </div>
  )
}