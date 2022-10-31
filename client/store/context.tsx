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
  var ethereum = window.ethereum as MetaMaskInpageProvider | any;
}

const getEthereumContract = () => {
  
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

  console.log({
    provider,
    signer,
    transactionContract
  })
}
type Props = {
  children: React.ReactNode
}

export const TransactionProvider = (props: Props) => {

  const [ connectedAccount, setConnectedAccount ] = React.useState('') 

  const checkIfWalletIsConnected = async () => {
    try {
      if(!ethereum) {
        return alert('Please install Metamask extention')
      } else {
        const accounts: any = await ethereum.request({ method: 'eth_accounts' })
        setConnectedAccount(accounts[0])
        console.log(accounts)
      }
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const connectWallet = async () => {
    try {
      if(!ethereum) {
        return alert('Please install Metamask extention')
      } else {
        const accounts: any = await ethereum.request({ method: 'eth_requestAccounts' })
        setConnectedAccount(accounts[0])
        location.assign('/wallet')
        console.log(accounts)
      }
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <Context.Provider value={{ connectWallet, connectedAccount }}>
      {props.children}
    </Context.Provider>
  )
}