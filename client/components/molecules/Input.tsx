import * as React from 'react'
import clsx from 'clsx'
import { IsInput,  Props as IsInputProps } from '@atoms/IsInput'

export interface Props
  extends IsInputProps {
    intent?: 'primary' | 'secondary' | 'teritary'
  }  

export function Input({ intent='primary', ...props}: Props) {
  return (
    <IsInput
      className={clsx(
        'py-3 px-5 text-dark text-xl font-normal outline-none font-mono',
        {'w-[100%] rounded-md bg-[#f8f8f8] border-2 border-[#e8e7e7]':
        intent === 'primary',
        'w-[95%] rounded-md bg-[#f8f8f8] border-2 border-[#e8e7e7]':
        intent === 'secondary',
        'rounded-md w-[26rem] bg-transparent border-none':
        intent === 'teritary'}
      )} 
    {...props} />   
  )
}
