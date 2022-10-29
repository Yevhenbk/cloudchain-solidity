import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Text } from '@molecules/Text'
import { Button } from '@molecules/Button'
import { CreditCard } from '@organisms/CreditCard'

const Home: NextPage = () =>  {
  return (
    <div className='w-[100vw] bg-gradient-to-r from-[#471932] to-[#522d09] h-[100vh] overflow-hidden 
    flex flex-row justify-around items-center'>
        <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[110px] absolute top-0 left-0' />
        <Layout title='Welcome | Digital Wallet'/>
      <section className='flex flex-col justify-start max-w-[480px]'>
        <Text isHeader={true} intent='h1'>Blockchain</Text>
        <div className='relative -top-7 -right-10 h-6'>
          <Text isHeader={true} intent='h2'>We love</Text>
        </div>
        <Text isHeader={false} intent='p'>Simply and securely exchange crypto assets in a few simple steps</Text>
        <div className='mt-6'>
          <Button isIcon={false} intent='button'><Text isHeader={false} intent='button'>Connect Wallet</Text></Button>
        </div>
      </section>
      {/* <CreditCard address={<Text isHeader={false} intent='card'>0438-20932-8538-4324</Text>} /> */}
    </div>
  )
}

export default Home