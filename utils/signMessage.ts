import { ethers } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function signMessage(
  from: string,
  to: string,
  value: number,
  nonce: number,
  chainId: number,
  symbol: string,
  validator: SignerWithAddress
) {
  const messageHash = ethers.utils.solidityKeccak256(
    ["address", "address", "uint256", "uint256", "uint256", "string"],
    [from, to, value, nonce, chainId, symbol]
  );
  const messageArray = ethers.utils.arrayify(messageHash);
  const rawSignature = await validator.signMessage(messageArray);
  return rawSignature;
}

export default signMessage;
