import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Text } from '@molecules/Text'
import { Button } from '@molecules/Button'
import { CreditCard } from '@molecules/CreditCard'
import { RiExchangeLine } from 'react-icons/ri'

const Home: NextPage = () =>  {
  return (
    <div className='w-[100vw] bg-[#EEF2F5] h-[100vh] overflow-hidden 
    flex flex-row justify-around items-center'>
        <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        <Layout title='Welcome | Digital Wallet'/>
      <section className='flex flex-col justify-start items-center max-w-[580px]'>
        <Text id='b-text' isHeader={true} intent='h1'>Cloudchain</Text>
        <div className='relative -top-8 -left-36 h-4'>
          <Text id='t-stroke' isHeader={true} intent='h2'>Welcome to</Text>
        </div>
        <Text isHeader={false} intent='p'>Simply and securely transition crypto assets in a few simple steps</Text>
        <div className='mt-6'>
          <Button isButton={true} intent='primary'>
            <Text isHeader={false} intent='primary'>Connect Wallet</Text>
            <RiExchangeLine className='text-5xl bg-white rounded-full p-3 relative -right-6'/>
          </Button>
        </div>
      </section>
      {/* <CreditCard address={<Text isHeader={false} intent='card'>0438-20932-8538-4324</Text>} /> */}
    </div>
  )
}

export default Home