'use client';

import React from 'react';
import { Providers } from '../providers';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Flex } from '@chakra-ui/react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Flex direction="column" minH="100vh">
        <Navbar />
        <Box flex="1">
          <main>{children}</main>
        </Box>
        <Footer />
      </Flex>
    </Providers>
  );
}
