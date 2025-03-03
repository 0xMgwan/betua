'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletLoginProps {
  onSubmit: () => void;
}

export default function WalletLogin({ onSubmit }: WalletLoginProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Connect your Web3 wallet to access your account. We support multiple chains including Ethereum, Polygon, and others.
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
                      >
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div className="space-y-3">
                      <button
                        onClick={openChainModal}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 20,
                              height: 20,
                              borderRadius: 999,
                              overflow: 'hidden',
                            }}
                          >
                            {chain.iconUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button
                        onClick={openAccountModal}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        {account.displayName}
                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
                      </button>

                      <button
                        onClick={() => disconnect()}
                        className="w-full bg-red-100 text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200"
                      >
                        Disconnect
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>

      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500">
          By connecting a wallet, you agree to BetUA's{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
