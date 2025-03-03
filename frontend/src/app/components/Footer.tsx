'use client';

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  IconButton,
  Link,
  Divider,
} from '@chakra-ui/react';
import { FaTwitter, FaLinkedin, FaDiscord, FaGithub } from 'react-icons/fa';

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2} color="gray.300">
      {children}
    </Text>
  );
};

export function Footer() {
  return (
    <Box bg="gray.900" color="gray.200" borderTop="1px" borderColor="gray.800">
      <Container as={Stack} maxW="container.xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" bgGradient="linear(to-r, blue.400, purple.400)" bgClip="text">
                BetUA
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Next-gen decentralized sports betting platform
              </Text>
            </Box>
            <Stack direction="row" spacing={4}>
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="md"
                color="gray.400"
                variant="ghost"
                _hover={{
                  bg: 'blue.800',
                  color: 'white',
                }}
                as={Link}
                href="https://twitter.com/betua"
                isExternal
              />
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                size="md"
                color="gray.400"
                variant="ghost"
                _hover={{
                  bg: 'blue.800',
                  color: 'white',
                }}
                as={Link}
                href="https://linkedin.com/company/betua"
                isExternal
              />
              <IconButton
                aria-label="Discord"
                icon={<FaDiscord />}
                size="md"
                color="gray.400"
                variant="ghost"
                _hover={{
                  bg: 'blue.800',
                  color: 'white',
                }}
                as={Link}
                href="https://discord.gg/betua"
                isExternal
              />
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                size="md"
                color="gray.400"
                variant="ghost"
                _hover={{
                  bg: 'blue.800',
                  color: 'white',
                }}
                as={Link}
                href="https://github.com/betua"
                isExternal
              />
            </Stack>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>About</ListHeader>
            <Link href="/about" color="gray.400" _hover={{ color: 'white' }}>About Us</Link>
            <Link href="/docs" color="gray.400" _hover={{ color: 'white' }}>Documentation</Link>
            <Link href="/terms" color="gray.400" _hover={{ color: 'white' }}>Terms & Conditions</Link>
            <Link href="/privacy" color="gray.400" _hover={{ color: 'white' }}>Privacy Policy</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link href="/faq" color="gray.400" _hover={{ color: 'white' }}>FAQ</Link>
            <Link href="/rules" color="gray.400" _hover={{ color: 'white' }}>Betting Rules</Link>
            <Link href="/responsible-gambling" color="gray.400" _hover={{ color: 'white' }}>Responsible Gambling</Link>
            <Link href="/support" color="gray.400" _hover={{ color: 'white' }}>Help Center</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Developers</ListHeader>
            <Link href="/api" color="gray.400" _hover={{ color: 'white' }}>API Documentation</Link>
            <Link href="https://github.com/betua/smart-contracts" color="gray.400" _hover={{ color: 'white' }} isExternal>
              Smart Contracts
            </Link>
            <Link href="/status" color="gray.400" _hover={{ color: 'white' }}>API Status</Link>
            <Link href="/audit" color="gray.400" _hover={{ color: 'white' }}>Security Audit</Link>
          </Stack>
        </SimpleGrid>
        
        <Divider my={6} borderColor="gray.800" />
        
        <Text fontSize="sm" color="gray.500">
          © {new Date().getFullYear()} BetUA. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
