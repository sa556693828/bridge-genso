import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  sepolia,
  polygonMumbai,
  bsc,
  bscTestnet,
} from "wagmi/chains";
import BaseLayout from "@/components/layouts/BasicLayout";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "@wagmi/core/providers/infura";

const key = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;
const infuraKey = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;

const { chains, publicClient } = configureChains(
  [sepolia, polygonMumbai, bscTestnet],
  [infuraProvider({ apiKey: infuraKey }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Demo",
  projectId: "631e3d900609032a9571370557f3cef1",
  chains: chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
