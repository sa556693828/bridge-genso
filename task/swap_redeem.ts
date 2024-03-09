import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import signMessage from "../utils/signMessage";

dotenv.config();
const TOKEN_ETH_ADDRESS: string = process.env.TOKEN_ETH_ADDRESS!;
const TOKEN_BSC_ADDRESS: string = process.env.TOKEN_BSC_ADDRESS!;
const TOKEN_MATIC_ADDRESS: string = process.env.TOKEN_MATIC_ADDRESS!;
const BRIDGE_ETH_ADDRESS: string = process.env.BRIDGE_ETH_ADDRESS!;
const BRIDGE_BSC_ADDRESS: string = process.env.BRIDGE_BSC_ADDRESS!;
const BRIDGE_MATIC_ADDRESS: string = process.env.BRIDGE_MATIC_ADDRESS!;
const chainID_ETH = 5;
const chainID_BSC = 97;
const chainID_MATIC = 80001;
const mETH = "mETH";
const bETH = "bETH";
const gETH = "gETH";
interface NetworkConfig {
  bridge: string;
  token: string;
  TokenSymbol: string;
  NetWork: string;
  ChainID: number;
  redeemTask: string;
}
const NetworkObj: { [key: string]: NetworkConfig } = {
  goerli: {
    bridge: BRIDGE_ETH_ADDRESS,
    token: TOKEN_ETH_ADDRESS,
    TokenSymbol: gETH,
    NetWork: "goerli",
    ChainID: chainID_ETH,
    redeemTask: "redeemInGoerli",
  },
  mumbai: {
    bridge: BRIDGE_MATIC_ADDRESS,
    token: TOKEN_MATIC_ADDRESS,
    TokenSymbol: mETH,
    NetWork: "mumbai",
    ChainID: chainID_MATIC,
    redeemTask: "redeemInMumbai",
  },
  bscTestnet: {
    bridge: BRIDGE_BSC_ADDRESS,
    token: TOKEN_BSC_ADDRESS,
    TokenSymbol: bETH,
    NetWork: "bscTestnet",
    ChainID: chainID_BSC,
    redeemTask: "redeemInBSC",
  },
};
async function swapTokens(
  hre: any,
  to: string,
  value: number,
  bridgeAddress: string,
  tokenAddress: string,
  FromTokenSymbol: string,
  FromNetWork: string,
  FromChainID: number,
  ToTokenSymbol: string,
  toNetWork: string,
  ToChainID: number
) {
  try {
    let nonce = 0;
    const bridge = await hre.ethers.getContractAt("Bridge", bridgeAddress);
    const token = await hre.ethers.getContractAt("Token", tokenAddress);

    const [acc0] = await hre.ethers.getSigners();
    let balance = await token.balanceOf(acc0.address);
    console.log(`\nStarted Swapped by ${to}`);
    console.log(
      `\nBalance of giver is ${hre.ethers.utils.formatEther(
        balance
      )} ${FromTokenSymbol}`
    );
    const tx_swap = await bridge.swap(
      to,
      value,
      0,
      FromChainID,
      FromTokenSymbol
    );
    await tx_swap.wait();
    if (tx_swap?.hash) {
      console.log(`\nSwapped successfully from ${FromNetWork} to ${toNetWork}`);
      console.log(`\nTx hash: ${tx_swap.hash}`);
      const messageHash = await signMessage(
        acc0.address,
        to,
        value,
        nonce,
        ToChainID,
        ToTokenSymbol,
        acc0
      );
      balance = await token.balanceOf(acc0.address);
      console.log(
        `\nBalance of giver is ${hre.ethers.utils.formatEther(
          balance
        )} ${FromTokenSymbol}`
      );
      console.log(
        `\nRun: npx hardhat redeem --to ${to} --value ${value} --signature ${messageHash} --fromnetwork ${toNetWork} --network ${toNetWork}`
      );
    }
  } catch (err: any) {
    console.log(`Swap error: ${err.message}`);
  }
}
async function redeemTokens(
  hre: any,
  to: string,
  value: number,
  signature: string,
  bridgeAddress: string,
  tokenAddress: string,
  FromTokenSymbol: string,
  FromNetWork: string,
  FromChainID: number
) {
  try {
    const bridge = await hre.ethers.getContractAt("Bridge", bridgeAddress);
    const token = await hre.ethers.getContractAt("Token", tokenAddress);

    const [acc0] = await hre.ethers.getSigners();
    let balance = await token.balanceOf(to);
    console.log(
      `Started Redeemed to ${to}. Balance of receiver ${hre.ethers.utils.formatEther(
        balance
      )} ${FromTokenSymbol}`
    );
    const tx_redeem = await bridge.redeem(
      acc0.address,
      to,
      value,
      0,
      FromChainID,
      FromTokenSymbol,
      signature
    );
    if (tx_redeem.hash) {
      balance = await token.balanceOf(to);
      console.log(
        `Redeem successfully in ${FromNetWork}, tx.id ${tx_redeem.hash}`
      );
      console.log(
        `Balance of Receiver after redeem is ${balance} ${FromTokenSymbol}`
      );
    }
  } catch (err: any) {
    console.log(`redeem error: ${err.message}`);
  }
}

//eg. npx hardhat swap --to 0x09CC770985f9254f4C7F3C8C81A035b9B2bB03F9 --value 10000000000000 --fromnetwork goerli --tonetwork mumbai --network goerli
task("swap", "Swap tokens from FromNetwork to ToNetwork")
  .addParam("to", "Address to swap")
  .addParam("value", "Value of FromNetwork to swap to ToNetwork")
  .addParam("fromnetwork", "Network to swap from")
  .addParam("tonetwork", "Network to swap to")
  .setAction(async (taskArgs, hre) => {
    await swapTokens(
      hre,
      taskArgs.to,
      taskArgs.value,
      NetworkObj[taskArgs.fromnetwork].bridge,
      NetworkObj[taskArgs.fromnetwork].token,
      NetworkObj[taskArgs.fromnetwork].TokenSymbol,
      NetworkObj[taskArgs.fromnetwork].NetWork,
      NetworkObj[taskArgs.fromnetwork].ChainID,
      NetworkObj[taskArgs.tonetwork].TokenSymbol,
      NetworkObj[taskArgs.tonetwork].NetWork,
      NetworkObj[taskArgs.tonetwork].ChainID
    );
  });
//eg. npx hardhat redeem --to 0x09CC770985f9254f4C7F3C8C81A035b9B2bB03F9 --value 10000000000000 --signature 0x09CC770985f9254f4C7F3C8C81A035b9B2bB03F9 --fromnetwork mumbai  --network mumbai
task("redeem", "approve swapped tokens in fromNetwork")
  .addParam("to", "address to swap")
  .addParam("value", "redeem value")
  .addParam("signature", "signature to sign message")
  .addParam("fromnetwork", "network to redeem from")
  .setAction(async (taskArgs, hre) => {
    await redeemTokens(
      hre,
      taskArgs.to,
      taskArgs.value,
      taskArgs.signature,
      NetworkObj[taskArgs.fromnetwork].bridge,
      NetworkObj[taskArgs.fromnetwork].token,
      NetworkObj[taskArgs.fromnetwork].TokenSymbol,
      NetworkObj[taskArgs.fromnetwork].NetWork,
      NetworkObj[taskArgs.fromnetwork].ChainID
    );
  });
