import * as React from 'react'

export interface Props {
  isMain: boolean,
  className?: string,
  children: React.ReactNode,
  id?: string
}

export function MainOrSection(props: Props) {
  return (
    <>
      {props.isMain ?
        <main className={props.className} id={props.id}>{props.children}</main> :
        <section className={props.className} id={props.id}>{props.children}</section>
      }
    </>
  )
}