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
    <div className='flex flex-col justify-center items-center w-[250px] h-[370px] border-2
    rounded-xl border-grey p-2 gap-1'>
      <img
        src={gifUrl || props.url}
        alt='nature'
        className='w-[240px] h-[240px] rounded-xl object-cover'
      />
      <a href={`https://goerli.etherscan.io/address/${props.addressFrom}`} target='_blank' rel='noreferrer noopener'
      className='hover:underline pt-2'>
        <Text isHeader={false} intent='doudenary' size='extrasmall' color='dark'>
          From :
          {shortenAddress(props.addressFrom)}
        </Text>
      </a>
      <a href={`https://goerli.etherscan.io/address/${props.addressTo}`} target='_blank' rel='noreferrer noopener'
      className='hover:underline'>
        <Text isHeader={false} intent='doudenary' size='extrasmall' color='dark'>
          To : 
          {shortenAddress(props.addressTo)}
        </Text>
      </a>
      <Text isHeader={false} intent='doudenary' size='extrasmall' color='dark'>
        Amount : {props.amount}
      </Text>
      {props.message && (
        <div className='hidden'>
          <br />
          <Text isHeader={false} intent='doudenary' size='extrasmall' color='dark'>
            Message : {props.message}
          </Text>
        </div>
      )}
      <Text isHeader={false} intent='doudenary' size='extrasmall' color='dark'>
        {props.timestamp}
      </Text>
    </div>
  )
}
