import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
import "./task/swap_redeem";
import "./task/grant_roles";
dotenv.config();

const ALCHEMY_PROJECT_ID = process.env.ALCHEMY_PROJECT_ID || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYSCAN_API_KEY = process.env.POLYSCAN_API_KEY || "";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
const MNEMONIC = process.env.MNEMONIC || "";
const GOERLI_URL = process.env.ALCHEMY_PROJECT_ID
  ? `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_PROJECT_ID}`
  : "";
const BSC_TEST_URL = `https://data-seed-prebsc-1-s1.binance.org:8545/`;
const MATIC_TEST_URL = `https://polygon-mumbai.g.alchemy.com/v2/${POLYSCAN_API_KEY}`;
const ASTAR_URL = "https://1rpc.io/astr";
const ETH_RPC_URL = "https://eth.merkle.io";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: process.env.RPC_URL as string,
      },
      accounts: [
        {
          privateKey: process.env.PRIVATE_KEY as string,
          balance: "1000000000000000000000000",
        },
      ],
    },
    goerli: {
      url: GOERLI_URL,
      allowUnlimitedContractSize: true,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    bscTestnet: {
      url: BSC_TEST_URL || "",
      allowUnlimitedContractSize: true,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    polygonMumbai: {
      url: MATIC_TEST_URL,
      chainId: 80001,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    astar: {
      url: ASTAR_URL,
      chainId: 592,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      polygonMumbai: POLYSCAN_API_KEY,
    },
  },
};

export default config;
