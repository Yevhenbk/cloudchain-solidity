import * as React from 'react'

export interface Props {
  children: React.ReactNode,
  className?: any,
  isHeader: boolean,
  id?: string
}

export function ParagraphOrHeader(props: Props) {
  return (
    <>
      {props.isHeader ?
          <h1 id={props.id} className={props.className}>{props.children}</h1> :
          <p id={props.id} className={props.className}>{props.children}</p>
      }
    </>
  )
}