'use client';

import { useState } from 'react';
import { Box, Button, Text, VStack, HStack, useColorModeValue, Badge } from '@chakra-ui/react';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
}

interface EventCardProps {
  match: Match;
}

export default function EventCard({ match }: EventCardProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<'home' | 'draw' | 'away' | null>(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      bg={bgColor}
      borderColor={borderColor}
      _hover={{ shadow: 'lg' }}
      transition="all 0.3s"
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg">{match.homeTeam}</Text>
          <Text color="gray.500">vs</Text>
          <Text fontWeight="bold" fontSize="lg">{match.awayTeam}</Text>
        </HStack>

        <Text color="gray.500" fontSize="sm">
          {new Date(match.date).toLocaleDateString()}
        </Text>

        <HStack justify="space-between" mt={4}>
          <Button
            variant={selectedOutcome === 'home' ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => setSelectedOutcome('home')}
            size="sm"
          >
            Home ({match.homeOdds.toFixed(2)})
          </Button>
          <Button
            variant={selectedOutcome === 'draw' ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => setSelectedOutcome('draw')}
            size="sm"
          >
            Draw ({match.drawOdds.toFixed(2)})
          </Button>
          <Button
            variant={selectedOutcome === 'away' ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => setSelectedOutcome('away')}
            size="sm"
          >
            Away ({match.awayOdds.toFixed(2)})
          </Button>
        </HStack>

        {selectedOutcome && (
          <Button
            colorScheme="green"
            size="sm"
            mt={2}
            onClick={() => {
              // TODO: Implement bet placement
              console.log('Placing bet for:', selectedOutcome);
            }}
          >
            Place Bet
          </Button>
        )}
      </VStack>
    </Box>
  );
}
