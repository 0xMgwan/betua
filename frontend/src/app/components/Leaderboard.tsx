'use client';

import { Box, VStack, Text, HStack, Avatar } from '@chakra-ui/react';

export function Leaderboard() {
  const topUsers = [
    { name: 'CryptoKing', winnings: 245.5, avatar: 'C' },
    { name: 'BetMaster', winnings: 189.2, avatar: 'B' },
    { name: 'SportsPro', winnings: 156.8, avatar: 'S' },
    { name: 'PredictPro', winnings: 123.4, avatar: 'P' },
    { name: 'BetWizard', winnings: 98.1, avatar: 'B' },
  ];

  return (
    <Box bg="gray.800" p={6} borderRadius="xl" border="1px" borderColor="gray.700">
      <Text fontSize="xl" fontWeight="bold" mb={6} color="white">Top Performers</Text>
      <VStack spacing={4} align="stretch">
        {topUsers.map((user, index) => (
          <Box 
            key={user.name} 
            p={4} 
            bg="gray.700" 
            borderRadius="lg"
            _hover={{ bg: 'gray.600' }}
            transition="all 0.2s"
          >
            <HStack spacing={4}>
              <Text color="gray.400" fontSize="sm" width="24px">#{index + 1}</Text>
              <Avatar 
                name={user.name} 
                size="sm" 
                bg={`blue.${500 - index * 100}`} 
                color="white"
              />
              <Box flex="1">
                <Text fontWeight="bold" color="white">{user.name}</Text>
                <HStack spacing={2} mt={1}>
                  <Text fontSize="sm" color="gray.400">Total Winnings</Text>
                  <Text fontSize="sm" color="green.400" fontWeight="semibold">
                    +{user.winnings.toFixed(2)} ETH
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
