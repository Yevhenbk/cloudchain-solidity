import * as React from 'react'
import clsx from 'clsx'
import { IsInput,  Props as IsInputProps } from '@atoms/IsInput'

export interface Props
  extends IsInputProps {
    intent?: 'primary' | 'secondary'
  }  

export function Input({ intent='primary', ...props}: Props) {
  return (
    <IsInput
      className={clsx(
        'p-2 bg-input border-[1px] border-[#ebebeb] rounded-md',
        {'w-[100%]':
        intent === 'primary',
        'w-[95%]':
        intent === 'secondary'}
      )} 
    {...props} />   
  )
}
