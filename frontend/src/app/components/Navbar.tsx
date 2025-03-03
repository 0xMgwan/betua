'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { FaChartLine, FaRobot, FaUser, FaFootballBall, FaBrain } from 'react-icons/fa';

const Links = [
  { name: 'Betting', href: '/betting', icon: FaChartLine },
  { name: 'Predictions', href: '/predictions', icon: FaBrain },
  { name: 'Sports', href: '/sports', icon: FaFootballBall },
  { name: 'Strategy', href: '/strategy', icon: FaRobot },
  { name: 'AI Agent', href: '/ai-agent', icon: FaRobot },
  { name: 'Profile', href: '/profile', icon: FaUser },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="navy.900" borderBottom="1px" borderColor="gray.700" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          bg="gray.700"
          _hover={{ bg: 'gray.600' }}
        />
        
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
              <HStack>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  Bet<span style={{ color: '#FFD700' }}>UA</span>
                </Text>
              </HStack>
            </Link>
          </Box>
          
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <Link
                key={link.name}
                as={NextLink}
                href={link.href}
                px={3}
                py={2}
                rounded={'md'}
                color="gray.300"
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  bg: 'gray.700',
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <link.icon />
                {link.name}
              </Link>
            ))}
          </HStack>
        </HStack>

        <Box>
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
                <Box
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
                          style={{
                            backgroundColor: '#FFD700',
                            color: '#1a1b1f',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '600',
                          }}
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                          }}
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <HStack spacing={3}>
                        <button
                          onClick={openChainModal}
                          style={{
                            backgroundColor: '#1f2937',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #374151',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          {chain.hasIcon && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 16, height: 16 }}
                            />
                          )}
                          {chain.name}
                        </button>

                        <button
                          onClick={openAccountModal}
                          style={{
                            backgroundColor: '#1f2937',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #374151',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                          }}
                        >
                          {account.displayName}
                        </button>
                      </HStack>
                    );
                  })()}
                </Box>
              );
            }}
          </ConnectButton.Custom>
        </Box>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <Link
                key={link.name}
                as={NextLink}
                href={link.href}
                px={3}
                py={2}
                rounded={'md'}
                color="gray.300"
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  bg: 'gray.700',
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <link.icon />
                {link.name}
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
