'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Logo from '../components/Logo';
import { WalletButton } from '../components/WalletButton';
import EventCard from '../components/EventCard';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  league: string;
}

// Sample contract ABI - replace with actual ABI
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      }
    ],
    "name": "placeBet",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

// Contract address - replace with actual deployed contract address
const contractAddress = '0x1234567890123456789012345678901234567890' as `0x${string}`;

export default function BettingPage() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const matches: Match[] = [
    {
      id: 1,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      date: '2025-03-01',
      time: '17:30',
      odds: { home: 1.95, draw: 3.4, away: 3.8 },
      league: 'Premier League'
    },
    {
      id: 2,
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester City',
      date: '2025-03-02',
      time: '16:30',
      odds: { home: 2.6, draw: 3.3, away: 2.5 },
      league: 'Premier League'
    },
    {
      id: 3,
      homeTeam: 'Manchester United',
      awayTeam: 'Tottenham',
      date: '2025-03-02',
      time: '15:00',
      odds: { home: 2.2, draw: 3.4, away: 3.1 },
      league: 'Premier League'
    },
    {
      id: 4,
      homeTeam: 'Newcastle',
      awayTeam: 'Aston Villa',
      date: '2025-03-03',
      time: '20:00',
      odds: { home: 1.85, draw: 3.5, away: 4.2 },
      league: 'Premier League'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Premier League Matches</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-black/30 rounded-lg text-gray-400 hover:bg-black/50 transition-all">
              Today
            </button>
            <button className="px-4 py-2 bg-black/30 rounded-lg text-gray-400 hover:bg-black/50 transition-all">
              Tomorrow
            </button>
            <button className="px-4 py-2 bg-black/30 rounded-lg text-gray-400 hover:bg-black/50 transition-all">
              This Week
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matches.map((match) => (
            <EventCard
              key={match.id}
              event={match}
              contractAddress={contractAddress}
              contractABI={contractABI}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
