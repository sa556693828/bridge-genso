export const TOKEN_ETH_ADDRESS = "0xd2e3C2F6d5166BB86F6808BDD1940e97AeFe5404";
export const TOKEN_BSC_ADDRESS = "0x0bD9bc29Edc675709e96be4640d0bEB833374c75";
export const TOKEN_MATIC_ADDRESS = "0xE9ae2EB3A6825C7E6d3793BE7786748f51436b91";

export const BRIDGE_BSC_ADDRESS = "0xE4A6Cd1123C04E11E2F1f10b85FC72372f49904D";
export const BRIDGE_ETH_ADDRESS = "0x3a79873362AFd49E01B13eC31559c53B28dDF7B8";
export const BRIDGE_MATIC_ADDRESS =
  "0x5Dc5dE29C8F811Dc0FAb6934d10e692f600098D9";

export const token_address = (id: number): string => {
  const address: { [id: number]: string } = {
    11155111: TOKEN_ETH_ADDRESS,
    97: TOKEN_BSC_ADDRESS,
    80001: TOKEN_MATIC_ADDRESS,
  };
  return id ? address[id] : "";
};

export const bridge_address = (id: number): string => {
  const address: { [_id: number]: string } = {
    11155111: BRIDGE_ETH_ADDRESS,
    97: BRIDGE_BSC_ADDRESS,
    80001: BRIDGE_MATIC_ADDRESS,
  };
  return address[id];
};

export const etherscan_address = (id: number, blockHash: string): string => {
  const address: { [_id: number]: string } = {
    11155111: `https://sepolia.etherscan.io/tx/${blockHash}`,
    97: `https://testnet.bscscan.com/tx/${blockHash}`,
    80001: `https://mumbai.polygonscan.com/tx/${blockHash}`,
  };
  return address[id];
};
export const token_name = (id: number): string => {
  const name: { [_id: number]: string } = {
    11155111: "MV",
    97: "MV",
    80001: "MV",
  };
  return name[id];
};
