import * as React from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../static/utils/constants'

export const Context = React.createContext<any>('')

const { ethereum } = window

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

export const TransactionProvider = ( children: any) => {

    const checkIfWalletIsConnected = async () => {
        if(!ethereum) {

        }
    }

    React.useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}