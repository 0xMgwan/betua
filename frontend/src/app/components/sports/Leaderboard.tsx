'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Badge,
  Avatar,
  HStack,
  VStack,
  Icon,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { FaTrophy, FaFire, FaChartLine, FaEthereum, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { GiPodium, GiCrownCoin, GiLaurelCrown } from 'react-icons/gi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  address: string;
  avatar: string;
  earnings: number;
  winRate: number;
  streak: number;
  change: 'up' | 'down' | 'none';
  badges: string[];
}

// Mock data for the leaderboard
const leaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'CryptoKing',
    address: '0x1a2b...3c4d',
    avatar: 'https://bit.ly/dan-abramov',
    earnings: 15.75,
    winRate: 68,
    streak: 7,
    change: 'none',
    badges: ['🏆', '🔥'],
  },
  {
    id: '2',
    rank: 2,
    name: 'BetMaster',
    address: '0x5e6f...7g8h',
    avatar: 'https://bit.ly/kent-c-dodds',
    earnings: 12.32,
    winRate: 62,
    streak: 4,
    change: 'up',
    badges: ['🚀'],
  },
  {
    id: '3',
    rank: 3,
    name: 'LuckyCharm',
    address: '0x9i0j...1k2l',
    avatar: 'https://bit.ly/ryan-florence',
    earnings: 9.87,
    winRate: 59,
    streak: 3,
    change: 'down',
    badges: ['🍀'],
  },
  {
    id: '4',
    rank: 4,
    name: 'PredictionPro',
    address: '0x3m4n...5o6p',
    avatar: 'https://bit.ly/prosper-baba',
    earnings: 8.45,
    winRate: 55,
    streak: 2,
    change: 'up',
    badges: ['📈'],
  },
  {
    id: '5',
    rank: 5,
    name: 'BlockchainBaller',
    address: '0x7q8r...9s0t',
    avatar: 'https://bit.ly/code-beast',
    earnings: 7.23,
    winRate: 52,
    streak: 0,
    change: 'down',
    badges: ['💎'],
  },
  {
    id: '6',
    rank: 6,
    name: 'SportsSage',
    address: '0x1u2v...3w4x',
    avatar: 'https://bit.ly/sage-adebayo',
    earnings: 6.18,
    winRate: 49,
    streak: 1,
    change: 'up',
    badges: ['🧠'],
  },
  {
    id: '7',
    rank: 7,
    name: 'CryptoChampion',
    address: '0x5y6z...7a8b',
    avatar: 'https://bit.ly/chakra-jonathan',
    earnings: 5.74,
    winRate: 47,
    streak: 0,
    change: 'none',
    badges: ['👑'],
  },
];

const weeklyLeaderboardData = [...leaderboardData].sort((a, b) => b.streak - a.streak);
const monthlyLeaderboardData = [...leaderboardData].sort((a, b) => b.winRate - a.winRate);

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(leaderboardData);
  
  const bgColor = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const highlightColor = useColorModeValue('blue.50', 'blue.900');
  
  useEffect(() => {
    // In a real app, this would fetch data from an API or blockchain
    if (timeframe === 0) {
      setLeaderboard(leaderboardData);
    } else if (timeframe === 1) {
      setLeaderboard(weeklyLeaderboardData);
    } else {
      setLeaderboard(monthlyLeaderboardData);
    }
  }, [timeframe]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Icon as={GiLaurelCrown} color="gold" boxSize={6} />;
      case 2:
        return <Icon as={GiCrownCoin} color="silver" boxSize={6} />;
      case 3:
        return <Icon as={GiPodium} color="orange.400" boxSize={6} />;
      default:
        return <Text fontWeight="bold" fontSize="lg">{rank}</Text>;
    }
  };

  const getChangeIcon = (change: 'up' | 'down' | 'none') => {
    switch (change) {
      case 'up':
        return <Icon as={FaArrowUp} color="green.400" boxSize={3} />;
      case 'down':
        return <Icon as={FaArrowDown} color="red.400" boxSize={3} />;
      default:
        return null;
    }
  };

  return (
    <Box 
      as="section" 
      py={8} 
      px={4}
      borderRadius="xl"
      bg={bgColor}
      boxShadow="xl"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
    >
      <Flex justify="space-between" align="center" mb={6}>
        <HStack>
          <Icon as={FaTrophy} boxSize={6} color="yellow.400" />
          <Heading size="lg">Leaderboard 🏆</Heading>
        </HStack>
        
        <Tabs 
          variant="soft-rounded" 
          colorScheme="blue" 
          size="sm" 
          onChange={(index) => setTimeframe(index)}
        >
          <TabList>
            <Tab>All Time</Tab>
            <Tab>Weekly 🔥</Tab>
            <Tab>Monthly 📈</Tab>
          </TabList>
        </Tabs>
      </Flex>

      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Bettor</Th>
              <Th isNumeric>Earnings</Th>
              <Th isNumeric>Win Rate</Th>
              <Th isNumeric>Streak</Th>
              <Th>Achievements</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard.map((entry, index) => (
              <MotionBox
                as={Tr}
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                _hover={{ bg: highlightColor }}
                bg={entry.rank <= 3 ? highlightColor : undefined}
              >
                <Td>
                  <HStack spacing={2}>
                    {getRankIcon(entry.rank)}
                    {getChangeIcon(entry.change)}
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={entry.name} src={entry.avatar} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{entry.name}</Text>
                      <Text fontSize="xs" color="gray.500">{entry.address}</Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td isNumeric>
                  <HStack justify="flex-end">
                    <Icon as={FaEthereum} color="purple.400" />
                    <Text fontWeight="bold">{entry.earnings.toFixed(2)}</Text>
                  </HStack>
                </Td>
                <Td isNumeric>
                  <Text fontWeight="semibold">{entry.winRate}%</Text>
                </Td>
                <Td isNumeric>
                  <HStack justify="flex-end">
                    <Text>{entry.streak}</Text>
                    {entry.streak >= 3 && <Icon as={FaFire} color="orange.500" />}
                  </HStack>
                </Td>
                <Td>
                  <Flex>
                    {entry.badges.map((badge, i) => (
                      <Text key={i} fontSize="xl" mx={1}>{badge}</Text>
                    ))}
                  </Flex>
                </Td>
              </MotionBox>
            ))}
          </Tbody>
        </Table>
      </Box>
      
      <Flex justify="center" mt={6}>
        <Button 
          leftIcon={<Icon as={FaChartLine} />} 
          colorScheme="blue" 
          variant="outline"
          size="sm"
        >
          View Full Leaderboard
        </Button>
      </Flex>
    </Box>
  );
}
