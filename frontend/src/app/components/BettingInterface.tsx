'use client';

import { useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaBasketball, FaFutbol, FaHockeyPuck, FaBaseballBall, FaVolleyballBall } from 'react-icons/fa';

const sportsData = {
  basketball: [
    {
      league: 'NBA',
      matches: [
        {
          id: '1',
          teamA: 'Sacramento Kings',
          teamB: 'Houston Rockets',
          time: 'Tomorrow 5:00am',
          isLive: true,
          odds: {
            spread: { value: 6, odds: 1.76 },
            moneyLine: { value: 2.67 },
            total: { value: 228.5, odds: 1.93 }
          }
        },
        {
          id: '2',
          teamA: 'LA Lakers',
          teamB: 'Golden State Warriors',
          time: 'Today 11:30pm',
          isLive: true,
          odds: {
            spread: { value: -3.5, odds: 1.95 },
            moneyLine: { value: 1.85 },
            total: { value: 235.5, odds: 1.88 }
          }
        }
      ]
    }
  ],
  soccer: [
    {
      league: 'Premier League',
      matches: [
        {
          id: '3',
          teamA: 'Arsenal',
          teamB: 'Manchester City',
          time: 'Today 8:30pm',
          isLive: true,
          odds: {
            spread: { value: 0.5, odds: 2.05 },
            moneyLine: { value: 2.45 },
            total: { value: 2.5, odds: 1.85 }
          }
        }
      ]
    }
  ],
  hockey: [
    {
      league: 'NHL',
      matches: [
        {
          id: '4',
          teamA: 'Toronto Maple Leafs',
          teamB: 'Montreal Canadiens',
          time: 'Tomorrow 2:00am',
          isLive: true,
          odds: {
            spread: { value: -1.5, odds: 2.15 },
            moneyLine: { value: 1.85 },
            total: { value: 6.5, odds: 1.92 }
          }
        }
      ]
    }
  ],
  baseball: [
    {
      league: 'MLB',
      matches: [
        {
          id: '5',
          teamA: 'NY Yankees',
          teamB: 'Boston Red Sox',
          time: 'Today 10:00pm',
          isLive: true,
          odds: {
            spread: { value: -1.5, odds: 1.95 },
            moneyLine: { value: 1.75 },
            total: { value: 8.5, odds: 1.88 }
          }
        }
      ]
    }
  ],
  volleyball: [
    {
      league: 'CEV Champions League',
      matches: [
        {
          id: '6',
          teamA: 'Trentino',
          teamB: 'Zenit Kazan',
          time: 'Tomorrow 8:00pm',
          isLive: true,
          odds: {
            spread: { value: 2.5, odds: 1.85 },
            moneyLine: { value: 2.25 },
            total: { value: 185.5, odds: 1.92 }
          }
        }
      ]
    }
  ]
};

export default function BettingInterface() {
  const [selectedSport, setSelectedSport] = useState('basketball');

  const renderMatch = (match: any) => (
    <Box 
      key={match.id}
      bg="gray.800"
      p={4}
      borderRadius="xl"
      border="1px"
      borderColor="gray.700"
      mb={4}
      _hover={{ borderColor: 'blue.500' }}
      transition="all 0.2s"
    >
      <HStack justify="space-between" mb={3}>
        <Text color="gray.400" fontSize="sm">{match.league}</Text>
        <HStack>
          <Text color="gray.400" fontSize="sm">{match.time}</Text>
          {match.isLive && (
            <Badge colorScheme="green" variant="solid" fontSize="xs">
              LIVE
            </Badge>
          )}
        </HStack>
      </HStack>

      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Text color="white" fontWeight="semibold">{match.teamA}</Text>
          <Text color="white" fontWeight="semibold">{match.teamB}</Text>
        </HStack>

        <HStack spacing={4} justify="space-between">
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            flex="1"
          >
            +{match.odds.spread.value} ({match.odds.spread.odds})
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            flex="1"
          >
            {match.odds.moneyLine.value}
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            flex="1"
          >
            O/U {match.odds.total.value} ({match.odds.total.odds})
          </Button>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <Box bg="gray.900" borderRadius="xl" p={6}>
      <Tabs variant="soft-rounded" colorScheme="blue" mb={6}>
        <TabList>
          <Tab><Icon as={FaBasketball} mr={2} />Basketball</Tab>
          <Tab><Icon as={FaFutbol} mr={2} />Soccer</Tab>
          <Tab><Icon as={FaHockeyPuck} mr={2} />Hockey</Tab>
          <Tab><Icon as={FaBaseballBall} mr={2} />Baseball</Tab>
          <Tab><Icon as={FaVolleyballBall} mr={2} />Volleyball</Tab>
        </TabList>
      </Tabs>

      <VStack spacing={4} align="stretch">
        {sportsData[selectedSport].map((league) => (
          <Box key={league.league}>
            <Text color="gray.400" fontSize="lg" fontWeight="semibold" mb={3}>
              {league.league}
            </Text>
            <VStack spacing={4} align="stretch">
              {league.matches.map(renderMatch)}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
