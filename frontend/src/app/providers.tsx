'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable');
}

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: alchemyKey as string }),
    publicProvider(),
  ],
);

const { wallets } = getDefaultWallets({
  appName: 'Betua',
  projectId,
  chains,
});

const appInfo = {
  appName: 'Betua',
  learnMoreUrl: 'https://betua.xyz/learn-more',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// Extend Chakra theme for custom styles
const theme = extendTheme({
  colors: {
    navy: {
      900: '#0a1930',
      800: '#1a2942',
      700: '#2a3952',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'navy.900',
        color: 'white',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={appInfo}
        theme={midnightTheme({
          accentColor: '#FFD700',
          accentColorForeground: '#1a1b1f',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        coolMode
      >
        <ChakraProvider theme={theme}>
          {mounted && children}
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
