import * as React from 'react'
import { Context } from '../../store/context'
import { Transaction } from '@molecules/Transaction'

export function Transactions() {

  const { transactions, connectedAccount } = React.useContext(Context)

  return (
    <div className='flex flex-col gap-4 h-[378px] px-2 pb-4 overflow-hidden
    overflow-y-scroll w-[600px]'>
      <div className='relative top-2'></div>
      {transactions.reverse().map((transaction: any, i: any) => (
        <Transaction key={i} {...transaction} />
      ))}
    </div>
  )
}
