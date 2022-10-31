import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Text } from '@molecules/Text'
import { Button } from '@molecules/Button'
import { RiExchangeLine } from 'react-icons/ri'
import { TfiWallet } from 'react-icons/tfi'
import { Footer } from '@organisms/Footer'
import { Context } from '../store/context'
const Fade: any = require('react-reveal/Fade')

const Home: NextPage = () =>  {

  const { connectWallet, connectedAccount } = React.useContext(Context)

  return (
    <div className='w-[100vw] bg-[#EEF2F5] h-[100vh] overflow-hidden 
    flex flex-row justify-around items-center'>
        <Layout title='Welcome | Cloudchain'/>
      <section className='flex flex-col justify-start items-center max-w-[645px] 2xl:max-w-[800px]'>
        <Fade top duration={1200}>
          <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        </Fade>
        <Fade right duration={1000}>
          <Text id='b-text' isHeader={true} intent='primary'>Cloudchain</Text>
        </Fade>
        <Fade left duration={1000}>
          <div className='relative h-4 -top:-12 left:-36 md:-top-8 md:-left-36 2xl:-top-12 2xl:-left-52'>
            <Text id='t-stroke' isHeader={true} intent='secondary'>Welcome to</Text>
          </div>
        </Fade>
        <Fade duration={2000}>
        <Text isHeader={false} intent='teritary'>Simply and securely transition crypto assets in two steps</Text>
          <div className='mt-6'>
            <Button isButton={true} onClick={connectedAccount !== '' ? connectWallet : () => location.replace('/wallet')}
             intent='primary'>
              <Text isHeader={false} intent='button'>{connectedAccount ? 'My Wallet' : 'Connect Wallet'}</Text>
                <span className='bg-white rounded-full w-[48px] h-[48px] flex justify-center items-center
                relative -right-6'>
                  {connectedAccount ?
                  <TfiWallet className='text-xl group-hover:transition group-hover:ease-in-out
                  group-hover:duration-300 duration-300 group-hover:-rotate-45'/>
                  : <RiExchangeLine className='text-2xl group-hover:transition group-hover:ease-in-out
                  group-hover:duration-300 duration-300 group-hover:rotate-90'/>}
                </span>
            </Button>
          </div>
        </Fade>
      </section>
      <Footer />
    </div>
  )
}

export default Home