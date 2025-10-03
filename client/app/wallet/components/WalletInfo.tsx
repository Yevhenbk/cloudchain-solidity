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
    <div className="bg-white border border-gray-100 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Wallet Info</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          title="Refresh balance"
        >
          <FaSync className={`h-4 w-4 ${loading ? 'opacity-50' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-gray-50 border border-gray-200 px-3 py-1 rounded">
              {shortenAddress(wallet.address || '')}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(wallet.address || '')}
              className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Copy
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Balance
          </label>
          <div className="flex items-center space-x-2">
            <FaEthereum className="h-4 w-4 text-gray-600" />
            <span className="text-lg font-medium">
              {parseFloat(wallet.balance).toFixed(6)} ETH
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Network
          </label>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${
            wallet.chainId === 11155111 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {wallet.chainId === 11155111 ? 'Sepolia Testnet' : `Chain ID: ${wallet.chainId}`}
          </span>
        </div>
      </div>
    </div>
  )
}