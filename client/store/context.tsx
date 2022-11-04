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

const getEthereumContract = () => {
  
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

  return transactionContract
}

type Props = {
  children: React.ReactNode
}

interface Data {
  address: string,
  amount: string,
  keyword: string,
  message: string
}

export const TransactionProvider = (props: Props) => {

  const [ connectedAccount, setConnectedAccount ] = React.useState<string>('') 
  const [ balance, setBalance ] = React.useState<string>('')
  const [ formData, setFormData ] = React.useState<{
    address: string, amount: string, keyword: string, message: string 
  }>({
    address: '', 
    amount: '', 
    keyword: '', 
    message: '' 
    })
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false) 
  const [ transactionCount, setTransactionCount ] = React.useState<string | number | null>(getLocalStorageItem) 

  const checkIfWalletIsConnected = async () => {
    try {
      if(!ethereum) {
        return alert('Please install Metamask extention')
      } else {
        const accounts: string[] = await ethereum.request({ method: 'eth_accounts' })
        accountChangeHandler(accounts[0])
      }
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const connectWallet = () => {
    if(window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(
        (res: any) => {
          accountChangeHandler(res[0])
          if (connectedAccount !== '') location.assign('/wallet')
        })
    } else {
      alert('Please install Metamask extention')
    }
  }

  const getBalance = (address: string) => {
    window.ethereum
      .request({ 
        method: 'eth_getBalance', 
        params: [address, 'latest'] 
      })
      .then((balance: string) => {
        setBalance(ethers.utils.formatEther(balance));
      })
  }

  const accountChangeHandler = (account: string) => {
    setConnectedAccount(account)
    getBalance(account)
  }

  const sendTransaction = async () => {      
    if(!ethereum) {
      return alert('Please install Metamask extention')
    } else {
      const { address, amount, keyword, message }: Data = formData
      const trannsactionContract = getEthereumContract()
      const parseAmount = ethers.utils.parseEther(amount)

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: connectedAccount,
          to: address,
          gas: '0x5208',
          value: parseAmount._hex
        }]
      })

      const transactionHash = await trannsactionContract.addToBlockchain(address, parseAmount, message, keyword)

      setIsLoading(true)
      console.log(`Loading - ${transactionHash.hash}`)
      await transactionHash.wait()
      setIsLoading(false)
      console.log(`Success - ${transactionHash.hash}`)

      const transactionCount = await trannsactionContract.getTransactionCount()

      setTransactionCount(transactionCount.toNumber())
    }
    
  }

  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <Context.Provider value={{ connectWallet, connectedAccount, balance,
    formData, setFormData, sendTransaction }}>
      {props.children}
    </Context.Provider>
  )
}