import { Text } from '@molecules/Text'
import { Button } from '@molecules/Button'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
const Fade: any = require('react-reveal/Fade')

export function Footer() {
  return (
    <Fade bottom duration={1200}>
    <div className='absolute bottom-0 py-6 flex flex-row justify-around
    w-[96vw] border-t-2 border-text-dark'>
      <section className='flex flex-row justify-between gap-5'>
        <Text isHeader={false} intent='quaternary'>Find me Here</Text>
        <Text isHeader={false} intent='quaternary'>-</Text>
        <div className='flex flex-row gap-2'>
          <Button isButton={false} link='https://github.com/Yevhenbk' intent='secondary'>
            <AiFillGithub className='text-dark hover:text-[#5A3BF8]' />
          </Button> 
          <Button isButton={false} link='https://www.linkedin.com/in/yevhen-balahutrak/' intent='secondary'>
            <AiFillLinkedin className='text-dark hover:text-[#5A3BF8]' />
          </Button> 
        </div>
      </section>
      <section className='flex flex-row gap-1'>
        <Text isHeader={false} intent='quinary'>Website by</Text>   
        <Text isHeader={false} intent='italic'>Yevhen Balahutrak</Text>   
      </section>      
    </div>
    </Fade>
  )
}