import React from 'react'
import clsx from 'clsx'
import { Card, Props as CardProps } from '@atoms/Card'
import { CardIcon } from '@molecules/CardIcon'

export interface Props 
  extends CardProps {
    intent: 'card'
  }


export function CreditCard({intent='card', ...props}) {
  return (
    <Card card={clsx(
      'w-96 h-56 overflow-hidden bg-center bg-cover rounded-lg shadow-2xl',
      {'bg-[url(../public/layeredWaves.svg)]': intent === 'card'}
    )}
    cardHolder='py-2 px-4 h-52 flex flex-row-reverse justify-end items-center relative -top-14' 
    icon={<CardIcon/>}
    {...props} />
  )
}