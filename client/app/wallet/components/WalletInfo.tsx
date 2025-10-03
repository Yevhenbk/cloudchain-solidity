'use client'

import type { WalletState } from '../../../lib/types/blockchain'
import { shortenAddress } from '../../../lib/utils/blockchain'
import { FaEthereum, FaSync } from 'react-icons/fa'

interface WalletInfoProps {
  wallet: WalletState
  onRefresh: () => void
  loading: boolean
}

export function WalletInfo({ wallet, onRefresh, loading }: WalletInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Wallet Info</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          title="Refresh balance"
        >
          <FaSync className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-gray-100 px-3 py-1 rounded">
              {shortenAddress(wallet.address || '')}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(wallet.address || '')}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Copy
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Balance
          </label>
          <div className="flex items-center space-x-2">
            <FaEthereum className="h-4 w-4 text-blue-600" />
            <span className="text-lg font-semibold">
              {parseFloat(wallet.balance).toFixed(6)} ETH
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Network
          </label>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            wallet.chainId === 11155111 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {wallet.chainId === 11155111 ? 'Sepolia Testnet' : `Chain ID: ${wallet.chainId}`}
          </span>
        </div>
      </div>
    </div>
  )
}