'use client';

import { Container, Heading, Box, VStack, Text } from '@chakra-ui/react';

export default function CommentsPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={6}>Community</Heading>
      <Box>
        <VStack spacing={4} align="stretch">
          <Text>Community content will go here</Text>
        </VStack>
      </Box>
    </Container>
  );
}
