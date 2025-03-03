'use client';

import { VStack, Box, Text, Link, Icon, HStack } from '@chakra-ui/react';
import { FaBasketball, FaFutbol, FaHockeyPuck, FaBaseballBall, FaTrophy, FaChartLine } from 'react-icons/fa';

export function Sidebar() {
  const quickLinks = [
    { name: 'Popular', icon: FaTrophy },
    { name: 'Upcoming', icon: FaChartLine },
    { name: 'Tournaments', icon: FaTrophy },
    { name: 'Analysis', icon: FaChartLine },
  ];

  const popularSports = [
    { name: 'Basketball', icon: FaBasketball },
    { name: 'Soccer', icon: FaFutbol },
    { name: 'Hockey', icon: FaHockeyPuck },
    { name: 'Baseball', icon: FaBaseballBall },
  ];

  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Text fontWeight="bold" mb={4}>QUICK LINKS</Text>
        <VStack align="stretch" spacing={2}>
          {quickLinks.map((link) => (
            <Link key={link.name} href="#" _hover={{ color: 'blue.400' }}>
              <HStack spacing={3}>
                <Icon as={link.icon} />
                <Text>{link.name}</Text>
              </HStack>
            </Link>
          ))}
        </VStack>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={4}>POPULAR SPORTS</Text>
        <VStack align="stretch" spacing={2}>
          {popularSports.map((sport) => (
            <Link key={sport.name} href="#" _hover={{ color: 'blue.400' }}>
              <HStack spacing={3}>
                <Icon as={sport.icon} />
                <Text>{sport.name}</Text>
              </HStack>
            </Link>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}
