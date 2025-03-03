'use client';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || '' }),
    publicProvider()
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: 'BetUA' }),
      walletConnectWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
      injectedWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#3182ce', // blue-600
          accentColorForeground: 'white',
          borderRadius: 'medium',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
