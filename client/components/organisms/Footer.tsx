import { Text } from '@molecules/Text'
import { Button } from '@molecules/Button'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
const Fade: any = require('react-reveal/Fade')

export function Footer() {
  return (
    <Fade bottom duration={1200}>
      <div className='fixed bottom-[1vw] py-4 flex flex-row justify-around
      w-[98vw] rounded-md bg-dark'>
        <section className='flex flex-row justify-between gap-5'>
          <Text isHeader={false} intent='quaternary' size='medium' color='white'>
            Find me Here
          </Text>
          <Text isHeader={false} intent='quaternary' size='medium' color='white'>
            -
          </Text>
          <div className='flex flex-row gap-2'>
            <Button isButton={false} link='https://github.com/Yevhenbk' intent='secondary'
            color='transparent'>
              <AiFillGithub className='text-secondary hover:text-blue 2xl:text-2xl' />
            </Button> 
            <Button isButton={false} link='https://www.linkedin.com/in/yevhen-balahutrak/' 
            intent='secondary' color='transparent'>
              <AiFillLinkedin className='text-secondary hover:text-blue 2xl:text-2xl' />
            </Button> 
          </div>
        </section>
        <section className='flex flex-row gap-1'>
          <Text isHeader={false} intent='quaternary' color='white' size='medium'>
            Website by
          </Text>   
          <Text isHeader={false} intent='quaternary' color='white' size='medium' style='italic'>
            Yevhen Balahutrak
          </Text>   
        </section>      
      </div>
    </Fade>
  )
}