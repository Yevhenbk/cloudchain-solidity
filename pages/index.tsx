import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Text } from '@molecules/Text'
import { Button } from '@molecules/Button'
import { RiExchangeLine } from 'react-icons/ri'
import { Footer } from '@organisms/Footer'

const Home: NextPage = () =>  {
  return (
    <div className='w-[100vw] bg-[#EEF2F5] h-[100vh] overflow-hidden 
    flex flex-col justify-around items-center'>
        <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        <Layout title='Welcome | Digital Wallet'/>
      <section className='flex flex-col justify-start items-center max-w-[645px] 2xl:max-w-[800px]'>
        <Text id='b-text' isHeader={true} intent='primary'>Cloudchain</Text>
        <div className='relative -top-8 -left-36 h-4 2xl:-top-12 2xl:-left-52'>
          <Text id='t-stroke' isHeader={true} intent='secondary'>Welcome to</Text>
        </div>
        <Text isHeader={false} intent='teritary'>Simply and securely transition crypto assets in two simple steps</Text>
        <div className='mt-6'>
          <Button isButton={true} intent='primary'>
            <Text isHeader={false} intent='button'>Connect Wallet</Text>
            <RiExchangeLine className='text-5xl bg-white rounded-full p-3 group-hover:transition ease-in-out duration-300 group-hover:rotate-90 text-dark relative -right-6'/>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home