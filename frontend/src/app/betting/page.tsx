'use client';

import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import EventCard from '../components/EventCard';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
}

export default function Betting() {
  const matches: Match[] = [
    {
      id: 1,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      date: '2025-03-04',
      homeOdds: 2.1,
      drawOdds: 3.4,
      awayOdds: 2.8
    },
    // Add more matches as needed
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" mb={6}>Premier League Matches</Heading>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {matches.map((match) => (
          <EventCard
            key={match.id}
            match={match}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
