import { Input } from './Input'
import { Props as IsInputProps } from '@atoms/IsInput'

interface Props 
  extends IsInputProps {
    children?: React.ReactNode
  }

export function Search({...props}: Props) {
  return (
    <div className='flex flex-row justify-between items-center bg-input
    rounded-full border-border border-2 w-[28rem]'>
      <Input intent='secondary' placeholder='Search by address...' {...props} />
      {props.children}
    </div>
  )
}
