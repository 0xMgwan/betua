'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'BetUA',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
