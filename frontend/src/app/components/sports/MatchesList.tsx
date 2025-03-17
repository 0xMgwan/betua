'use client';

import React, { useState } from 'react';
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
  Heading,
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
import SportsCategories from './SportsCategories';
import CommentsDropdown from './CommentsDropdown';

// Match categories
const categories = [
  { id: 'popular', name: 'Popular', icon: null },
  { id: 'live', name: 'Live', icon: null },
  { id: 'upcoming', name: 'Upcoming', icon: null },
  { id: 'tournaments', name: 'Tournaments', icon: null },
];

// Match status types
enum MatchStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  FINISHED = 'finished',
  POPULAR = 'popular',
  TOURNAMENT = 'tournament'
}

// Match interface
interface Match {
  id: number;
  team1: string;
  team2: string;
  time: string;
  odds1: number;
  odds2: number;
  status: MatchStatus;
  tournament?: string;
  viewers?: number;
  isPopular?: boolean;
}

// Sports data with matches
const sports = [
  { 
    id: 'basketball',
    name: 'Basketball', 
    icon: FaBasketballBall, 
    matches: [
      { id: 101, team1: 'Lakers', team2: 'Celtics', time: '3/17/2025, 12:30:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.LIVE, viewers: 15400, isPopular: true },
      { id: 102, team1: 'Warriors', team2: 'Nets', time: '3/17/2025, 3:00:00 PM', odds1: 1.90, odds2: 1.85, status: MatchStatus.SCHEDULED, isPopular: true },
      { id: 103, team1: 'Bulls', team2: 'Heat', time: '3/17/2025, 7:30:00 PM', odds1: 2.10, odds2: 1.70, status: MatchStatus.SCHEDULED },
      { id: 104, team1: 'Bucks', team2: '76ers', time: '3/18/2025, 6:00:00 PM', odds1: 1.65, odds2: 2.25, status: MatchStatus.SCHEDULED },
      { id: 105, team1: 'Suns', team2: 'Mavericks', time: '3/19/2025, 8:00:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.SCHEDULED },
      { id: 106, team1: 'Raptors', team2: 'Nuggets', time: '3/17/2025, 1:15:00 PM', odds1: 2.35, odds2: 1.55, status: MatchStatus.LIVE },
      { id: 107, team1: 'Clippers', team2: 'Grizzlies', time: '3/20/2025, 7:00:00 PM', odds1: 1.80, odds2: 2.00, status: MatchStatus.SCHEDULED },
      { id: 108, team1: 'Rockets', team2: 'Pelicans', time: '3/21/2025, 5:30:00 PM', odds1: 2.15, odds2: 1.65, status: MatchStatus.SCHEDULED },
      { id: 109, team1: 'Team East', team2: 'Team West', time: '3/25/2025, 8:00:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.TOURNAMENT, tournament: 'NBA All-Star Game' },
      { id: 110, team1: 'Team USA', team2: 'Team World', time: '3/26/2025, 7:00:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.TOURNAMENT, tournament: 'Rising Stars Challenge' }
    ]
  },
  { 
    id: 'soccer',
    name: 'Soccer', 
    icon: FaFutbol, 
    matches: [
      { id: 201, team1: 'Manchester United', team2: 'Liverpool', time: '3/17/2025, 2:45:00 PM', odds1: 2.10, odds2: 1.70, status: MatchStatus.LIVE, viewers: 22500, isPopular: true },
      { id: 202, team1: 'Barcelona', team2: 'Real Madrid', time: '3/18/2025, 3:00:00 PM', odds1: 1.85, odds2: 1.95, status: MatchStatus.SCHEDULED, isPopular: true },
      { id: 203, team1: 'Bayern Munich', team2: 'Borussia Dortmund', time: '3/17/2025, 4:30:00 PM', odds1: 1.60, odds2: 2.30, status: MatchStatus.LIVE, viewers: 18700 },
      { id: 204, team1: 'PSG', team2: 'Manchester City', time: '3/19/2025, 3:45:00 PM', odds1: 2.05, odds2: 1.75, status: MatchStatus.SCHEDULED },
      { id: 205, team1: 'Juventus', team2: 'AC Milan', time: '3/20/2025, 2:45:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.SCHEDULED },
      { id: 206, team1: 'Arsenal', team2: 'Chelsea', time: '3/21/2025, 12:30:00 PM', odds1: 2.10, odds2: 1.70, status: MatchStatus.SCHEDULED },
      { id: 207, team1: 'Atletico Madrid', team2: 'Sevilla', time: '3/22/2025, 3:00:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.SCHEDULED },
      { id: 208, team1: 'Inter Milan', team2: 'Napoli', time: '3/23/2025, 2:45:00 PM', odds1: 1.85, odds2: 1.95, status: MatchStatus.SCHEDULED },
      { id: 209, team1: 'Liverpool', team2: 'Bayern Munich', time: '3/24/2025, 3:00:00 PM', odds1: 2.00, odds2: 1.80, status: MatchStatus.TOURNAMENT, tournament: 'Champions League Quarter-Finals' },
      { id: 210, team1: 'Real Madrid', team2: 'Manchester City', time: '3/25/2025, 3:00:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.TOURNAMENT, tournament: 'Champions League Quarter-Finals' }
    ]
  },
  { 
    id: 'tennis',
    name: 'Tennis', 
    icon: FaTableTennis, 
    matches: [
      { id: 301, team1: 'Djokovic', team2: 'Nadal', time: '3/17/2025, 11:00:00 AM', odds1: 1.90, odds2: 1.90, status: MatchStatus.LIVE, viewers: 12300, isPopular: true },
      { id: 302, team1: 'Alcaraz', team2: 'Medvedev', time: '3/17/2025, 2:30:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.SCHEDULED },
      { id: 303, team1: 'Sinner', team2: 'Zverev', time: '3/18/2025, 10:00:00 AM', odds1: 1.85, odds2: 1.95, status: MatchStatus.SCHEDULED },
      { id: 304, team1: 'Rublev', team2: 'Tsitsipas', time: '3/18/2025, 1:00:00 PM', odds1: 2.10, odds2: 1.70, status: MatchStatus.SCHEDULED },
      { id: 305, team1: 'Fritz', team2: 'Ruud', time: '3/19/2025, 11:30:00 AM', odds1: 1.95, odds2: 1.85, status: MatchStatus.SCHEDULED },
      { id: 306, team1: 'Hurkacz', team2: 'Rune', time: '3/19/2025, 3:00:00 PM', odds1: 1.80, odds2: 2.00, status: MatchStatus.SCHEDULED },
      { id: 307, team1: 'Djokovic', team2: 'Alcaraz', time: '3/25/2025, 2:00:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.TOURNAMENT, tournament: 'Grand Slam Semi-Finals' },
      { id: 308, team1: 'Nadal', team2: 'Sinner', time: '3/25/2025, 5:00:00 PM', odds1: 2.05, odds2: 1.75, status: MatchStatus.TOURNAMENT, tournament: 'Grand Slam Semi-Finals' }
    ]
  },
  { 
    id: 'hockey',
    name: 'Hockey', 
    icon: FaHockeyPuck, 
    matches: [
      { id: 401, team1: 'Bruins', team2: 'Rangers', time: '3/17/2025, 7:00:00 PM', odds1: 1.85, odds2: 1.95, status: MatchStatus.SCHEDULED, isPopular: true },
      { id: 402, team1: 'Maple Leafs', team2: 'Canadiens', time: '3/17/2025, 7:30:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.LIVE, viewers: 9800 },
      { id: 403, team1: 'Oilers', team2: 'Flames', time: '3/18/2025, 9:00:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.SCHEDULED },
      { id: 404, team1: 'Penguins', team2: 'Capitals', time: '3/19/2025, 7:00:00 PM', odds1: 2.00, odds2: 1.80, status: MatchStatus.SCHEDULED },
      { id: 405, team1: 'Lightning', team2: 'Panthers', time: '3/20/2025, 7:30:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.SCHEDULED },
      { id: 406, team1: 'Avalanche', team2: 'Golden Knights', time: '3/21/2025, 10:00:00 PM', odds1: 1.80, odds2: 2.00, status: MatchStatus.SCHEDULED },
      { id: 407, team1: 'Eastern Conference', team2: 'Western Conference', time: '3/27/2025, 8:00:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.TOURNAMENT, tournament: 'NHL All-Star Game' }
    ]
  },
  { 
    id: 'baseball',
    name: 'Baseball', 
    icon: FaBaseballBall, 
    matches: [
      { id: 501, team1: 'Yankees', team2: 'Red Sox', time: '3/17/2025, 1:05:00 PM', odds1: 1.80, odds2: 2.00, status: MatchStatus.LIVE, viewers: 11200, isPopular: true },
      { id: 502, team1: 'Dodgers', team2: 'Giants', time: '3/17/2025, 7:10:00 PM', odds1: 1.70, odds2: 2.10, status: MatchStatus.SCHEDULED },
      { id: 503, team1: 'Cubs', team2: 'Cardinals', time: '3/18/2025, 2:20:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.SCHEDULED },
      { id: 504, team1: 'Braves', team2: 'Mets', time: '3/18/2025, 7:20:00 PM', odds1: 1.85, odds2: 1.95, status: MatchStatus.SCHEDULED },
      { id: 505, team1: 'Astros', team2: 'Rangers', time: '3/19/2025, 8:10:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.SCHEDULED },
      { id: 506, team1: 'Padres', team2: 'Diamondbacks', time: '3/20/2025, 6:40:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.SCHEDULED },
      { id: 507, team1: 'American League', team2: 'National League', time: '3/28/2025, 7:30:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.TOURNAMENT, tournament: 'MLB All-Star Game' }
    ]
  },
  { 
    id: 'mma',
    name: 'MMA', 
    icon: GiBoxingGlove, 
    matches: [
      { id: 601, team1: 'Jones', team2: 'Miocic', time: '3/17/2025, 10:00:00 PM', odds1: 1.65, odds2: 2.25, status: MatchStatus.SCHEDULED, isPopular: true },
      { id: 602, team1: 'Adesanya', team2: 'Pereira', time: '3/17/2025, 11:30:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.LIVE, viewers: 14500, isPopular: true },
      { id: 603, team1: 'Makhachev', team2: 'Volkanovski', time: '3/18/2025, 10:30:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.SCHEDULED },
      { id: 604, team1: 'Edwards', team2: 'Covington', time: '3/19/2025, 10:00:00 PM', odds1: 1.80, odds2: 2.00, status: MatchStatus.SCHEDULED },
      { id: 605, team1: 'O\'Malley', team2: 'Sterling', time: '3/20/2025, 10:30:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.SCHEDULED },
      { id: 606, team1: 'Shevchenko', team2: 'Grasso', time: '3/21/2025, 10:00:00 PM', odds1: 1.70, odds2: 2.10, status: MatchStatus.SCHEDULED },
      { id: 607, team1: 'Jones', team2: 'Aspinall', time: '3/29/2025, 10:00:00 PM', odds1: 1.85, odds2: 1.95, status: MatchStatus.TOURNAMENT, tournament: 'UFC 300: Heavyweight Championship' }
    ]
  },
  { 
    id: 'esports',
    name: 'Esports', 
    icon: FaGamepad, 
    matches: [
      { id: 701, team1: 'Team Liquid', team2: 'Cloud9', time: '3/17/2025, 3:00:00 PM', odds1: 1.85, odds2: 1.95, status: MatchStatus.LIVE, viewers: 8700 },
      { id: 702, team1: 'Fnatic', team2: 'G2 Esports', time: '3/17/2025, 5:00:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.SCHEDULED, isPopular: true },
      { id: 703, team1: 'T1', team2: 'Gen.G', time: '3/18/2025, 6:00:00 AM', odds1: 1.75, odds2: 2.05, status: MatchStatus.SCHEDULED, isPopular: true },
      { id: 704, team1: 'FaZe Clan', team2: 'Natus Vincere', time: '3/18/2025, 2:00:00 PM', odds1: 2.00, odds2: 1.80, status: MatchStatus.SCHEDULED },
      { id: 705, team1: '100 Thieves', team2: 'Evil Geniuses', time: '3/19/2025, 4:00:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.SCHEDULED },
      { id: 706, team1: 'Team Vitality', team2: 'MAD Lions', time: '3/20/2025, 1:00:00 PM', odds1: 1.80, odds2: 2.00, status: MatchStatus.SCHEDULED },
      { id: 707, team1: 'Fnatic', team2: 'T1', time: '3/30/2025, 2:00:00 PM', odds1: 1.90, odds2: 1.90, status: MatchStatus.TOURNAMENT, tournament: 'League of Legends World Championship Finals' },
      { id: 708, team1: 'FaZe Clan', team2: 'Team Liquid', time: '3/31/2025, 3:00:00 PM', odds1: 1.85, odds2: 1.95, status: MatchStatus.TOURNAMENT, tournament: 'CS2 Major Finals' }
    ]
  },
  { 
    id: 'rugby',
    name: 'Rugby', 
    icon: FaFootballBall, 
    matches: [
      { id: 801, team1: 'All Blacks', team2: 'Springboks', time: '3/17/2025, 5:00:00 PM', odds1: 1.75, odds2: 2.05, status: MatchStatus.SCHEDULED },
      { id: 802, team1: 'England', team2: 'Ireland', time: '3/18/2025, 3:30:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.SCHEDULED, isPopular: true },
      { id: 803, team1: 'Wales', team2: 'France', time: '3/19/2025, 4:00:00 PM', odds1: 2.10, odds2: 1.70, status: MatchStatus.SCHEDULED },
      { id: 804, team1: 'Australia', team2: 'Argentina', time: '3/20/2025, 6:30:00 AM', odds1: 1.80, odds2: 2.00, status: MatchStatus.SCHEDULED },
      { id: 805, team1: 'Scotland', team2: 'Italy', time: '3/21/2025, 2:15:00 PM', odds1: 1.60, odds2: 2.30, status: MatchStatus.SCHEDULED },
      { id: 806, team1: 'Fiji', team2: 'Samoa', time: '3/22/2025, 7:00:00 AM', odds1: 1.85, odds2: 1.95, status: MatchStatus.SCHEDULED },
      { id: 807, team1: 'England', team2: 'South Africa', time: '4/1/2025, 3:00:00 PM', odds1: 1.95, odds2: 1.85, status: MatchStatus.TOURNAMENT, tournament: 'Rugby World Cup Semi-Finals' }
    ]
  },
];

export default function MatchesList() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSport, setSelectedSport] = useState('all');

  // Filter matches based on selected category and sport
  const getFilteredSports = () => {
    // If no sport is selected, show all sports
    const filteredBySport = selectedSport === 'all' 
      ? sports 
      : sports.filter(sport => sport.id === selectedSport);

    // Filter matches based on selected category
    return filteredBySport.map(sport => {
      const categoryId = categories[selectedCategory].id;
      let filteredMatches;

      switch (categoryId) {
        case 'live':
          filteredMatches = sport.matches.filter(match => match.status === MatchStatus.LIVE);
          break;
        case 'upcoming':
          filteredMatches = sport.matches.filter(match => match.status === MatchStatus.SCHEDULED);
          break;
        case 'tournaments':
          filteredMatches = sport.matches.filter(match => match.status === MatchStatus.TOURNAMENT);
          break;
        case 'popular':
        default:
          // For popular, show matches that are marked as popular or have high viewer counts
          filteredMatches = sport.matches.filter(match => 
            match.isPopular || 
            (match.viewers && match.viewers > 10000) ||
            match.status === MatchStatus.LIVE
          );
          break;
      }

      return {
        ...sport,
        matches: filteredMatches
      };
    }).filter(sport => sport.matches.length > 0); // Only show sports with matches
  };

  const filteredSports = getFilteredSports();

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>Live Matches</Heading>
      
      {/* Sports Categories */}
      <SportsCategories 
        selectedSport={selectedSport} 
        onSelectSport={setSelectedSport} 
      />
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
        {filteredSports.length > 0 ? (
          filteredSports.map((sport) => (
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
                
                {/* Comments Dropdown */}
                <CommentsDropdown matchId={match.id} />
              </Box>
            ))}
          </Box>
        ))) : (
          <Text>No matches found for the selected filters.</Text>
        )}
      </VStack>
    </Box>
  );
}
