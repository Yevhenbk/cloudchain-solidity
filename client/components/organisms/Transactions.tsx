import * as React from 'react'
import { Context } from '../../store/context'
import { Text } from '@molecules/Text'
import { Transaction } from '@molecules/Transaction'
import { Search } from '@molecules/Search'
import { GoSearch } from 'react-icons/go'
import { GrClose } from 'react-icons/gr'
import { BsChevronCompactDown } from 'react-icons/bs'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

export function Transactions() {

  const { transactions, connectedAccount } = React.useContext(Context)
  const [ query, setQuery ] = React.useState<string>('')

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-row justify-between items-center w-[560px]'>
        <div className='flex flex-row justify-between w-[90px] px-2 py-1 items-center rounded-md'>
          <Text isHeader={false} intent='order'>Date</Text>
          <AiOutlineArrowDown />
        </div>
        <Search type='text' onChange={(e: Event & {
          target: HTMLInputElement
        }) => setQuery(e.target.value.toLowerCase())}
        value={query}>
          <span className='mr-5'>
            {query.length === 0 ? <GoSearch className='tex-dark text-xl relative right-2' /> : 
            <GrClose className='tex-dark text-lg relative right-2 hover:cursor-pointer' onClick={() => setQuery('')}/>}
          </span>
        </Search>
      </div>
      <div className='flex flex-col gap-4 h-[383px] px-2 pb-4 overflow-hidden
      overflow-y-scroll w-[600px]'>
        {transactions.reverse().filter((transaction: any) => transaction.addressTo.toLowerCase().includes(query))
        .map((transaction: any, i: any) => (
          <Transaction key={i} {...transaction} />
        ))}
      </div>
      <div className='flex flex-row justify-center'>
        <BsChevronCompactDown id='anim' className='relative -top-[1rem] text-[2rem] text-[#656565]' />
      </div>
    </div>
  )
}
