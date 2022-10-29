import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Text } from '@atoms/Text'

const Home: NextPage = () =>  {
  return (
    <div className='w-[100vw] bg-gradient-to-r from-[#F957B0] to-[#EB7D0E] h-[100vh]'>
      <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[100px] absolute top-0 left-0' />
      <Layout title='Welcome | Digital Wallet'/>
      <p className='text-3xl font-bold'>
        Listed Components
      </p>
      <Text isHeader={true} intent='headerMain'>Hi thereadadadadad</Text>
    </div>
  )
}

export default Home