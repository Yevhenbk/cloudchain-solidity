import clsx from 'clsx'
import { ButtonOrLink, Props as ButtonOrLinksProps } from '@atoms/ButtonOrLink'

export interface Props 
  extends ButtonOrLinksProps {
    intent?: 'primary' | 'secondary' | 'teritary' | 'quaternary'
  }

export function Button({ intent='primary', ...props }: Props) {
  return (
    <ButtonOrLink
      className={clsx(
        'flex flex-row items-center',
        {'2xl:w-80 w-72 h-16 border-2 rounded-full bg-gradient-to-l justify-between group from-[#D17F82] to-[#5A3BF8] hover:bg-gradient-to-l hover:from-[#D17F82] hover:to-[#9B60B8]':
        intent === 'primary',
        'text-dark text-xl': 
        intent === 'secondary',
        '2xl:w-80 w-72 h-16 border-2 rounded-full bg-gradient-to-l justify-center from-[#D17F82] to-[#5A3BF8] hover:bg-gradient-to-l hover:from-[#D17F82] hover:to-[#9B60B8]':
        intent === 'teritary',
        'w-[300px] h-12 rounded-full bg-dark justify-center hover:bg-gradient-to-l hover:bg-black':
        intent === 'quaternary'}
      )} 
    {...props} />
  )
}