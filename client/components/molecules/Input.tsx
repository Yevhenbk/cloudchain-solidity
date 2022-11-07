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
        'py-2 px-4 bg-input border-[1px] text-dark border-[#e8e7e7] text-lg',
        {'w-[100%] rounded-md outline-grey':
        intent === 'primary',
        'w-[95%] rounded-md outline-grey':
        intent === 'secondary',
        'rounded-full w-[16rem] outline-none border-none':
        intent === 'teritary'}
      )} 
    {...props} />   
  )
}
