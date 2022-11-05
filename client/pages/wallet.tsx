import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Footer } from '@organisms/Footer'
import { Card } from '@molecules/Card'
import { Text } from '@molecules/Text'
import { Wrapper } from '@molecules/Wrapper'
import { FaEthereum } from 'react-icons/fa'
import { Context } from '../store/context'
import { Button } from '@molecules/Button'
import { Modal } from '@organisms/Modal'
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
        <div className='flex flex-col items-center gap-10'>
          <Card address={connectedAccount}/>
          <div className='flex flex-row align-middle gap-2 relative -left-28'>
            <span className='h-[.35rem] w-12 bg-dark rounded-full'/>
            <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
            <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
          </div>
          <div className='flex flex-row justify-start items-center gap-1'>
            <FaEthereum className='2xl:text-5xl font-semibold text-4xl text-dark relative -top-1' />
            <Text isHeader={false} intent='balance'>{balance}</Text>
          </div>
        </div>
      </Wrapper>
      <Wrapper isMain={false} intent='section'>
        <div className='flex flex-col gap-5 items-end'>
          <Modal/>
        </div>
      </Wrapper>
      <Wrapper isMain={false} intent='section'>
        <div className='flex flex-col text-center'>
          <Text id='b-text' isHeader={true} intent='primaryLabel'>Latest transactions</Text>
          <div className='relative -top-2'>
            <Text isHeader={true} intent='secondaryLabel'>all under one roof</Text> 
          </div>
        </div>
      </Wrapper>
      <Footer/>
    </Wrapper>
  )
}

export default Wallet