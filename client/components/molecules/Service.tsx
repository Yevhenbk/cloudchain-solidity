import clsx from 'clsx'

interface ServiceProps {
  children: React.ReactNode
}

export interface Props 
  extends ServiceProps {
    intent?: 'primary' | 'secondary'
  }  

export function Service({ intent='primary', ...props }: Props) {
  return (
    <div className={clsx(
      'flex flex-col justify-between w-[350px] h-[160px] rounded-lg p-4',
      {'bg-transparent border-2 border-cardBorder':
      intent === 'primary',
      'bg-purple':
      intent === 'secondary'} 
    )}>
      {props.children}  
    </div>
  )
}
