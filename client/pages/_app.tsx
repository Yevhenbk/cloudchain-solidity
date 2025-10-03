import React from 'react';
import type { AppProps } from 'next/app';
import { TransactionProvider } from '../store/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TransactionProvider>
      <Component {...pageProps} />
    </TransactionProvider>
  );
}
