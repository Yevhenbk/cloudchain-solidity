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

  const [ connectedAccount, setConnectedAccount ] = React.useState<string>('') 
  const [ balance, setBalance ] = React.useState<string>('')

  const checkIfWalletIsConnected = async () => {
    try {
      if(!ethereum) {
        return alert('Please install Metamask extention')
      } else {
        const accounts: any = await ethereum.request({ method: 'eth_accounts' })
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

  React.useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <Context.Provider value={{ connectWallet, connectedAccount, balance }}>
      {props.children}
    </Context.Provider>
  )
}