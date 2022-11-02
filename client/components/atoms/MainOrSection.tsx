import * as React from 'react'

export interface Props {
  isMain: boolean,
  className?: string,
  children: React.ReactNode
}

export function MainOrSection(props: Props) {
  return (
    <>
      {props.isMain ?
        <main className={props.className} >{props.children}</main> :
        <section className={props.className}>{props.children}</section>
      }
    </>
  )
}