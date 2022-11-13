import * as React from 'react'
import { Input } from './Input'
import { Props as IsInputProps } from '@atoms/IsInput'

interface Props 
  extends IsInputProps {
    children?: React.ReactNode
  }

export function Search({...props}: Props) {
  return (
    <div className='flex flex-row justify-between items-center bg-white
    rounded-full border-[#e8e7e7] border-2 w-[28rem] shadow-sm'>
      <Input intent='teritary' placeholder='Search by address...' {...props} />
      {props.children}
    </div>
  )
}
