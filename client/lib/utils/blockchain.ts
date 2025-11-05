import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../../static/utils/constants'
import type { BlockchainTransaction, FormattedTransaction } from '../types/blockchain'

// Constants
export const SEPOLIA_CHAIN_ID = 11155111
export const SEPOLIA_CHAIN_ID_HEX = '0xaa36a7'

// Utility functions
export const shortenAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatEther = (value: bigint | string): string => {
  try {
    return ethers.formatEther(value)
  } catch {
    return '0'
  }
}

export const parseEther = (value: string): bigint => {
  try {
    return ethers.parseEther(value)
  } catch {
    return BigInt(0)
  }
}

export const isValidAddress = (address: string): boolean => {
  try {
    return ethers.isAddress(address)
  } catch {
    return false
  }
}

export const getChecksumAddress = (address: string): string => {
  try {
    return ethers.getAddress(address)
  } catch {
    return address
  }
}

// Contract interactions
export const getEthereumContract = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

  return transactionContract
}

// Format blockchain transaction for UI
export const formatTransaction = (transaction: BlockchainTransaction): FormattedTransaction => {
  return {
    addressFrom: getChecksumAddress(transaction.sender),     // Map 'sender' to 'addressFrom' with checksum
    addressTo: getChecksumAddress(transaction.receiver),     // Map 'receiver' to 'addressTo' with checksum
    amount: Number(formatEther(transaction.amount)),
    message: transaction.message,
    keyword: transaction.keyword,
    timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
    hash: transaction.hash
  }
}

// Network utilities
export const switchToSepolia = async (): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed')
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }]
    })
  } catch (switchError: any) {
    // If Sepolia network is not added, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: SEPOLIA_CHAIN_ID_HEX,
          chainName: 'Sepolia Testnet',
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
          blockExplorerUrls: ['https://sepolia.etherscan.io/'],
        }],
      })
    } else {
      throw switchError
    }
  }
}

// Error handling
export const handleContractError = (error: any): string => {
  if (error.code === 4001) {
    return 'Transaction rejected by user'
  } else if (error.message?.includes('insufficient funds')) {
    return 'Insufficient funds for transaction'
  } else if (error.message?.includes('user rejected')) {
    return 'Transaction cancelled by user'
  } else {
    return error.message || 'Transaction failed'
  }
}