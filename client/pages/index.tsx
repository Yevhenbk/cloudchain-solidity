import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Text } from '@molecules/Text'
import { Wrapper } from '@molecules/Wrapper'
import { Button } from '@molecules/Button'
import { RiExchangeLine } from 'react-icons/ri'
import { Footer } from '@organisms/Footer'
import { Context } from '../store/context'
const Fade: any = require('react-reveal/Fade')

const Home: NextPage = () =>  {

  const { connectWallet, connectedAccount } = React.useContext(Context)

  return (
    <Wrapper isMain={true}>
        <Layout title='Welcome | Cloudchain'/>
      <Wrapper isMain={false} intent='section'>
        <Fade top duration={1200}>
          <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        </Fade>
        <Fade right duration={1000}>
          <Text id='b-text' isHeader={true}>Cloudchain</Text>
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
             intent={!connectedAccount ? 'primary' : 'teritary'}>
              <Text isHeader={false} intent={!connectedAccount ? 'button' : 'buttonCentered'}>{connectedAccount ? 'My Wallet' : 'Connect Wallet'}</Text>
              {!connectedAccount ?
                <span className='bg-white rounded-full w-[48px] h-[48px] flex justify-center items-center
                relative -right-6'>
                 <RiExchangeLine className='text-2xl group-hover:transition group-hover:ease-in-out
                  group-hover:duration-300 duration-300 group-hover:rotate-90'/>
                </span> : 
              <></>}
            </Button>
          </div>
        </Fade>
      </Wrapper>
      <Footer />
    </Wrapper>
  )
}

export default Home