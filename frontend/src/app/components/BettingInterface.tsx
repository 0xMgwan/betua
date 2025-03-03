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
import { FaBasketballBall, FaFutbol, FaHockeyPuck, FaBaseballBall, FaVolleyballBall } from 'react-icons/fa';

interface Match {
  id: string;
  teamA: string;
  teamB: string;
  time: string;
  isLive: boolean;
  odds: {
    spread: { value: number; odds: number };
    moneyLine: { value: number };
    total: { value: number; odds: number };
  };
}

interface League {
  league: string;
  matches: Match[];
}

interface SportsData {
  basketball: League[];
  soccer: League[];
  hockey: League[];
  baseball: League[];
  volleyball: League[];
}

const sportsData: SportsData = {
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
            spread: { value: -6.0, odds: -110 },
            moneyLine: { value: -240 },
            total: { value: 225.5, odds: -110 },
          },
        },
      ],
    },
  ],
  soccer: [
    {
      league: 'Premier League',
      matches: [],
    },
  ],
  hockey: [
    {
      league: 'NHL',
      matches: [],
    },
  ],
  baseball: [
    {
      league: 'MLB',
      matches: [],
    },
  ],
  volleyball: [
    {
      league: 'International',
      matches: [],
    },
  ],
};

type SportType = keyof SportsData;

export default function BettingInterface() {
  const [selectedSport, setSelectedSport] = useState<SportType>('basketball');

  return (
    <Box bg="gray.900" borderRadius="xl" p={6}>
      <Tabs variant="soft-rounded" colorScheme="blue" mb={6} onChange={(index) => {
        const sports: SportType[] = ['basketball', 'soccer', 'hockey', 'baseball', 'volleyball'];
        setSelectedSport(sports[index]);
      }}>
        <TabList>
          <Tab><Icon as={FaBasketballBall} mr={2} />Basketball</Tab>
          <Tab><Icon as={FaFutbol} mr={2} />Soccer</Tab>
          <Tab><Icon as={FaHockeyPuck} mr={2} />Hockey</Tab>
          <Tab><Icon as={FaBaseballBall} mr={2} />Baseball</Tab>
          <Tab><Icon as={FaVolleyballBall} mr={2} />Volleyball</Tab>
        </TabList>

        <TabPanels>
          {['basketball', 'soccer', 'hockey', 'baseball', 'volleyball'].map((sport) => (
            <TabPanel key={sport}>
              <VStack spacing={4} align="stretch">
                {sportsData[sport as SportType].map((league) => (
                  <Box key={league.league}>
                    <Text color="gray.400" fontSize="lg" fontWeight="semibold" mb={3}>
                      {league.league}
                    </Text>
                    <VStack spacing={3} align="stretch">
                      {league.matches.map((match) => (
                        <Box
                          key={match.id}
                          bg="gray.800"
                          p={4}
                          borderRadius="lg"
                          _hover={{ bg: 'gray.700' }}
                        >
                          <HStack justify="space-between" mb={2}>
                            <Text>{match.teamA} vs {match.teamB}</Text>
                            <HStack>
                              {match.isLive && (
                                <Badge colorScheme="red">LIVE</Badge>
                              )}
                              <Text color="gray.400">{match.time}</Text>
                            </HStack>
                          </HStack>
                          <HStack spacing={4}>
                            <Button size="sm" variant="outline">
                              Spread {match.odds.spread.value} ({match.odds.spread.odds})
                            </Button>
                            <Button size="sm" variant="outline">
                              ML {match.odds.moneyLine.value}
                            </Button>
                            <Button size="sm" variant="outline">
                              O/U {match.odds.total.value} ({match.odds.total.odds})
                            </Button>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
