import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import SportsBettingABI from '@/contracts/abis/SportsBetting.json';
import { Tab } from '@headlessui/react';
import { formatUnits } from 'viem';

enum MarketType {
  MATCH_WINNER,
  OVER_UNDER,
  HANDICAP,
  CORRECT_SCORE,
  PLAYER_PROPS,
  FUTURES
}

enum MatchStatus {
  SCHEDULED,
  LIVE,
  FINISHED,
  CANCELLED,
  POSTPONED
}

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  startTime: number;
  status: MatchStatus;
  markets: Market[];
}

interface Market {
  id: number;
  type: MarketType;
  outcomes: number[];
  odds: { [key: number]: number };
}

const categories = [
  { id: 'popular', name: 'Popular' },
  { id: 'live', name: 'Live' },
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'tournaments', name: 'Tournaments' }
];

const sports = [
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'soccer', name: 'Soccer', icon: '⚽' },
  { id: 'tennis', name: 'Tennis', icon: '🎾' },
  { id: 'hockey', name: 'Hockey', icon: '🏒' },
  { id: 'baseball', name: 'Baseball', icon: '⚾' },
  { id: 'mma', name: 'MMA', icon: '🥊' },
  { id: 'esports', name: 'Esports', icon: '🎮' },
  { id: 'rugby', name: 'Rugby', icon: '🏉' }
];

export default function SportsList() {
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [selectedSport, setSelectedSport] = useState('all');
  const [matches, setMatches] = useState<Match[]>([]);

  const { data: nextMatchId } = useContractRead({
    address: process.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS as `0x${string}`,
    abi: SportsBettingABI,
    functionName: 'nextMatchId'
  });

  useEffect(() => {
    // Fetch matches based on selected filters
    // This would be replaced with actual contract calls
    const fetchMatches = async () => {
      // Simulated data for now
      const mockMatches: Match[] = [
        {
          id: 1,
          homeTeam: "Sacramento Kings",
          awayTeam: "Houston Rockets",
          startTime: Date.now() + 86400000, // Tomorrow
          status: MatchStatus.SCHEDULED,
          markets: [
            {
              id: 1,
              type: MarketType.MATCH_WINNER,
              outcomes: [1, 2],
              odds: { 1: 1750, 2: 2050 } // In basis points (17.5 and 20.5)
            }
          ]
        },
        // Add more mock matches
      ];
      setMatches(mockMatches);
    };

    fetchMatches();
  }, [selectedCategory, selectedSport]);

  const formatOdds = (odds: number) => {
    return (odds / 100).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Categories */}
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category.id}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                }`
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>

      {/* Sports Sidebar */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-2">
          <nav className="space-y-1">
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  selectedSport === sport.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{sport.icon}</span>
                {sport.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Matches Grid */}
        <div className="col-span-10">
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">
                      {new Date(match.startTime).toLocaleString()}
                    </div>
                    <div className="mt-1 text-lg font-medium">
                      {match.homeTeam} vs {match.awayTeam}
                    </div>
                  </div>

                  {/* Markets */}
                  <div className="flex space-x-4">
                    {match.markets.map((market) => (
                      <div key={market.id} className="flex space-x-2">
                        {market.outcomes.map((outcome) => (
                          <button
                            key={outcome}
                            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            <div className="text-sm font-medium">
                              {outcome === 1 ? match.homeTeam : match.awayTeam}
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              {formatOdds(market.odds[outcome])}
                            </div>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
