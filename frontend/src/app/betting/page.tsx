'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Logo from '../components/Logo';
import { WalletButton } from '../components/WalletButton';

export default function BettingPage() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = [
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
            <div
              key={match.id}
              className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all cursor-pointer"
              onClick={() => setSelectedMatch(match)}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-blue-400">{match.league}</div>
                <div className="text-sm text-gray-400">{match.date} - {match.time}</div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="text-lg font-semibold text-white">{match.homeTeam}</div>
                <div className="text-sm text-gray-400">vs</div>
                <div className="text-lg font-semibold text-white">{match.awayTeam}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white hover:from-blue-500 hover:to-blue-600 transition-all">
                  <div className="text-sm mb-1">Home</div>
                  <div className="text-lg font-semibold">{match.odds.home}</div>
                </button>
                <button className="px-4 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg text-white hover:from-yellow-500 hover:to-yellow-600 transition-all">
                  <div className="text-sm mb-1">Draw</div>
                  <div className="text-lg font-semibold">{match.odds.draw}</div>
                </button>
                <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white hover:from-blue-500 hover:to-blue-600 transition-all">
                  <div className="text-sm mb-1">Away</div>
                  <div className="text-lg font-semibold">{match.odds.away}</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
