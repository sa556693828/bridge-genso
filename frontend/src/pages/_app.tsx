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
import { Toaster } from "react-hot-toast";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";

const infuraKey = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

const { chains, publicClient } = configureChains(
  [sepolia, bscTestnet, polygonMumbai, polygon],
  [
    infuraProvider({ apiKey: infuraKey }),
    publicProvider(),
    alchemyProvider({ apiKey: alchemyKey }),
  ],
);
const { connectors } = getDefaultWallets({
  appName: "Demo",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
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
          <Toaster
            toastOptions={{
              style: {
                background: "#0F0F0F",
                paddingTop: "6px",
                paddingBottom: "6px",
                paddingRight: "10px",
                paddingLeft: "10px",
                border: "1px solid #B4FF78",
                color: "#B4FF78",
                fontSize: "12px",
                fontFamily: "Digital Numbers",
              },
            }}
          />
          <Component {...pageProps} />
        </BaseLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
