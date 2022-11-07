import * as React from 'react'
import { Input } from './Input'
import { Props as IsInputProps } from '@atoms/IsInput'

interface Props 
  extends IsInputProps {
    children?: React.ReactNode
  }

export function Search({...props}: Props) {
  return (
    <div className='flex flex-row justify-between items-center bg-input
    rounded-full border-[#e8e7e7] border-[1px] w-[18rem] shadow-sm'>
      <Input intent='teritary' placeholder='Search by address...' {...props} />
      {props.children}
    </div>
  )
}
