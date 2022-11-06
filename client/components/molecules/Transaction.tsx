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
    <div className='p-2 flex flex-row justify-between items-center rounded-lg bg-white
    w-[385px] gap-2 shadow-lg shadow-gray-300'>
      <img
        src={gifUrl || props.url}
        alt='nature'
        className='w-12 h-12 rounded-md shadow-lg object-cover'
      />
      <a href={`https://goerli.etherscan.io/address/${props.addressFrom}`} target='_blank' rel='noreferrer noopener'>
        <Text isHeader={false} intent='transaction' >From : {shortenAddress(props.addressFrom)}</Text>
      </a>
      <a href={`https://goerli.etherscan.io/address/${props.addressTo}`} target='_blank' rel='noreferrer noopener'>
        <Text isHeader={false} intent='transaction' >To : {shortenAddress(props.addressTo)}</Text>
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
