import { ethers } from "hardhat";
import saveFrontendFiles from "../utils/saveFrontendFiles";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_ETH_ADDRESS: string = process.env.TOKEN_ETH_ADDRESS!;
const chainID_ETH = 11155111;

async function main() {
  const Bridge = await ethers.getContractFactory("Bridge");
  const bridge = await Bridge.deploy(
    VALIDATOR_ADDRESS,
    TOKEN_ETH_ADDRESS,
    chainID_ETH,
    true
  );
  await bridge.deployed();
  console.log(
    "bridge Ethereum deployed to:",
    bridge.address,
    "with validator",
    VALIDATOR_ADDRESS,
    "and TOKEN_ETH",
    TOKEN_ETH_ADDRESS
  );
  saveFrontendFiles("BRIDGE_ETH_ADDRESS", bridge.address);
  console.log(`\n run:`);
  console.log(
    `\n npx hardhat grantRole --bridge ${bridge.address} --token ${TOKEN_ETH_ADDRESS} --network sepolia`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
