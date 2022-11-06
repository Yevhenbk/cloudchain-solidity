import * as React from 'react'
import { Text } from '@molecules/Text'
import useFetch from '../../static/hooks/useFetch'
import { shortenAddress } from '../../static/utils/shortenAddress'

export interface Props {
  addressTo: string,
  addressFrom: string,
  url: string,
  timestamp: string,
  amount: number,
  message: string,
  keyword: string
}

export function Transaction(props: Props) {
  
  const gifUrl = useFetch(props.keyword)

  return (
    <div className='p-2 grid grid-cols-5 grid-rows-1 items-center rounded-lg bg-white
    w-[575px] gap-2 shadow-lg shadow-gray-300'>
      <img
        src={gifUrl || props.url}
        alt='nature'
        className='w-16 h-16 rounded-md shadow-lg object-cover'
      />
      <a href={`https://goerli.etherscan.io/address/${props.addressFrom}`} target='_blank' rel='noreferrer noopener'
      className='hover:underline'>
        <Text isHeader={false} intent='transaction' >
          From :
          <br/>
          {shortenAddress(props.addressFrom)}
        </Text>
      </a>
      <a href={`https://goerli.etherscan.io/address/${props.addressTo}`} target='_blank' rel='noreferrer noopener'
      className='hover:underline'>
        <Text isHeader={false} intent='transaction' >
          To :
          <br/> 
          {shortenAddress(props.addressTo)}
        </Text>
      </a>
      <Text isHeader={false} intent='transaction' >Amount : {props.amount}</Text>
      {props.message && (
        <div className='hidden'>
          <br />
          <Text isHeader={false} intent='transaction' >Message : {props.message}</Text>
        </div>
      )}
      <Text isHeader={false} intent='transaction' >{props.timestamp}</Text>
    </div>
  )
}
