'use client'

import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import type { 
  WalletState, 
  FormattedTransaction, 
  TransactionInput, 
  LoadingState 
} from '../types/blockchain'
import { 
  getEthereumContract, 
  formatTransaction, 
  switchToSepolia, 
  handleContractError,
  SEPOLIA_CHAIN_ID 
} from '../utils/blockchain'

// Wallet connection hook
export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: '0',
    chainId: null
  })
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: true, // Start with loading true to check existing connection
    error: null
  })
  const [isInitialized, setIsInitialized] = useState(false)

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setLoading({ isLoading: false, error: 'MetaMask not installed' })
      return
    }

    try {
      setLoading({ isLoading: true, error: null })

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found')
      }

      // Switch to Sepolia
      await switchToSepolia()

      // Get balance
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(accounts[0])
      const chainId = await provider.getNetwork().then(n => Number(n.chainId))

      setWallet({
        isConnected: true,
        address: accounts[0],
        balance: ethers.formatEther(balance),
        chainId
      })

      setLoading({ isLoading: false, error: null })
      setIsInitialized(true)
    } catch (error) {
      console.error('Wallet connection failed:', error)
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Connection failed' 
      })
      setIsInitialized(true)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      balance: '0',
      chainId: null
    })
  }, [])

  const refreshBalance = useCallback(async () => {
    if (!wallet.address || !window.ethereum) return

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(wallet.address)
      
      setWallet(prev => ({
        ...prev,
        balance: ethers.formatEther(balance)
      }))
    } catch (error) {
      console.error('Balance refresh failed:', error)
    }
  }, [wallet.address])

  // Check for existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) {
        setLoading({ isLoading: false, error: null })
        setIsInitialized(true)
        return
      }

      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        }) as string[]

        if (accounts && accounts.length > 0) {
          await switchToSepolia()
          const provider = new ethers.BrowserProvider(window.ethereum)
          const balance = await provider.getBalance(accounts[0])
          const chainId = await provider.getNetwork().then(n => Number(n.chainId))

          setWallet({
            isConnected: true,
            address: accounts[0],
            balance: ethers.formatEther(balance),
            chainId
          })
        }
      } catch (error) {
        console.error('Connection check failed:', error)
      } finally {
        setLoading({ isLoading: false, error: null })
        setIsInitialized(true)
      }
    }

    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accountArray = accounts as string[]
      if (!accountArray || accountArray.length === 0) {
        disconnectWallet()
      } else {
        setWallet(prev => ({
          ...prev,
          address: accountArray[0]
        }))
        refreshBalance()
      }
    }

    const handleChainChanged = (chainId: unknown) => {
      const chainIdString = chainId as string
      const newChainId = parseInt(chainIdString, 16)
      setWallet(prev => ({
        ...prev,
        chainId: newChainId
      }))
      
      // Auto-switch back to Sepolia if needed
      if (newChainId !== SEPOLIA_CHAIN_ID) {
        switchToSepolia().catch(console.error)
      }
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum?.removeListener?.('accountsChanged', handleAccountsChanged)
      window.ethereum?.removeListener?.('chainChanged', handleChainChanged)
    }
  }, [disconnectWallet, refreshBalance])

  return {
    wallet,
    loading,
    isInitialized,
    connectWallet,
    disconnectWallet,
    refreshBalance
  }
}

// Transactions hook
export function useTransactions(walletAddress?: string | null) {
  const [transactions, setTransactions] = useState<FormattedTransaction[]>([])
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null
  })

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading({ isLoading: true, error: null })
      
      const contract = await getEthereumContract()
      const rawTransactions = await contract.getAllTransactions()
      
      const formattedTransactions = rawTransactions.map(formatTransaction)
      setTransactions(formattedTransactions)
      
      setLoading({ isLoading: false, error: null })
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch transactions' 
      })
    }
  }, [])

  const sendTransaction = useCallback(async (data: TransactionInput) => {
    try {
      setLoading({ isLoading: true, error: null })

      const contract = await getEthereumContract()
      const parseAmount = ethers.parseEther(data.amount)

      const tx = await contract.addToBlockchain(
        data.addressTo,
        parseAmount,
        data.message,
        data.keyword
      )

      await tx.wait()

      // Refresh transactions
      await fetchTransactions()

      setLoading({ isLoading: false, error: null })
      return { success: true }
    } catch (error) {
      const errorMessage = handleContractError(error)
      setLoading({ isLoading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  }, [fetchTransactions])

  // Auto-fetch transactions when wallet connects
  useEffect(() => {
    if (walletAddress) {
      // Add a small delay to ensure the wallet is fully connected
      const timer = setTimeout(() => {
        fetchTransactions()
      }, 500)
      
      return () => clearTimeout(timer)
    } else {
      // Clear transactions when wallet disconnects
      setTransactions([])
      setLoading({ isLoading: false, error: null })
    }
  }, [walletAddress, fetchTransactions])

  return {
    transactions,
    loading,
    fetchTransactions,
    sendTransaction
  }
}