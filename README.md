# Cloudchain - Modern Blockchain DApp

A modern decentralized application for Ethereum transactions featuring Next.js 15 App Router, TypeScript, and Giphy GIF integration. Send crypto transactions with visual flair!

![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)

## ✨ Features

- 🔗 **MetaMask Integration** - Seamless wallet connection
- 💸 **Send Transactions** - Send ETH with messages and keywords on Sepolia testnet
- 🎬 **GIF Integration** - Visual transaction history with Giphy API
- 📊 **Transaction History** - Real-time transaction tracking with auto-refresh
- 🎨 **Modern UI** - Built with Tailwind CSS and responsive design
- ⚡ **Next.js 15** - Latest App Router with server actions and client components
- 🔒 **Type Safety** - Full TypeScript with Zod validation
- 🔄 **Auto-loading** - Transaction history loads instantly upon page visit

## 🚀 Tech Stack

### Frontend
- **Next.js** 15.0.3 with App Router
- **React** 18.3.1 with modern hooks
- **TypeScript** 5.6.3 with comprehensive types
- **Tailwind CSS** Latest with forms plugin
- **ethers.js** 6.13.4 for blockchain interaction
- **Zod** 4.1+ for runtime validation

### Smart Contract
- **Solidity** 0.8.27
- **Hardhat** 2.22.15
- **Deployed on Sepolia** testnet

### APIs
- **Giphy API** for keyword-based GIF display

## 📁 Project Structure

```
cloudchain-solidity/
├── client/                          # Next.js 15 App Router frontend
│   ├── app/                        # App Router pages and layouts
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Home page
│   │   └── wallet/
│   │       ├── page.tsx            # Wallet interface
│   │       └── components/         # Wallet-specific components
│   │           ├── WalletClient.tsx
│   │           ├── TransactionList.tsx
│   │           ├── GifDisplay.tsx
│   │           └── ...
│   ├── lib/                        # Business logic and utilities
│   │   ├── actions/                # Server actions
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── types/                  # TypeScript definitions
│   │   └── utils/                  # Utility functions
│   └── globals.d.ts                # Global type declarations
└── smart_contract/                 # Hardhat development environment
    ├── contracts/
    │   └── Transactions.sol        # Main smart contract
    ├── scripts/
    │   └── deploy.js              # Deployment script
    └── test/                       # Contract tests
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Yevhenbk/cloudchain-solidity.git
cd cloudchain-solidity
```

### 2. Smart Contract Setup
```bash
cd smart_contract
npm install
npx hardhat compile
npx hardhat test
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Environment Configuration
Create `.env` file in the client directory:
```env
NEXT_PUBLIC_VITE_GIPHY_API=your_giphy_api_key_here
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🌐 Deployment Information

- **Smart Contract**: Deployed on Sepolia testnet
- **Contract Address**: `0x53B4E280602594C99EeBBE5F86269824B6E8853A`
- **Network**: Sepolia (Chain ID: 11155111)

### MetaMask Setup for Sepolia
1. Add Sepolia network to MetaMask
2. Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
3. Connect your wallet in the application

## 🎯 Usage

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Send Transactions**: 
   - Enter recipient address
   - Specify amount in ETH
   - Add a keyword (for GIF display)
   - Add optional message
   - Confirm transaction in MetaMask
3. **View History**: Transaction history loads automatically with GIFs based on keywords
4. **Enjoy GIFs**: Watch your transactions come to life with animated GIFs!

## 🎨 GIF Feature

The application integrates with Giphy API to display relevant GIFs based on transaction keywords:
- **Live Preview**: See GIF preview while typing keywords
- **Transaction History**: Each transaction displays a GIF matching its keyword
- **Smart Fallbacks**: Beautiful fallbacks when GIFs can't be loaded
- **Performance**: Intelligent caching and debounced loading

## 🧪 Testing

### Smart Contract Tests
```bash
cd smart_contract
npx hardhat test
```

### Manual Testing
1. Connect MetaMask to Sepolia testnet
2. Get test ETH from faucet
3. Send a transaction with keyword like "happy" or "money"
4. Watch GIF appear in transaction history

## 🏗️ Architecture Highlights

- **App Router**: Modern Next.js 15 with server/client separation
- **Server Actions**: Optimistic updates with server-side logic
- **Type Safety**: End-to-end TypeScript with runtime validation
- **Modern Hooks**: Custom hooks for wallet and transaction management
- **Error Boundaries**: Graceful error handling throughout the app
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [Cloudchain DApp](https://cloudchain.vercel.app)
- **Smart Contract**: [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x53B4E280602594C99EeBBE5F86269824B6E8853A)
- **Repository**: [GitHub](https://github.com/Yevhenbk/cloudchain-solidity)

---

Made with ❤️ by [Yevhenbk](https://github.com/Yevhenbk)
