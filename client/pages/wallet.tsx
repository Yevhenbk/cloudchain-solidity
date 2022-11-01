import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Footer } from '@organisms/Footer'
import { Card } from '@molecules/Card'
import { Text } from '@molecules/Text'
import { FaEthereum } from 'react-icons/fa'
import { Context } from '../store/context'
const Fade: any = require('react-reveal/Fade')

const Wallet: NextPage = () => {

  const {  connectedAccount, balance } = React.useContext(Context)

  return (
    <div className='w-[100vw] bg-[#EEF2F5] h-[100vh] overflow-hidden 
    flex flex-row justify-around items-center'>
      <Layout title='Digital Wallet | Cloudchain'/>
      <section className='flex flex-col justify-start items-center max-w-[645px] 2xl:max-w-[800px]'>
        <Fade top duration={1200}>
          <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        </Fade>
        <div className='flex flex-col align-middle gap-10'>
          <Card address={connectedAccount}/>
          <div className='flex flex-row align-middle gap-2 relative left-8'>
            <span className='h-[.35rem] w-12 bg-dark rounded-full'/>
            <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
            <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
          </div>
          <Text isHeader={false} intent='balance'><FaEthereum /> {balance}</Text>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Wallet