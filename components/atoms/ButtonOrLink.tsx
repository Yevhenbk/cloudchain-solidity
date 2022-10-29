import * as React from 'react'

export interface Props {
    children: React.ReactNode,
    className?: string,
    isButton: boolean,
    link?: string
    icon?: React.ReactNode
}

export function ButtonOrLink(props: Props) {
  return (
    <>
        {!props.isButton ?
            <a href={props.link} className={props.className} target='_blank'>{props.children}</a> :
            <button className={props.className}>{props.children}<span>{props.icon}</span></button>
        }
    </>
  )
}