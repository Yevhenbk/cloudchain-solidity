import * as React from 'react'

export interface Props {
  address?: React.ReactNode,
  icon: React.ReactNode,
  card: string,
  cardHolder: string
}

export function Card(props: Props) {
  return (
    <div className={props.card}>
        <div className={props.cardHolder}>
            <div>{props.address}</div>
            <div>{props.icon}</div>
        </div>
    </div>
  )
}