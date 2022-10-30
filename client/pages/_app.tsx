import '../static/styles/globals.css'
import type { AppProps } from 'next/app'
import { TransactionProvider } from '../store/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TransactionProvider>
      <Component {...pageProps} />
    </TransactionProvider>
  )
}
