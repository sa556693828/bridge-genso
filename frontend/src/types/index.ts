export interface Option {
  token: string;
  chainID: number;
  address: string;
  image: string;
}
export interface SwapProps {
  fromChainID: number;
  value: number;
  toChainID: number;
}
