'use client';

import React from 'react';
import {
  Box,
  Flex,
  Button,
  Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
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

interface SportsCategoriesProps {
  selectedSport: string;
  onSelectSport: (sport: string) => void;
}

export default function SportsCategories({ selectedSport, onSelectSport }: SportsCategoriesProps) {
  const sports = [
    { id: 'basketball', name: 'Basketball', icon: FaBasketballBall },
    { id: 'soccer', name: 'Soccer', icon: FaFutbol },
    { id: 'tennis', name: 'Tennis', icon: FaTableTennis },
    { id: 'hockey', name: 'Hockey', icon: FaHockeyPuck },
    { id: 'baseball', name: 'Baseball', icon: FaBaseballBall },
    { id: 'mma', name: 'MMA', icon: GiBoxingGlove },
    { id: 'esports', name: 'Esports', icon: FaGamepad },
    { id: 'rugby', name: 'Rugby', icon: FaFootballBall },
  ];

  const bgColor = useColorModeValue('gray.100', 'navy.700');
  const selectedBgColor = useColorModeValue('blue.100', 'blue.800');
  const selectedTextColor = useColorModeValue('blue.700', 'white');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Box mb={6}>
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        Sports
      </Text>
      <SimpleGrid columns={{ base: 2, sm: 4, md: 8 }} spacing={3}>
        {sports.map((sport) => (
          <Button
            key={sport.id}
            onClick={() => onSelectSport(sport.id)}
            variant="outline"
            height="auto"
            py={3}
            px={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg={selectedSport === sport.id ? selectedBgColor : bgColor}
            color={selectedSport === sport.id ? selectedTextColor : textColor}
            borderColor={selectedSport === sport.id ? 'blue.500' : 'transparent'}
            _hover={{
              bg: selectedBgColor,
              color: selectedTextColor,
            }}
            borderRadius="lg"
          >
            <Icon as={sport.icon} boxSize={6} mb={2} />
            <Text fontSize="sm" fontWeight="medium">
              {sport.name}
            </Text>
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
}
