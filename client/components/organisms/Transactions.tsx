import * as React from 'react'
import { Context } from '../../store/context'
import { Text } from '@molecules/Text'
import { Transaction } from '@molecules/Transaction'
import { Search } from '@molecules/Search'
import { GoSearch } from 'react-icons/go'
import { GrClose } from 'react-icons/gr'
import { FaExternalLinkAlt } from 'react-icons/fa'

export function Transactions() {

  const { transactions } = React.useContext(Context)
  const [ query, setQuery ] = React.useState<string>('')

  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <div className='flex flex-row justify-center items-end w-[80vw]'>
        <Search type='text' onChange={(e: Event & {
          target: HTMLInputElement
        }) => setQuery(e.target.value.toLowerCase())}
        value={query}>
          <span className='mr-5'>
            {query.length === 0 ? <GoSearch className='tex-dark text-xl relative right-1' /> : 
            <GrClose className='tex-dark text-lg relative right-1 hover:cursor-pointer' 
            onClick={() => setQuery('')}/>}
          </span>
        </Search>
      </div>
      <div id='grid' className='w-[90vw] pb-28'>
        <div className='flex flex-col justify-between w-[250px] h-[370px] rounded-xl bg-[#ffd1f3] 
        p-4 gap-3'>
          <Text isHeader={false} intent='teritary' size='medium' color='dark'>
            Your transactions
          </Text>
          <Text isHeader={false} intent='base' size='small' color='dark'>
            All of your transactions history will be displayed here. Head up to the modal
            and try it out!
          </Text>
          <div className='flex flex-row gap-4 items-center'>
            <Text isHeader={false} intent='denary' color='dark' size='medium'>
              Check it out
            </Text>
            <FaExternalLinkAlt className='text-xl relative -top-[2px]' />
          </div>
        </div>
        {transactions.filter((transaction: any) => transaction.addressTo.toLowerCase().includes(query))
        .map((transaction: any, i: any) => (
          <Transaction key={i} {...transaction} />
        ))}
      </div>
    </div>
  )
}
