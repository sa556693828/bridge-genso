import { ethers } from "hardhat";
import saveFrontendFiles from "../utils/saveFrontendFiles";

async function main() {
  const [deployer] = await ethers.getSigners();
  const symbol = "MV";
  console.log("Deploying contracts with the account:", deployer.address);
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("Metaverse", symbol, 100);
  await token.deployed();

  // console.log(`Token ${symbol} deployed on ${token.address}`);
  console.log(`Token ${symbol} deployed on ${token.address}`);
  saveFrontendFiles("TOKEN_MATIC_ADDRESS", token.address);

  const tokenAddress = process.env.TOKEN_MATIC_ADDRESS!;
  // saveFrontendFiles("TOKEN_MATIC_ADDRESS", tokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
