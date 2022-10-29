import * as React from 'react'

export interface Props {
  children: React.ReactNode,
  className?: any,
  isHeader: boolean,
}

export function ParagraphOrHeader(props: Props) {
  return (
    <>
      {props.isHeader ?
          <h1 className={props.className}>{props.children}</h1> :
          <p className={props.className}>{props.children}</p>
      }
    </>
  )
}