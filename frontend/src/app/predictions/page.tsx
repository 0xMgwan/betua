'use client';

import { Container, Heading, Box, VStack, Text } from '@chakra-ui/react';

export default function PredictionsPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={6}>AI Predictions</Heading>
      <Box>
        <VStack spacing={4} align="stretch">
          <Text>AI predictions content will go here</Text>
        </VStack>
      </Box>
    </Container>
  );
}
