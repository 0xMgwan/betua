'use client';

import { useState } from 'react';
import SportsList from '../components/sports/SportsList';
import BetSlip from '../components/sports/BetSlip';
import Analytics from '../components/sports/Analytics';
import { Tab } from '@headlessui/react';

interface Bet {
  matchId: number;
  marketId: number;
  outcome: number;
  odds: number;
  homeTeam: string;
  awayTeam: string;
  marketType: string;
}

export default function SportsPage() {
  const [selectedBets, setSelectedBets] = useState<Bet[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleAddBet = (bet: Bet) => {
    setSelectedBets((prev) => {
      // Check if bet already exists
      const exists = prev.some((b) => b.marketId === bet.marketId);
      if (exists) {
        return prev.map((b) => 
          b.marketId === bet.marketId ? bet : b
        );
      }
      return [...prev, bet];
    });
  };

  const handleRemoveBet = (marketId: number) => {
    setSelectedBets((prev) => prev.filter((b) => b.marketId !== marketId));
  };

  const handleClearSlip = () => {
    setSelectedBets([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sports Betting</h1>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {showAnalytics ? 'View Markets' : 'View Analytics'}
          </button>
        </div>

        {showAnalytics ? (
          <Analytics />
        ) : (
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-9">
              <SportsList />
            </div>

            {/* Bet Slip */}
            <div className="col-span-3">
              <div className="sticky top-8">
                <BetSlip
                  bets={selectedBets}
                  onRemoveBet={handleRemoveBet}
                  onClearSlip={handleClearSlip}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
