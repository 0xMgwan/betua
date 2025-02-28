import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { parseUnits } from 'ethers/lib/utils';
import Comments from './Comments';

interface EventCardProps {
  event: {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    settled: boolean;
  };
  contractAddress: `0x${string}`;
  contractABI: any;
}

export default function EventCard({ event, contractAddress, contractABI }: EventCardProps) {
  const [betAmount, setBetAmount] = useState('');
  const [showComments, setShowComments] = useState(false);

  const { write: placeBet } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'placeBet',
  });

  const handlePlaceBet = () => {
    if (!betAmount) return;
    placeBet({
      args: [event.id, parseUnits(betAmount, 6)],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6">
        {/* Event Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {event.settled ? 'Settled' : 'Active'}
          </span>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-600">
            Starts: {new Date(event.startTime * 1000).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Ends: {new Date(event.endTime * 1000).toLocaleString()}
          </p>
        </div>

        {/* Betting Interface */}
        {!event.settled && (
          <div className="space-y-3">
            <div className="relative">
              <input
                type="number"
                placeholder="Bet amount (USDC)"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
              <span className="absolute right-3 top-2 text-gray-500">USDC</span>
            </div>
            <button
              onClick={handlePlaceBet}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Place Bet
            </button>
          </div>
        )}

        {/* Comments Toggle */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg
              className={`w-5 h-5 mr-2 transition-transform ${showComments ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Discussion ({event.id})
          </button>

          {/* Comments Section */}
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
      </div>
    </div>
  );
}
