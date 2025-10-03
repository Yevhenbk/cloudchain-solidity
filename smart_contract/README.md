# Smart Contract - Cloudchain Transactions

This directory contains the Hardhat project for the Cloudchain smart contract.

## Contract: Transactions.sol

A Solidity smart contract that handles Ethereum transactions with messages and keywords.

### Features
- Store transaction history on-chain
- Support for messages and keywords
- Event emission for transaction tracking
- Get transaction count and history

## Development Commands

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to local network
npx hardhat run scripts/deploy.js

# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia
```

## Deployment

**Current Deployment:**
- Network: Sepolia Testnet
- Contract Address: `0x53B4E280602594C99EeBBE5F86269824B6E8853A`

The contract is already deployed and integrated with the frontend application.
