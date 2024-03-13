import { ethers } from "hardhat";
import saveFrontendFiles from "../utils/saveFrontendFiles";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_MATIC_ADDRESS: string =
  "0xA3c322Ad15218fBFAEd26bA7f616249f7705D945";
const chainID_MATIC = 80001;
// const chainID_MATIC = 137;
const AUTHORIZED_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("AUTHORIZED_ROLE")
);

async function main() {
  const [deployer] = await ethers.getSigners();
  const symbol = "MV";
  console.log("Deploying contracts with the account:", deployer.address);
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("Metaverse", symbol, 10000000000);
  await token.deployed();
  console.log(`Token ${symbol} deployed on ${token.address}`);
  saveFrontendFiles("TOKEN_MATIC_ADDRESS", token.address);
  const Bridge = await ethers.getContractFactory("Bridge");
  const bridge = await Bridge.deploy(
    VALIDATOR_ADDRESS,
    // TOKEN_MATIC_ADDRESS,
    token.address,
    chainID_MATIC,
    false
  );
  await bridge.deployed();
  // create token instance with TOKEN_MATIC_ADDRESS
  await token.approve(deployer.address, 100000000000000);
  await token.approve(bridge.address, 100000000000000);
  const tx = await token.grantRole(AUTHORIZED_ROLE, deployer.address);
  const txBridge = await token.grantRole(AUTHORIZED_ROLE, bridge.address);
  await tx.wait();
  await txBridge.wait();
  if (tx?.hash) {
    console.log(`successfully from added authorized role, tx.id ${tx.hash}`);
  }
  // mint
  await token.mint(deployer.address, 100000000000000);
  // transfer to bridge
  await bridge.receiveToken(1000000000000);

  console.log(
    "bridge Matic Mumbai deployed to:",
    bridge.address,
    "with validator",
    VALIDATOR_ADDRESS,
    "and TOKEN_mETH",
    token.address
  );
  saveFrontendFiles("BRIDGE_MATIC_ADDRESS", bridge.address);
  // console.log(`\n run:`);
  // console.log(
  //   `\n npx hardhat grantRole --bridge ${bridge.address} --token ${TOKEN_MATIC_ADDRESS} --network mumbai`
  // );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
