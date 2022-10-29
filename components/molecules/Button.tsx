import clsx from "clsx"
import { ButtonOrLink, Props as ButtonOrLinksProps } from "@atoms/ButtonOrLink"

export interface Props extends ButtonOrLinksProps {
    intent?: 'button' | 'link'
}

export function Button({ intent='button', ...props }: Props) {
  return (
    <ButtonOrLink
        className={clsx(
            'flex items-center justify-center',
            {'bg-transparent border-2 border-disabledWhite rounded-lg hover:bg-white':
            intent === 'button',
            '': intent === 'link'}
        )} 
        {...props}/>
  )
}