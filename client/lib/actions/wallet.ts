'use server'

import { revalidateTag } from 'next/cache'
import type { ActionResult, TransactionInput } from '../types/blockchain'

// Server action for transaction submission (optimistic updates)
export async function submitTransactionAction(
  data: TransactionInput
): Promise<ActionResult> {
  try {
    // This is a server action that can handle server-side validation
    // and optimistic updates. The actual blockchain interaction happens on client.
    
    console.log('Server: Processing transaction submission', data)
    
    // Revalidate transaction data cache
    revalidateTag('transactions')
    
    return {
      success: true,
      data: { message: 'Transaction submitted successfully' }
    }
  } catch (error) {
    console.error('Server: Transaction submission failed', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Transaction failed'
    }
  }
}

// Server action for cache revalidation
export async function revalidateTransactions(): Promise<void> {
  revalidateTag('transactions')
}