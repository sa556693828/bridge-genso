import {
  sepolia,
  bscTestnet,
  polygonAmoy,
  avalancheFuji,
  blastSepolia,
  astarZkyoto,
  immutableZkEvmTestnet,
} from "wagmi/chains";
export const TOKEN_ETH_ADDRESS = "0x7b55b455b9315ba61f36b9224098315403e4f581";
export const TOKEN_BSC_ADDRESS = "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2";
export const TOKEN_MATIC_ADDRESS = "0xd47e37f465652a65fe4299e4dd936d1c9958a9c2";
export const TOKEN_FUJI_ADDRESS = "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2";
export const TOKEN_BLAST_ADDRESS = "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2";
export const TOKEN_ASTARZKYOTO_ADDRESS =
  "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2";
export const TOKEN_IMMUTABLE_ADDRESS =
  "0x9E35A4c1894697EB93BC781c0C5581c4E97b82A2";

export const BRIDGE_ETH_ADDRESS = "0xf6Ba250088Ea05dF2494f2eDC00039C426F91101";
export const BRIDGE_BSC_ADDRESS = "0xd79Dd1Fe98F5e1EbF96e4fe81485683324226B43";
export const BRIDGE_MATIC_ADDRESS =
  "0xd20d2f9B15EE06427332b6f757aE155704AB3C9C";
export const BRIDGE_FUJI_ADDRESS = "0xd79Dd1Fe98F5e1EbF96e4fe81485683324226B43";
export const BRIDGE_BLAST_ADDRESS =
  "0xd79Dd1Fe98F5e1EbF96e4fe81485683324226B43";
export const BRIDGE_ASTARZKYOTO_ADDRESS =
  "0xd79Dd1Fe98F5e1EbF96e4fe81485683324226B43";
export const BRIDGE_IMMUTABLE_ADDRESS =
  "0xd79Dd1Fe98F5e1EbF96e4fe81485683324226B43";

const check = "";

export const token_address = (id: number): string => {
  const address: { [id: number]: string } = {
    11155111: TOKEN_ETH_ADDRESS,
    97: TOKEN_BSC_ADDRESS,
    80002: TOKEN_MATIC_ADDRESS,
    43113: TOKEN_FUJI_ADDRESS,
    168587773: TOKEN_BLAST_ADDRESS,
    6038361: TOKEN_ASTARZKYOTO_ADDRESS,
    13473: TOKEN_IMMUTABLE_ADDRESS,
  };
  return id ? address[id] : "";
};

export const bridge_address = (id: number): string => {
  const address: { [_id: number]: string } = {
    11155111: BRIDGE_ETH_ADDRESS,
    97: BRIDGE_BSC_ADDRESS,
    80002: BRIDGE_MATIC_ADDRESS,
    43113: BRIDGE_FUJI_ADDRESS,
    168587773: BRIDGE_BLAST_ADDRESS,
    6038361: BRIDGE_ASTARZKYOTO_ADDRESS,
    13473: BRIDGE_IMMUTABLE_ADDRESS,
  };
  return address[id];
};
export const etherscan_address = (id: number, blockHash: string): string => {
  const address: { [_id: number]: string } = {
    11155111: `${sepolia.blockExplorers.default.url}/tx/${blockHash}`,
    97: `${bscTestnet.blockExplorers.default.url}/tx/${blockHash}`,
    80002: `${polygonAmoy.blockExplorers.default.url}/tx/${blockHash}`,
    43113: `${avalancheFuji.blockExplorers.default.url}/tx/${blockHash}`,
    168587773: `${blastSepolia.blockExplorers.default.url}/tx/${blockHash}`,
    6038361: `${astarZkyoto.blockExplorers.default.url}/tx/${blockHash}`,
    13473: `${immutableZkEvmTestnet.blockExplorers.default.url}/tx/${blockHash}`,
  };
  return address[id];
};
export const token_name = (id: number): string => {
  const name: { [_id: number]: string } = {
    11155111: "MV",
    97: "MV",
    80002: "MV",
    43113: "MV",
    168587773: "MV",
    6038361: "MV",
    13473: "MV",
  };
  return name[id];
};
