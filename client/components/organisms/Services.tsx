import * as React from 'react'
import { Text } from '@molecules/Text'
import { Service } from '@molecules/Service'
import { MdOutlineSecurity, MdSearch } from 'react-icons/md'
import { AiTwotoneHeart } from 'react-icons/ai'

export function Services() {
  return (
    <div className='flex flex-col justify-between h-[500px] w-[350px]'>
      <Service>
        <div className='flex flex-row items-center gap-2'>
          <MdOutlineSecurity className='text-[2.25rem] p-2 rounded-full text-white bg-[#2D51E3]' />  
          <Text isHeader={false} intent='base' size='regular' color='dark'>
            Security guarantee
          </Text>
        </div>
        <Text isHeader={false} intent='base' size='small' color='dark'>
          Security is guaranteed. Privacy is always maintained along with the quality of the product
        </Text>
      </Service>  
      <Service>
        <div className='flex flex-row items-center gap-2'>
          <MdSearch className='text-[2.25rem] p-2 rounded-full text-white bg-[#E44050]' />  
          <Text isHeader={false} intent='base' size='regular' color='dark'>
            Best exchange rates
          </Text>
        </div>
        <Text isHeader={false} intent='base' size='small' color='dark'>
          Security is guaranteed. Privacy is always maintained along with the quality of the product
        </Text>
      </Service> 
      <Service intent='secondary'>
        <div className='flex flex-row items-center gap-2'>
          <AiTwotoneHeart className='text-[2.25rem] p-2 rounded-full text-white bg-dark' />  
          <Text isHeader={false} intent='base' size='regular' color='dark'>
            Fastest transactions
          </Text>
        </div>
        <Text isHeader={false} intent='base' size='small' color='dark'>
          Security is guaranteed. Privacy is always maintained along with the quality of the product
        </Text>
      </Service>  
    </div>
  )
}
