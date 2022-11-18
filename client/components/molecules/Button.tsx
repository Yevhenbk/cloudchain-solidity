import clsx from 'clsx'
import { ButtonOrLink, Props as ButtonOrLinksProps } from '@atoms/ButtonOrLink'

export interface Props 
  extends ButtonOrLinksProps {
    intent?: 'primary' | 'secondary' | 'teritary' | 'quaternary',
    color?: 'gradient' | 'transparent'
  }

export function Button({ intent='primary', color='gradient', ...props }: Props) {
  return (
    <ButtonOrLink
      className={clsx(
        'flex flex-row items-center',
        {'2xl:w-80 w-72 h-16 border-2 rounded-full bg-gradient-to-l justify-between group':
        intent === 'primary',
        'text-dark text-xl': 
        intent === 'secondary',
        '2xl:w-80 w-72 h-16 border-2 rounded-full justify-center':
        intent === 'teritary',
        'w-[300px] h-12 rounded-full bg-gradient-to-l justify-center':
        intent === 'quaternary',
        'bg-gradient-to-l from-[#D17F82] to-[#5A3BF8] hover:bg-gradient-to-l hover:from-[#D17F82] hover:to-[#9B60B8]':
        color === 'gradient',
        'bg-transparent':
        color === 'transparent'}
      )} 
    {...props} />
  )
}