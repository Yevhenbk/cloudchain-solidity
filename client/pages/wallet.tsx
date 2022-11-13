import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Footer } from '@organisms/Footer'
import { Card } from '@molecules/Card'
import { Text } from '@molecules/Text'
import { Wrapper } from '@molecules/Wrapper'
import { FaEthereum } from 'react-icons/fa'
import { Context } from '../store/context'
import { Transactions } from '../components/organisms/Transactions'
import { Modal } from '@organisms/Modal'
import { Header } from '@molecules/Header'
import { Services } from '@organisms/Services'
const Fade: any = require('react-reveal/Fade')

const Wallet: NextPage = () => {

  const {  connectedAccount, balance } = React.useContext(Context)

  return (
    <Wrapper isMain={true} intent='transactions'>
      <Layout title='Digital Wallet | Cloudchain'/>
      <Header/>
      <Fade>
      <Wrapper isMain={false} intent='sector'>  
        <Wrapper isMain={false} intent='section'>
          <div className='flex flex-col items-start gap-10'>
            <Card address={connectedAccount}/>
            <div className='flex flex-row align-middle gap-2 relative left-28'>
              <span className='h-[.35rem] w-12 bg-dark rounded-full'/>
              <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
              <span className='h-[.35rem] w-[.35rem] bg-dark rounded-full'/>
            </div>
            <div className='flex flex-row justify-start items-center gap-1'>
              <FaEthereum className='font-semibold text-5xl text-dark relative -top-1' />
              <Text isHeader={false} intent='balance'>{balance}</Text>
            </div>
          </div>
        </Wrapper>
        <Services />
        <Wrapper isMain={false} intent='section'>
          <div className='flex flex-col gap-5 items-end'>
            <Modal/>
          </div>
        </Wrapper>
      </Wrapper>
      <Wrapper isMain={false} intent='cards'>
        <div className='flex flex-col justify-center gap-6'>
          <div className='flex flex-col text-center'>
          <Text id='b-text' isHeader={true} intent='primaryLabel'>Latest transactions</Text>
          <div className='relative -top-2'>
            <Text isHeader={true} intent='secondaryLabel'>all under one roof</Text> 
          </div>
        </div>
        <Transactions />
        </div>
      </Wrapper>
      </Fade>
      <Footer/>
    </Wrapper>
  )
}

export default Wallet