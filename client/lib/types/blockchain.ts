import { z } from 'zod'
import { isValidAddress } from '../utils/blockchain'

// Transaction validation schema
export const TransactionSchema = z.object({
  addressTo: z.string().refine((val: string) => {
    return isValidAddress(val)
  }, 'Invalid Ethereum address'),
  amount: z.string().refine((val: string) => {
    const num = parseFloat(val)
    return num > 0 && num <= 1000 // Reasonable limits
  }, 'Amount must be between 0 and 1000 ETH'),
  keyword: z.string().min(1).max(50),
  message: z.string().max(500),
})

export type TransactionInput = z.infer<typeof TransactionSchema>

// Blockchain transaction from contract
export interface BlockchainTransaction {
  sender: string        // Smart contract uses 'sender' not 'addressFrom'
  receiver: string      // Smart contract uses 'receiver' not 'addressTo'
  amount: bigint
  message: string
  keyword: string
  timestamp: bigint
  hash?: string
}

// Formatted transaction for UI
export interface FormattedTransaction {
  addressFrom: string
  addressTo: string
  amount: number
  message: string
  keyword: string
  timestamp: string
  hash?: string
}

// Wallet state
export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string
  chainId: number | null
}

// Action results
export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
}

// Loading states
export interface LoadingState {
  isLoading: boolean
  error: string | null
}