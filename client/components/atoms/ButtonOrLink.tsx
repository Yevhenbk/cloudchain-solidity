import * as React from 'react'

export interface Props {
  children: React.ReactNode,
  className?: string,
  isButton: boolean,
  link?: string
  icon?: React.ReactNode,
  onClick?: React.MouseEventHandler
}

export function ButtonOrLink(props: Props) {
  return (
    <>
      {!props.isButton ?
        <a href={props.link} className={props.className} target='_blank' rel='noreferrer noopener'>{props.children}</a> :
        <button className={props.className} onClick={props.onClick}>{props.children}<span>{props.icon}</span></button>
      }
    </>
  )
}