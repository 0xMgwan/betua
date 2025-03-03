'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useToast } from '@chakra-ui/react';
import { useAccount, useSignMessage } from 'wagmi';
import EmailLogin from './EmailLogin';
import WalletLogin from './WalletLogin';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [authMethod, setAuthMethod] = useState<'email' | 'wallet'>('email');
  const toast = useToast();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      // Here you would typically:
      // 1. Call your backend to verify credentials
      // 2. Get a nonce to sign
      // 3. Store the authentication token
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleWalletLogin = async () => {
    try {
      if (!address) {
        throw new Error('Please connect your wallet first');
      }

      // Here you would typically:
      // 1. Get a nonce from your backend
      // 2. Sign the nonce with the wallet
      // 3. Verify the signature on your backend
      // 4. Get and store the authentication token

      const message = `Sign this message to login to BetUA\nNonce: ${Date.now()}`;
      const signature = await signMessageAsync({ message });

      toast({
        title: 'Login Successful',
        description: 'Welcome to BetUA!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Login to BetUA
          </Dialog.Title>

          <div className="mb-6">
            <div className="flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-lg ${
                  authMethod === 'email'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('wallet')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-lg ${
                  authMethod === 'wallet'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Wallet
              </button>
            </div>
          </div>

          {authMethod === 'email' ? (
            <EmailLogin onSubmit={handleEmailLogin} />
          ) : (
            <WalletLogin onSubmit={handleWalletLogin} />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
