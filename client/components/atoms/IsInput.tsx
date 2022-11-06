import * as React from 'react'

export interface Props {
  type: string,
  className?: string,
  placeholder?: string,
  value?: string,
  id: string,
  onChange?: any  
}

export function IsInput(props: Props) {
  return (
    <input type={props.type} className={props.className}
    placeholder={props.placeholder} value={props.value}
    onChange={props.onChange} />
  )
}