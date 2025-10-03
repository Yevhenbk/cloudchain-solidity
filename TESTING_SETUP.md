# Quick Testing Instructions

## 1. Stop everything and restart clean:

### Terminal 1 (Smart Contract):
```bash
cd smart_contract
npx hardhat node
```

### Terminal 2 (Deploy):
```bash
cd smart_contract  
npx hardhat run scripts/deploy.js --network localhost
```

### Terminal 3 (Frontend):
```bash
cd client
npm run dev
```

## 2. MetaMask Setup:
- Network: Hardhat Local
- RPC: http://localhost:8545  
- Chain ID: 31337
- Import Account: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

## 3. Test:
- Visit http://localhost:3000
- Connect wallet
- Should work without chain ID errors

## Troubleshooting:
- If still getting errors, try Chain ID: 1337
- Clear MetaMask cache: Settings → Advanced → Reset Account
- Make sure no other blockchain is running on port 8545