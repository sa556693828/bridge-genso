import { ethers } from "hardhat";
import signMessage from "../utils/signMessage";

const Web3 = require("web3");
const Bridge = require("../build/contracts/Bridge.json");
const BRIDGE_ETH_ADDRESS: string = process.env.BRIDGE_ETH_ADDRESS!;
const BRIDGE_BSC_ADDRESS: string = process.env.BRIDGE_BSC_ADDRESS!;
const BRIDGE_MATIC_ADDRESS: string = process.env.BRIDGE_MATIC_ADDRESS!;

const web3Eth = new Web3(
  `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
);
const web3Mum = new Web3(
  `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const web3Bsc = new Web3("wss://bsc-testnet-rpc.publicnode.com");

const adminPrivKey = process.env.PRIVATE_KEY;
const { address: admin } = web3Mum.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3Eth.eth.Contract(Bridge.abi, BRIDGE_ETH_ADDRESS);
const bridgeMum = new web3Mum.eth.Contract(Bridge.abi, BRIDGE_MATIC_ADDRESS);
const bridgeBsc = new web3Bsc.eth.Contract(Bridge.abi, BRIDGE_BSC_ADDRESS);

console.log("Listening for SwapInitialized events...");
bridgeEth.events.SwapInitialized().on("data", async (event: any) => {
  const [acc0] = await ethers.getSigners();
  const { from, to, amount, nonce, chainId, symbol } = event.returnValues;
  const messageHash = await signMessage(
    acc0.address,
    to,
    amount,
    nonce,
    chainId,
    symbol,
    acc0
  );
  console.log(`
        SwapInitialized event:
        - from ${from}
        - to ${to}
        - amount ${amount} tokens
        - nonce ${nonce}
        - chainId ${chainId}
        - symbol ${symbol}
        `);
  try {
    const tx = await bridgeMum.methods.redeem(
      from,
      to,
      amount,
      nonce,
      chainId,
      symbol,
      messageHash
    );

    const [gasPrice, gasCost] = await Promise.all([
      web3Mum.eth.getGasPrice(),
      tx.estimateGas({ from: admin }),
    ]);
    const data = tx.encodeABI();
    const txData = {
      from: admin,
      to: bridgeMum.options.address,
      data,
      gasLimit: 3000000,
      gas: gasCost,
      gasPrice,
    };
    const receipt = await web3Mum.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`
    Processed transfer:
    - from ${from}
    - to ${to}
    - amount ${amount} tokens
    - nonce ${nonce}
    - chainId ${chainId}
    - symbol ${symbol}
  `);
  } catch (error) {
    console.error("Error processing SwapInitialized event:", error);
  }
});
