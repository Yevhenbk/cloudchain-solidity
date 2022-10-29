import * as React from 'react'

export interface Props {
    children: React.ReactNode,
    className?: any,
    isButton: boolean,
    icon?: React.ReactNode
}

export function ButtonOrLink(props: Props) {
  return (
    <>
        {!props.isButton ?
            <div className={props.className}>{props.children}</div> :
            <button className={props.className}>{props.children}<span>{props.icon}</span></button>
        }
    </>
  )
}