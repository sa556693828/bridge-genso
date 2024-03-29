import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";
import "./task/swap_redeem";
import "./task/grant_roles";
dotenv.config();

const ALCHEMY_POLYGON_API_KEY = process.env.ALCHEMY_POLYGON_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
const ALCHEMY_PROJECT_ID = process.env.ALCHEMY_PROJECT_ID || "";
const SEPOLIA_URL =
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_PROJECT_ID}` || "";
const BSC_TEST_URL = `https://data-seed-prebsc-1-s1.binance.org:8545/`;
const MATIC_TEST_URL = `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_POLYGON_API_KEY}`;

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
    sepolia: {
      url: SEPOLIA_URL,
      allowUnlimitedContractSize: true,
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    bscTestnet: {
      url: BSC_TEST_URL || "",
      allowUnlimitedContractSize: true,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mumbai: {
      url: MATIC_TEST_URL,
      chainId: 80001,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    local: {
      url: "http://localhost:8545",
      chainId: 1337,
      allowUnlimitedContractSize: true,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  // gasReporter: {
  //   enabled: false,
  //   currency: "USD",
  // },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY,
      polygonMumbai: ALCHEMY_POLYGON_API_KEY,
    },
  },
};

export default config;
