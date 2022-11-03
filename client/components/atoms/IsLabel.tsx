import * as React from 'react'

export interface Props {
  className?: string,
  for: string,
  children: React.ReactNode  
}

export function IsLabel(props: Props) {
  return (
    <label className={props.className} htmlFor={props.for}>
      {props.children}  
    </label>
  )
}
