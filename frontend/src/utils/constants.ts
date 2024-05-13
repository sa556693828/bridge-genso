export const TOKEN_ETH_ADDRESS = "0x0d2444EBEd072E70EdDeC0C74Ba5296C1523E109";
export const TOKEN_BSC_ADDRESS = "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2";
export const TOKEN_MATIC_ADDRESS = "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2";

export const BRIDGE_ETH_ADDRESS = "0x6A07b8e295F0f0216d888Ce519d99E95c872374A";
export const BRIDGE_BSC_ADDRESS = "0xd79Dd1Fe98F5e1EbF96e4fe81485683324226B43";
export const BRIDGE_MATIC_ADDRESS =
  "0xd79Dd1Fe98F5e1EbF96e4fe81485683324226B43";

export const token_address = (id: number): string => {
  const address: { [id: number]: string } = {
    11155111: TOKEN_ETH_ADDRESS,
    97: TOKEN_BSC_ADDRESS,
    80002: TOKEN_MATIC_ADDRESS,
  };
  return id ? address[id] : "";
};

export const bridge_address = (id: number): string => {
  const address: { [_id: number]: string } = {
    11155111: BRIDGE_ETH_ADDRESS,
    97: BRIDGE_BSC_ADDRESS,
    80002: BRIDGE_MATIC_ADDRESS,
  };
  return address[id];
};

export const etherscan_address = (id: number, blockHash: string): string => {
  const address: { [_id: number]: string } = {
    11155111: `https://sepolia.etherscan.io/tx/${blockHash}`,
    97: `https://testnet.bscscan.com/tx/${blockHash}`,
    80002: `https://amoy.polygonscan.com/tx/${blockHash}`,
  };
  return address[id];
};
export const token_name = (id: number): string => {
  const name: { [_id: number]: string } = {
    11155111: "MV",
    97: "MV",
    80002: "MV",
  };
  return name[id];
};
