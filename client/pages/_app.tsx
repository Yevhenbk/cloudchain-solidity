import * as React from 'react'
import '../static/styles/globals.css'
import type { AppProps } from 'next/app'
import { TransactionProvider } from '../store/context'
import { RaceBy } from '@uiball/loaders'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 900);
  }, [])

  return (
    <TransactionProvider>
      {loading ?
      <div className='loader-wrapper'>
        <RaceBy size={100} color='#D17F82'/>
      </div> :
      <Component {...pageProps} />
      }
    </TransactionProvider>
  )
}
