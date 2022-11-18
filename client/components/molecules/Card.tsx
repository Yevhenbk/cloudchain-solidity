import { Text } from './Text'
import { IoMdCloudy } from 'react-icons/io'

export interface Props {
  address: string,
  img?: any  
}

export function Card(props: Props) {
  return (
    <div className='w-[25rem] h-[15rem] bg-dark bg-[url(../../static/public/worldMap.svg)]
    rounded-xl flex flex-col items-center justify-center object-cover z-50
    bg-no-repeat bg-center shadow-sm shadow-gray-400'>
      <div className='flex flex-row relative -top-16 -left-20 items-center gap-2'>
        <IoMdCloudy className='text-4xl text-dark bg-yellow rounded-full p-1'/>
        <Text id='b-text' isHeader={false} intent='nonary' color='yellow' size='small'>
          Cloudchain digital
        </Text>
      </div>
      <section className='relative -bottom-12'>
        <Text isHeader={false} intent='octonary' color='yellow' size='small'>
          {props.address}
        </Text>
      </section>  
    </div>
  )
}