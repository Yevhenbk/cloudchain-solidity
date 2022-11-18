import clsx from 'clsx'
import { IsInput,  Props as IsInputProps } from '@atoms/IsInput'

export interface Props
  extends IsInputProps {
    intent?: 'primary' | 'secondary',
    size?: 'small' | 'big'
  }  

export function Input({ intent='primary', size='big', ...props}: Props) {
  return (
    <IsInput
      className={clsx(
        ['py-3 px-4'], ['text-dark'], ['text-xl'], ['font-normal'],
        ['outline-none'], ['font-mono'], ['rounded-md'],
        {'bg-[#f8f8f8] border-2 border-[#e8e7e7]':
        intent === 'primary',
        'w-[26rem] bg-transparent border-none':
        intent === 'secondary',
        'w-[100%]':
        size === 'big',
        'w-[95%]':
        size === 'small'}
      )} 
    {...props} />   
  )
}
