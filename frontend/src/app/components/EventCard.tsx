'use client';

import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import Comments from './Comments';

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

interface EventCardProps {
  event: Match;
  contractAddress: `0x${string}`;
  contractABI: any;
}

export default function EventCard({ event, contractAddress, contractABI }: EventCardProps) {
  const [betAmount, setBetAmount] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<'home' | 'draw' | 'away' | null>(null);

  const { write: placeBet } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'placeBet',
  });

  const handleBet = () => {
    if (!betAmount || !selectedOutcome) return;
    
    try {
      const amount = parseEther(betAmount);
      placeBet({
        args: [event.id, selectedOutcome],
        value: amount,
      });
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-blue-400">{event.league}</div>
        <div className="text-sm text-gray-400">{event.date} - {event.time}</div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-white">{event.homeTeam}</div>
        <div className="text-sm text-gray-400">vs</div>
        <div className="text-lg font-semibold text-white">{event.awayTeam}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <button 
          onClick={() => setSelectedOutcome('home')}
          className={`px-4 py-3 rounded-lg text-white transition-all ${
            selectedOutcome === 'home' 
              ? 'bg-blue-600' 
              : 'bg-blue-900/50 hover:bg-blue-900/70'
          }`}
        >
          <div className="text-sm mb-1">Home</div>
          <div className="text-lg font-semibold">{event.odds.home}x</div>
        </button>
        <button 
          onClick={() => setSelectedOutcome('draw')}
          className={`px-4 py-3 rounded-lg text-white transition-all ${
            selectedOutcome === 'draw' 
              ? 'bg-yellow-600' 
              : 'bg-yellow-900/50 hover:bg-yellow-900/70'
          }`}
        >
          <div className="text-sm mb-1">Draw</div>
          <div className="text-lg font-semibold">{event.odds.draw}x</div>
        </button>
        <button 
          onClick={() => setSelectedOutcome('away')}
          className={`px-4 py-3 rounded-lg text-white transition-all ${
            selectedOutcome === 'away' 
              ? 'bg-blue-600' 
              : 'bg-blue-900/50 hover:bg-blue-900/70'
          }`}
        >
          <div className="text-sm mb-1">Away</div>
          <div className="text-lg font-semibold">{event.odds.away}x</div>
        </button>
      </div>

      {selectedOutcome && (
        <div className="flex gap-4 mb-6">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Enter bet amount"
            className="flex-1 px-4 py-2 bg-black/30 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
            min="0"
            step="0.01"
          />
          <button
            onClick={handleBet}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
          >
            Place Bet
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-400 hover:text-blue-500 transition-colors"
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <Comments
            contractAddress={contractAddress}
            contractABI={contractABI}
            targetId={event.id}
            isEventComment={true}
          />
        </div>
      )}
    </div>
  );
}
