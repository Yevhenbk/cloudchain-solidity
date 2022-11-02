import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Footer } from '@organisms/Footer'
import { Card } from '@molecules/Card'
import { Text } from '@molecules/Text'
import { Wrapper } from '@molecules/Wrapper'
import { FaEthereum } from 'react-icons/fa'
import { Context } from '../store/context'
const Fade: any = require('react-reveal/Fade')

const Wallet: NextPage = () => {

  const {  connectedAccount, balance } = React.useContext(Context)

  return (
    <Wrapper isMain={true}>
      <Layout title='Digital Wallet | Cloudchain'/>
      <Wrapper isMain={false} intent='section'>
        <Fade top duration={1200}>
          <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        </Fade>
        <div className='flex flex-col align-middle gap-10'>
          <Card address={connectedAccount}/>
          <div className='flex flex-row align-middle gap-2 relative left-12'>
            <span className='h-[.35rem] w-12 bg-dark rounded-full'/>
            <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
            <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
          </div>
          <Text isHeader={false} intent='balance'><FaEthereum /> {balance}</Text>
        </div>
      </Wrapper>
      <Footer/>
    </Wrapper>
  )
}

export default Wallet