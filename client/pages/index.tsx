import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { RiExchangeLine } from 'react-icons/ri';
import { Context } from '../store/context';
import { Button } from '../components/Button';

const Home: NextPage = () =>  {
  const { connectWallet, connectedAccount } = React.useContext(Context);

  const handleButtonClick = () => {
    if (connectedAccount) {
      window.location.href = '/wallet';
    } else {
      connectWallet();
    }
  };

  return (
    <div>
      <Head>
        <title>Welcome | Cloudchain</title>
        <meta name="description" content="Cloudchain - Secure crypto transactions" />
      </Head>
      
      <header>
        <h1>Cloudchain</h1>
        <h2>Welcome to</h2>
      </header>
      
      <main>
        <p>Simply and securely transition crypto assets in two easy steps</p>
        
        <Button onClick={handleButtonClick}>
          {connectedAccount ? 'My Wallet' : 'Connect Wallet'}
          {!connectedAccount && <RiExchangeLine />}
        </Button>
      </main>
      
      <footer>
        <p>&copy; 2025 Cloudchain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;