import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { FaEthereum } from 'react-icons/fa';
import { Context } from '../store/context';
import { Card } from '../components/Card';
import { Transaction } from '../components/Transaction';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const Wallet: NextPage = () => {
  const { connectedAccount, balance, formData, setFormData, sendTransaction, transactions } = React.useContext(Context);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendTransaction = async () => {
    if (formData.addressTo && formData.amount) {
      await sendTransaction();
    }
  };

  return (
    <div>
      <Head>
        <title>Digital Wallet | Cloudchain</title>
        <meta name="description" content="Your digital wallet for crypto transactions" />
      </Head>

      <header>
        <h1>Digital Wallet</h1>
      </header>

      <main>
        <section>
          <Card>
            <p><strong>Account:</strong> {connectedAccount}</p>
          </Card>
          
          <div>
            <FaEthereum />
            <span>{balance} ETH</span>
          </div>
        </section>

        <section>
          <h2>Send Transaction</h2>
          <Input
            name="addressTo"
            placeholder="Recipient Address"
            value={formData.addressTo}
            onChange={handleInputChange}
          />
          <Input
            name="amount"
            type="number"
            placeholder="Amount (ETH)"
            value={formData.amount}
            onChange={handleInputChange}
          />
          <Input
            name="keyword"
            placeholder="Keyword"
            value={formData.keyword}
            onChange={handleInputChange}
          />
          <Input
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
          />
          <Button onClick={handleSendTransaction}>
            Send Transaction
          </Button>
        </section>

        <section>
          <h2>Latest Transactions</h2>
          {transactions.map((transaction: any, index: number) => (
            <Transaction
              key={index}
              addressFrom={transaction.addressFrom}
              addressTo={transaction.addressTo}
              amount={transaction.amount}
              message={transaction.message}
              keyword={transaction.keyword}
              timestamp={transaction.timestamp}
            />
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Cloudchain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Wallet;