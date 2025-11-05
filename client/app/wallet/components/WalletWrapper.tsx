'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import WalletClient to avoid SSR issues
const WalletClient = dynamic(
  () => import('./WalletClient').then(mod => ({ default: mod.WalletClient })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">⏳</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-gray-900">Loading Wallet</h2>
            <p className="text-gray-600">
              Initializing blockchain connection...
            </p>
          </div>
        </div>
      </div>
    )
  }
)

export function WalletWrapper() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">⏳</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-gray-900">Loading Wallet</h2>
            <p className="text-gray-600">
              Initializing blockchain connection...
            </p>
          </div>
        </div>
      </div>
    }>
      <WalletClient />
    </Suspense>
  )
}