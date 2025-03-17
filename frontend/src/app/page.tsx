'use client';

import { Box, Container, Heading, Text, Button, Flex, VStack, HStack, Icon } from '@chakra-ui/react';
import MatchesList from './components/sports/MatchesList';
import Leaderboard from './components/sports/Leaderboard';
import { FaTrophy, FaRobot, FaChartLine } from 'react-icons/fa';

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      {/* Hero Section */}
      <Box 
        bg="navy.800" 
        p={8} 
        borderRadius="xl" 
        mb={8}
        bgGradient="linear(to-r, navy.800, blue.900)"
      >
        <VStack spacing={6} align="center" textAlign="center">
          <Heading size="2xl" bgGradient="linear(to-r, yellow.400, blue.400)" bgClip="text">
            Predict. Bet. Win.
          </Heading>
          <Text fontSize="xl" color="gray.300">
            Experience the future of sports betting with AI-powered predictions and blockchain technology
          </Text>
          <HStack spacing={8} pt={4}>
            <VStack align="center" spacing={3}>
              <Icon as={FaRobot} boxSize={8} color="yellow.400" />
              <Text fontWeight="bold" color="white">AI Predictions</Text>
              <Text fontSize="sm" color="gray.400">Smart analytics for better bets</Text>
            </VStack>
            <VStack align="center" spacing={3}>
              <Icon as={FaChartLine} boxSize={8} color="blue.400" />
              <Text fontWeight="bold" color="white">Live Updates</Text>
              <Text fontSize="sm" color="gray.400">Real-time odds and stats</Text>
            </VStack>
            <VStack align="center" spacing={3}>
              <Icon as={FaTrophy} boxSize={8} color="yellow.400" />
              <Text fontWeight="bold" color="white">Win Big</Text>
              <Text fontSize="sm" color="gray.400">Secure payouts on blockchain</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>

      {/* Matches Section */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="white">Live Matches</Heading>
        <Button
          colorScheme="blue"
          onClick={() => window.location.href = '/analytics'}
        >
          View Analytics
        </Button>
      </Flex>
      <MatchesList />
      
      {/* Leaderboard Section */}
      <Box mt={12} mb={8}>
        <Heading size="lg" color="white" mb={6}>Top Earners Leaderboard</Heading>
        <Box 
          as="section"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: '-20px',
            left: '0',
            right: '0',
            height: '100px',
            bgGradient: 'linear(to-b, transparent, navy.900)',
            zIndex: '-1',
          }}
        >
          {/* Import the Leaderboard component */}
          <Leaderboard />
        </Box>
      </Box>
    </Container>
  );
}
