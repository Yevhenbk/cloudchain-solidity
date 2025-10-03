# Cloudchain - Modern Crypto Transaction DApp

A simplified, modern decentralized application for Ethereum transactions built with the latest technology stack.

## Tech Stack Updates

### Frontend (Client)
- **Next.js**: 15.0.3 (previously 13.0.0)
- **React**: 18.3.1 (previously 18.2.0)
- **TypeScript**: 5.6.3 (previously 4.8.4)
- **Ethers.js**: 6.13.4 (previously 5.7.2)
- **MetaMask Providers**: 17.3.0 (previously 10.0.0)

### Smart Contract (Backend)
- **Hardhat**: 2.22.15 (previously 2.12.1)
- **Solidity**: 0.8.27 (previously 0.8.0)
- **Ethers.js**: 6.13.4 (previously 5.7.2)

### Removed Dependencies
- Tailwind CSS (all styling removed)
- PostCSS
- Sass
- Class Variance Authority
- React Reveal (animations)
- UI Ball Loaders
- CLSX

## Project Structure

```
cloudchain-solidity/
├── client/                 # Next.js frontend
│   ├── components/         # Simplified React components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Transaction.tsx
│   ├── pages/
│   │   ├── _app.tsx       # App wrapper
│   │   ├── index.tsx      # Home page
│   │   └── wallet.tsx     # Wallet interface
│   ├── store/
│   │   └── context.tsx    # React context for state
│   └── static/utils/
│       └── constants.ts   # Contract constants
└── smart_contract/        # Hardhat development environment
    ├── contracts/
    │   └── Transactions.sol
    ├── scripts/
    │   └── deploy.js
    └── test/
        └── Transactions.test.js
```

## Features

- **Wallet Connection**: Connect MetaMask wallet
- **Send Transactions**: Send ETH with messages and keywords
- **Transaction History**: View all transactions
- **Balance Display**: Show current ETH balance
- **No Styling**: Pure functional components without CSS frameworks

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- MetaMask browser extension
- Git

### Smart Contract Setup
```bash
cd smart_contract
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Environment Variables
Update the contract address in `client/static/utils/constants.ts` after deployment.

## Key Changes Made

1. **Modernized Dependencies**: Updated all packages to their latest stable versions
2. **Removed Styling**: Eliminated all CSS frameworks and styling for pure functionality
3. **Simplified Architecture**: Removed unnecessary abstraction layers and complex component hierarchies
4. **Ethers v6 Migration**: Updated from ethers v5 to v6 with new API patterns
5. **Hardhat Updates**: Modernized Hardhat configuration and deployment scripts
6. **TypeScript Updates**: Updated TypeScript configuration for better compatibility
7. **Network Migration**: Switched from deprecated Goerli to Sepolia testnet

## Development Commands

### Smart Contract
```bash
npm run compile    # Compile contracts
npm run test      # Run tests
npm run deploy    # Deploy to network
```

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
```

## Security Notes

- Never commit private keys to version control
- Use environment variables for sensitive data
- Test thoroughly on testnets before mainnet deployment
- Keep dependencies updated for security patches

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details