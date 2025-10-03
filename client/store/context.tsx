import * as React from 'react'
import { ethers } from 'ethers'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { contractABI, contractAddress } from '../static/utils/constants'

export const Context = React.createContext<any>('')

declare global {
  interface Window {
    ethereum?: any
  }
}

if (typeof window !== 'undefined') {
  var ethereum = window.ethereum as MetaMaskInpageProvider | any
  var getLocalStorageItem = window.localStorage.getItem('transactionCount') as string | number | null
}

const getEthereumContract = async () => {
  if (!window.ethereum) {
    throw new Error('Please install MetaMask extension')
  }
  
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

  console.log('signer', signer)

  return transactionContract
}

type Props = {
  children: React.ReactNode
}

interface Data {
  addressTo: string,
  amount: string,
  keyword: string,
  message: string
}

export const TransactionProvider = (props: Props) => {

  const [ connectedAccount, setConnectedAccount ] = React.useState<string>('') 
  const [ balance, setBalance ] = React.useState<string>('')
  const [ formData, setFormData ] = React.useState<{
    addressTo: string, amount: string, keyword: string, message: string 
  }>({
    addressTo: '', 
    amount: '', 
    keyword: '', 
    message: '' 
    })
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false) 
  const [ transactionCount, setTransactionCount ] = React.useState<string | number | null>(getLocalStorageItem) 
  const [ transactions, setTransactions ] = React.useState<any>([])

  const getAllTransactions = async () => {
    if (ethereum && connectedAccount) {
      try {
        const transactionsContract = await getEthereumContract()

        const availableTransactions = await transactionsContract.getAllTransactions()
        console.log(availableTransactions)

        const structuredTransactions = availableTransactions.map((transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: Number(ethers.formatEther(transaction.amount))
        }))

        console.log(structuredTransactions)

        setTransactions(structuredTransactions)
      } catch (error) {
        console.log('Error getting transactions:', error)
      }
    } else {
      console.log('Ethereum is not present or wallet not connected')
    }
  }

  const checkIfWalletIsConnected = async () => {
    if(!ethereum) {
      return alert('Please install Metamask extention')
    } else {
      try {
        // First check if wallet is connected
        const accounts: string[] = await ethereum.request({ method: 'eth_accounts' })
        
        if (accounts.length > 0) {
          // If connected, try to switch to Sepolia automatically
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
            })
          } catch (switchError: any) {
            // If Sepolia network is not added, add it
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xaa36a7',
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
            }
          }
          
          accountChangeHandler(accounts[0])
          getAllTransactions()
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      }
    }
  }

  const checkIfTransactionExists = async () => {
    if (ethereum && connectedAccount) {
      try {
        const transactionContract = await getEthereumContract()
        const currentTransactionCount = await transactionContract.getTransactionCount()

        window.localStorage.setItem('transactionCount', String(currentTransactionCount))
        console.log(localStorage)
      } catch (error) {
        console.log('Error checking transactions:', error)
      }
    }
  }

  const connectWallet = async () => {
    if(window.ethereum) {
      try {
        // First, request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        
        // Then, try to switch to Sepolia network
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID in hex
          })
        } catch (switchError: any) {
          // If Sepolia network is not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xaa36a7',
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io/'],
              }],
            })
          }
        }
        
        accountChangeHandler(accounts[0])
        if (connectedAccount !== '') location.assign('/wallet')
      } catch (error) {
        console.error('Failed to connect wallet:', error)
        alert('Failed to connect wallet. Please try again.')
      }
    } else {
      alert('Please install Metamask extention')
    }
  }

  const getBalance = async (address: string) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(address)
        setBalance(ethers.formatEther(balance))
      }
    } catch (error) {
      console.error('Error getting balance:', error)
      setBalance('0.0')
    }
  }

  const accountChangeHandler = async (account: string) => {
    setConnectedAccount(account)
    await getBalance(account)
  }

  const sendTransaction = async () => {      
    if(!ethereum) {
      return alert('Please install Metamask extention')
    }
    
    if(!connectedAccount) {
      return alert('Please connect your wallet first')
    }
    
    try {
      const { addressTo, amount, keyword, message }: Data = formData
      
      // Validate inputs
      if (!addressTo || !amount) {
        return alert('Please fill in all required fields')
      }
      
      // Basic format validation
      if (!addressTo.startsWith('0x') || addressTo.length !== 42) {
        return alert('Please enter a valid Ethereum address (must start with 0x and be 42 characters long)')
      }
      
      // Convert to proper checksum address
      let validAddress: string
      try {
        validAddress = ethers.getAddress(addressTo)
        console.log('Original address:', addressTo)
        console.log('Checksum address:', validAddress)
      } catch (checksumError) {
        return alert('Please enter a valid Ethereum address with proper checksum')
      }
      
      const transactionContract = await getEthereumContract()
      const parseAmount = ethers.parseEther(amount)

      // Use the contract method with properly formatted address
      setIsLoading(true)
      console.log('Sending transaction...')
      
      const transactionHash = await transactionContract.addToBlockchain(validAddress, parseAmount, message, keyword)
      
      console.log(`Loading - ${transactionHash.hash}`)
      await transactionHash.wait()
      setIsLoading(false)
      console.log(`Success - ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount()
      setTransactionCount(Number(transactionCount))
      
      // Clear form after successful transaction
      setFormData({ addressTo: '', amount: '', keyword: '', message: '' })
      alert('Transaction sent successfully!')
      
    } catch (error: any) {
      setIsLoading(false)
      console.error('Transaction failed:', error)
      
      // Better error messages
      if (error.code === 4001) {
        alert('Transaction rejected by user')
      } else if (error.message.includes('insufficient funds')) {
        alert('Insufficient funds for transaction')
      } else {
        alert(`Transaction failed: ${error.message || 'Unknown error'}`)
      }
    }
  }

  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  React.useEffect(() => {
    if (connectedAccount) {
      checkIfTransactionExists()
    }
  }, [connectedAccount])

  return (
    <Context.Provider value={{ connectWallet, connectedAccount, balance,
    formData, setFormData, sendTransaction, transactions, setTransactions }}>
      {props.children}
    </Context.Provider>
  )
}