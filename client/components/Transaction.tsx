import React from 'react';

interface TransactionProps {
  addressFrom: string;
  addressTo: string;
  amount: number;
  message: string;
  keyword: string;
  timestamp: string;
}

export function Transaction({ 
  addressFrom, 
  addressTo, 
  amount, 
  message, 
  keyword, 
  timestamp 
}: TransactionProps) {
  return (
    <div>
      <p><strong>From:</strong> {addressFrom}</p>
      <p><strong>To:</strong> {addressTo}</p>
      <p><strong>Amount:</strong> {amount} ETH</p>
      <p><strong>Message:</strong> {message}</p>
      <p><strong>Keyword:</strong> {keyword}</p>
      <p><strong>Time:</strong> {timestamp}</p>
    </div>
  );
}