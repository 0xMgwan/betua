'use client';

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box bg="navy.900" color="gray.200" borderTop="1px" borderColor="gray.700">
      <Container as={Stack} maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <Heading size="sm" color="white" mb={2}>About</Heading>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/about">About Us</Link>
            <Link href="/docs">BetUA Docs</Link>
            <Link href="/terms">Terms and Conditions</Link>
            <Link href="/token">Token Lockup</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading size="sm" color="white" mb={2}>Support</Heading>
            <Link href="/api-status">API Status</Link>
            <Link href="/responsible-gambling">Responsible Gambling</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/rules">General Betting Rules</Link>
            <Link href="/support">Live Support</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading size="sm" color="white" mb={2}>Community</Heading>
            <Link href="/leaderboards">Leaderboards</Link>
            <Link href="/blog">Blog</Link>
            <Link href="https://twitter.com/betua" isExternal>Twitter</Link>
            <Link href="https://discord.gg/betua" isExternal>Discord</Link>
            <Link href="/governance">Governance</Link>
            <Link href="/affiliates">Affiliates</Link>
          </Stack>

          <Stack align="flex-start">
            <Heading size="sm" color="white" mb={2}>Developers</Heading>
            <Link href="/api-docs">API Documentation</Link>
            <Link href="https://github.com/betua/contracts" isExternal>
              Smart Contract GitHub
            </Link>
            <Link href="/audit">Smart Contract Audit</Link>
          </Stack>
        </SimpleGrid>

        <Box borderTopWidth={1} borderColor="gray.700" pt={8} mt={8}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={8}
            alignItems="center"
          >
            <Text fontSize="sm">
              {new Date().getFullYear()} BetUA. All rights reserved.
            </Text>
            <Stack direction="row" spacing={6} justifyContent={{ base: 'center', md: 'flex-end' }}>
              <Link href="https://twitter.com/betua" isExternal>
                <Icon as={FaTwitter} boxSize={5} />
              </Link>
              <Link href="https://discord.gg/betua" isExternal>
                <Icon as={FaDiscord} boxSize={5} />
              </Link>
              <Link href="https://github.com/betua" isExternal>
                <Icon as={FaGithub} boxSize={5} />
              </Link>
            </Stack>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
