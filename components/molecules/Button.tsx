import clsx from 'clsx'
import { ButtonOrLink, Props as ButtonOrLinksProps } from '@atoms/ButtonOrLink'

export interface Props 
    extends ButtonOrLinksProps {
        intent?: 'primary' | 'secondary'
    }

export function Button({ intent='primary', ...props }: Props) {
  return (
    <ButtonOrLink
        className={clsx(
            'flex flex-row items-center w-72 h-16',
            {'border-2 rounded-full bg-gradient-to-l justify-between from-[#D17F82] to-[#5A3BF8]':
            intent === 'primary',
            'justify-center': 
            intent === 'secondary'}
        )} 
        {...props} />
  )
}