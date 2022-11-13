import * as React from 'react'
import clsx from 'clsx'
import { IsLabel, Props as IsLabelProps } from '@atoms/IsLabel'

export interface Props
  extends IsLabelProps {
    intent?: 'primary' | 'secondary'
  }  

export function Label({ intent='primary', ...props }: Props) {
  return (
    <IsLabel
      className={clsx(
        'text-dark',
        {'text-md font-medium text-xl':
        intent === 'primary',
        'text-lg':
        intent === 'secondary'}
      )} 
    {...props} /> 
  )
}
