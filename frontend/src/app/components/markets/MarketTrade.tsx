'use client';

import React, { useState, useEffect } from 'react';
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseUnits, type Abi } from 'viem';
import { useToast } from '@chakra-ui/react';
import P2PMarketV2ABI from '@/contracts/abis/P2PMarketV2.json';

interface Market {
  creator: string;
  question: string;
  description: string;
  startTime: number;
  endTime: number;
  totalLiquidity: bigint;
  settled: boolean;
  outcome: number;
  marketType: MarketType;
  options: number[];
}

interface Position {
  amount: bigint;
  option: number;
  entryPrice: bigint;
  settled: boolean;
}

interface MarketTradeProps {
  marketId: number;
}

enum MarketType {
  BINARY = 'BINARY',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  NUMERIC_RANGE = 'NUMERIC_RANGE',
  ORACLE_FEED = 'ORACLE_FEED'
}

const contractAbi = P2PMarketV2ABI.abi as Abi;

export default function MarketTrade({ marketId }: MarketTradeProps) {
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);
  const [estimatedPayout, setEstimatedPayout] = useState('0');

  const { data: market } = useContractRead({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getMarketInfo',
    args: [marketId],
  });

  const { data: userPosition } = useContractRead({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getUserPosition',
    args: [marketId],
  });

  const { data: entryPrice } = useContractRead({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'calculateEntryPrice',
    args: [marketId, selectedOption, amount ? parseUnits(amount, 6) : 0n],
  });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'takePosition',
    args: [marketId, selectedOption, amount ? parseUnits(amount, 6) : 0n],
  });

  const { write: takePosition, isLoading, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (entryPrice && amount) {
      const estimatedReturn = calculateEstimatedPayout(
        parseUnits(amount, 6),
        entryPrice
      );
      setEstimatedPayout(formatUnits(estimatedReturn, 6));
    }
  }, [entryPrice, amount]);

  const calculateEstimatedPayout = (amount: bigint, price: bigint): bigint => {
    // Simple calculation: if you win, you get your amount plus proportional share of the losing pool
    // This is a simplified version and should be adjusted based on your actual payout mechanism
    return amount * 2n;
  };

  const handleTrade = async () => {
    if (!takePosition) {
      toast({
        title: 'Error',
        description: 'Please check your inputs and try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    takePosition();
  };

  if (!market) {
    return <div>Loading...</div>;
  }

  const marketData = market as Market;
  const position = userPosition as Position;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{marketData.question}</h2>
      
      <div className="mb-6">
        <p className="text-gray-600">{marketData.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Market Info</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Liquidity:</span>
            <span className="ml-2 font-medium">
              {formatUnits(marketData.totalLiquidity, 6)} USDC
            </span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className={`ml-2 font-medium ${
              marketData.settled ? 'text-red-600' : 'text-green-600'
            }`}>
              {marketData.settled ? 'Settled' : 'Active'}
            </span>
          </div>
        </div>
      </div>

      {position && position.amount > 0n && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Your Position</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Amount:</span>
              <span className="ml-2 font-medium">
                {formatUnits(position.amount, 6)} USDC
              </span>
            </div>
            <div>
              <span className="text-gray-600">Option:</span>
              <span className="ml-2 font-medium">
                {position.option}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Entry Price:</span>
              <span className="ml-2 font-medium">
                {formatUnits(position.entryPrice, 18)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className={`ml-2 font-medium ${
                position.settled ? 'text-green-600' : 'text-blue-600'
              }`}>
                {position.settled ? 'Settled' : 'Active'}
              </span>
            </div>
          </div>
        </div>
      )}

      {!marketData.settled && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Option
            </label>
            {marketData.marketType === MarketType.BINARY ? (
              <div className="mt-2 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedOption(0)}
                  className={`py-2 px-4 rounded-md ${
                    selectedOption === 0
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setSelectedOption(1)}
                  className={`py-2 px-4 rounded-md ${
                    selectedOption === 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  No
                </button>
              </div>
            ) : (
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {marketData.options.map((option, index) => (
                  <option key={index} value={index}>
                    Option {option}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount (USDC)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="1"
              step="1"
            />
          </div>

          {entryPrice && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Entry Price:</span>
                  <span className="font-medium">
                    {formatUnits(entryPrice, 18)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Payout:</span>
                  <span className="font-medium">
                    {estimatedPayout} USDC
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleTrade}
            disabled={!takePosition || isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              (!takePosition || isLoading) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Processing...' : 'Take Position'}
          </button>
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
          Position taken successfully!
        </div>
      )}
    </div>
  );
}
