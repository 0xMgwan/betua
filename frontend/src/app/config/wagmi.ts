import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// For development, using a placeholder project ID
const projectId = 'development_project_id';

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'BetUA',
  projectId,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains };
