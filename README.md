# Cross chain bridge
app, which executes the ERC20 tokens(eETH, bETH and mETH) between Sepolia, Binance Testnet and Matic Mumbai Testnet, and reversely.

The project was built using solidity and hardhat. Contracts are tested with full coverage and deployed on Sepolia Ethereum Testnet Network, Binance Testnet Network, Matic Mumbai Testnet Networks

add .env file
```bash
npm install
npx hardhat test
npx hardhat coverage
```
## Contract deployments on Ethereum Sepolia
```bash
npx hardhat run scripts/1_deploy_gETH.ts --network sepolia
npx hardhat run scripts/4_deploy_bridge_ETH.ts --network sepolia
npx hardhat grantRole --bridge [bridgeAddress] --token [eETH address] --network sepolia
```

## Task for swap from Ethereum to Mumbai
```tasks
1. npx hardhat swap --to [address] --value [value] --fromnetwork sepolia --tonetwork mumbai --network sepolia
2. then copy values from console for redeem with signature
```
## Task for redeem token in Mumbai
```tasks
1. npx hardhat redeem --to [address] --value [value] --signature [signature] --fromnetwork mumbai --nonce [nonce]  --network mumbai
```

## swaps explained
when Swap token from Ethereum to Mumbai
1. gETH tokens are burn on Ethereum contract by Bridge ETH
2. Signed message is created
3. Reedem function can be run with created previously message, then: Tokens mETH are minted on the Mumbai network

/////------------------------TOKENS----------------------------------//////
## Token gETH on Sepolia Tesnet 
### 0xd2e3C2F6d5166BB86F6808BDD1940e97AeFe5404
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0xd2e3C2F6d5166BB86F6808BDD1940e97AeFe5404#code)

## Token mETH on Mumbai Testnet 
### Matic Mumbai 0xDB5d8Ba36F425637cead4DF9c47980Fbd92Fd3Eb
[contract at Mumbai Matic] (https://mumbai.polygonscan.com/address/0xDB5d8Ba36F425637cead4DF9c47980Fbd92Fd3Eb#code)

## Token bETH on bscscan Testnet 
### bscscan Testnet 0xDF3379d2C03941CA3D915c275791025F0eE9B4cc
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0xDF3379d2C03941CA3D915c275791025F0eE9B4cc#code)

/////------------------------BRIDGES----------------------------------//////
## Bridge Ethereum
### Sepolia 0x3a79873362AFd49E01B13eC31559c53B28dDF7B8
[contract at sepolia.etherscan.io] (https://sepolia.etherscan.io/address/0x3a79873362AFd49E01B13eC31559c53B28dDF7B8#code)

## Bridge Matic 
### Mumbai 0xaB7e1571801b69AAFD4011CbA2b838933C200124
[contract at Mumbai Matic] (https://mumbai.polygonscan.com/address/0xaB7e1571801b69AAFD4011CbA2b838933C200124#code)


<!-- ## Bridge Bscscan 
### Bscscan 0x8d11D5879446483fE856f5B2B7747A3e27551660
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x8d11D5879446483fE856f5B2B7747A3e27551660#code) -->

# Frontend app built with next.js - work in progress
```
yarn
yarn run dev
```