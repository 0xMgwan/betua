'use client';

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? polygon : polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'BetUA',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#EAB308', // yellow-500
          accentColorForeground: 'black',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
