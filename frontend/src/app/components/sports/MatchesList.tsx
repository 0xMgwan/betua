'use client';

import React from 'react';
import {
  Box,
  Tabs,
  TabList,
  Tab,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Flex,
  Icon,
} from '@chakra-ui/react';
import {
  FaBasketballBall,
  FaFutbol,
  FaHockeyPuck,
  FaBaseballBall,
  FaGamepad,
  FaFootballBall,
  FaTableTennis,
} from 'react-icons/fa';
import { GiBoxingGlove } from 'react-icons/gi';

const categories = [
  { name: 'Popular', icon: null },
  { name: 'Live', icon: null },
  { name: 'Upcoming', icon: null },
  { name: 'Tournaments', icon: null },
];

const sports = [
  { name: 'Basketball', icon: FaBasketballBall, matches: [
    { id: 1, team1: 'Lakers', team2: 'Celtics', time: '3/4/2025, 12:29:08 PM', odds1: 17.50, odds2: 20.50 }
  ]},
  { name: 'Soccer', icon: FaFutbol, matches: [
    { id: 2, team1: 'Manchester United', team2: 'Liverpool', time: '3/4/2025, 2:00:00 PM', odds1: 2.10, odds2: 3.40 }
  ]},
  { name: 'Tennis', icon: FaTableTennis, matches: [
    { id: 3, team1: 'Djokovic', team2: 'Nadal', time: '3/4/2025, 4:30:00 PM', odds1: 1.90, odds2: 2.10 }
  ]},
  { name: 'Hockey', icon: FaHockeyPuck, matches: [
    { id: 4, team1: 'Bruins', team2: 'Rangers', time: '3/4/2025, 7:00:00 PM', odds1: 2.25, odds2: 1.85 }
  ]},
  { name: 'Baseball', icon: FaBaseballBall, matches: [
    { id: 5, team1: 'Yankees', team2: 'Red Sox', time: '3/4/2025, 6:00:00 PM', odds1: 1.95, odds2: 2.05 }
  ]},
  { name: 'MMA', icon: GiBoxingGlove, matches: [
    { id: 6, team1: 'Fighter A', team2: 'Fighter B', time: '3/4/2025, 10:00:00 PM', odds1: 2.50, odds2: 1.75 }
  ]},
  { name: 'Esports', icon: FaGamepad, matches: [
    { id: 7, team1: 'Team Liquid', team2: 'Cloud9', time: '3/4/2025, 3:00:00 PM', odds1: 1.85, odds2: 2.15 }
  ]},
  { name: 'Rugby', icon: FaFootballBall, matches: [
    { id: 8, team1: 'All Blacks', team2: 'Springboks', time: '3/4/2025, 5:00:00 PM', odds1: 1.75, odds2: 2.25 }
  ]},
];

export default function MatchesList() {
  const [selectedCategory, setSelectedCategory] = React.useState(0);

  return (
    <Box p={4}>
      <Tabs variant="soft-rounded" colorScheme="blue" mb={6}>
        <TabList>
          {categories.map((category, index) => (
            <Tab
              key={category.name}
              onClick={() => setSelectedCategory(index)}
              _selected={{ bg: 'blue.500', color: 'white' }}
              mx={1}
            >
              {category.name}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <VStack spacing={4} align="stretch">
        {sports.map((sport) => (
          <Box key={sport.name}>
            <HStack mb={4}>
              <Icon as={sport.icon} boxSize={5} />
              <Text fontWeight="bold">{sport.name}</Text>
            </HStack>
            
            {sport.matches.map((match) => (
              <Box
                key={match.id}
                bg="navy.800"
                p={4}
                borderRadius="lg"
                mb={4}
              >
                <Flex justify="space-between" align="center">
                  <VStack align="start" flex={1}>
                    <Text color="gray.300" fontSize="sm">{match.time}</Text>
                    <HStack spacing={4}>
                      <Text fontWeight="semibold">{match.team1}</Text>
                      <Text color="gray.400">vs</Text>
                      <Text fontWeight="semibold">{match.team2}</Text>
                    </HStack>
                  </VStack>
                  
                  <HStack spacing={4}>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => {}}
                    >
                      {match.odds1}
                    </Button>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      onClick={() => {}}
                    >
                      {match.odds2}
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
