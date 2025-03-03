import React, { useState, useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseUnits, type Abi } from 'viem';
import { useToast } from '@chakra-ui/react';
import SportsBettingABI from '@/contracts/abis/SportsBetting.json';

interface Bet {
  matchId: number;
  marketId: number;
  outcome: number;
  odds: number;
  homeTeam: string;
  awayTeam: string;
  marketType: string;
  stake?: string;
}

interface BetSlipProps {
  bets: Bet[];
  onRemoveBet: (marketId: number) => void;
  onClearSlip: () => void;
}

const contractAbi = SportsBettingABI.abi as Abi;

export default function BetSlip({ bets, onRemoveBet, onClearSlip }: BetSlipProps) {
  const toast = useToast();
  const [stakes, setStakes] = useState<{ [key: number]: string }>({});
  const [totalStake, setTotalStake] = useState('0');
  const [potentialPayout, setPotentialPayout] = useState('0');

  useEffect(() => {
    calculateTotals();
  }, [stakes, bets]);

  const calculateTotals = () => {
    let total = 0;
    let payout = 1;

    bets.forEach((bet) => {
      const stake = parseFloat(stakes[bet.marketId] || '0');
      if (stake > 0) {
        total += stake;
        payout *= (stake * bet.odds);
      }
    });

    setTotalStake(total.toFixed(2));
    setPotentialPayout(payout.toFixed(2));
  };

  const handleStakeChange = (marketId: number, value: string) => {
    setStakes((prev) => ({
      ...prev,
      [marketId]: value,
    }));
  };

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'placeBet',
    args: [bets[0]?.marketId, bets[0]?.outcome, parseUnits(stakes[bets[0]?.marketId] || '0', 6)],
    enabled: bets.length > 0 && !!stakes[bets[0]?.marketId],
  });

  const { write: placeBet, isLoading, isSuccess } = useContractWrite(config);

  const handlePlaceBet = async () => {
    if (!placeBet) {
      toast({
        title: 'Error',
        description: 'Please check your inputs and try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    placeBet();
  };

  if (bets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-center text-gray-500 py-8">
          Your bet slip is empty
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Bet Slip</h3>
          <button
            onClick={onClearSlip}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="divide-y">
        {bets.map((bet) => (
          <div key={bet.marketId} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm font-medium">
                  {bet.homeTeam} vs {bet.awayTeam}
                </div>
                <div className="text-xs text-gray-500">
                  {bet.marketType} - {bet.outcome === 1 ? bet.homeTeam : bet.awayTeam}
                </div>
              </div>
              <button
                onClick={() => onRemoveBet(bet.marketId)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-sm font-medium text-blue-600">
                {bet.odds.toFixed(2)}
              </div>
              <input
                type="number"
                value={stakes[bet.marketId] || ''}
                onChange={(e) => handleStakeChange(bet.marketId, e.target.value)}
                placeholder="Stake"
                className="w-24 px-2 py-1 text-right border rounded"
                min="1"
                step="1"
              />
            </div>

            {stakes[bet.marketId] && (
              <div className="text-sm text-gray-500 text-right mt-1">
                Potential win: {((parseFloat(stakes[bet.marketId]) * bet.odds) || 0).toFixed(2)} USDC
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Stake:</span>
            <span className="font-medium">{totalStake} USDC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Potential Payout:</span>
            <span className="font-medium">{potentialPayout} USDC</span>
          </div>
        </div>

        <button
          onClick={handlePlaceBet}
          disabled={!placeBet || isLoading || totalStake === '0'}
          className={`w-full mt-4 py-2 px-4 rounded-md text-white font-medium
            ${(!placeBet || isLoading || totalStake === '0')
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isLoading ? 'Placing Bet...' : 'Place Bet'}
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-green-50 text-green-800">
          Bet placed successfully!
        </div>
      )}
    </div>
  );
}
