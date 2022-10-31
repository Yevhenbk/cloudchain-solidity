import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Footer } from '@organisms/Footer'
import { Card } from '@molecules/Card'
const Fade: any = require('react-reveal/Fade')

const Wallet: NextPage = () => {
  return (
    <div className='w-[100vw] bg-[#EEF2F5] h-[100vh] overflow-hidden 
    flex flex-row justify-around items-center'>
      <Layout title='Digital Wallet | Cloudchain'/>
      <section className='flex flex-col justify-start items-center max-w-[645px] 2xl:max-w-[800px]'>
        <Fade top duration={1200}>
          <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        </Fade>
        <Card address='0x2FA7EA678f3f394209BadCf67728aB223124C986'/>
      </section>
      <Footer/>
    </div>
  )
}

export default Wallet