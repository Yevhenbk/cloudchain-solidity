import * as React from 'react'

export interface Props {
    children: React.ReactNode,
    className?: any,
    isIcon: boolean,
}

export function ButtonOrLink(props: Props) {
  return (
    <>
        {props.isIcon ?
            <div className={props.className}>{props.children}</div> :
            <button className={props.className}>{props.children}</button>
        }
    </>
  )
}