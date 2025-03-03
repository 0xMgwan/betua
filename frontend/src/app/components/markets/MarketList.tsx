'use client';

import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import { type Abi } from 'viem';
import P2PMarketV2ABI from '@/contracts/abis/P2PMarketV2.json';
import Link from 'next/link';

interface Market {
  id: number;
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
  minimumBet: bigint;
  oracle: string;
  isResolved: boolean;
  winningOption: number;
}

enum MarketType {
  BINARY = 'BINARY',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  NUMERIC_RANGE = 'NUMERIC_RANGE',
  ORACLE_FEED = 'ORACLE_FEED'
}

const contractAbi = P2PMarketV2ABI.abi as Abi;

export default function MarketList() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: nextMarketId } = useContractRead({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'nextMarketId',
  });

  const { data: marketInfo, refetch } = useContractRead({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getMarketInfo',
    args: [0], // Will be updated in the loop
  });

  useEffect(() => {
    const fetchMarkets = async () => {
      if (!nextMarketId) return;

      const marketPromises = [];
      for (let i = 1; i < Number(nextMarketId); i++) {
        marketPromises.push(refetch({ args: [i] }));
      }

      const marketResults = await Promise.all(marketPromises);
      const validMarkets = marketResults
        .map((result, index) => ({
          id: index + 1,
          ...result.data,
        }))
        .filter(market => market.creator !== '0x0000000000000000000000000000000000000000');

      setMarkets(validMarkets);
      setLoading(false);
    };

    fetchMarkets();
  }, [nextMarketId]);

  const getMarketTypeString = (type: MarketType) => {
    switch (type) {
      case MarketType.BINARY:
        return 'Yes/No';
      case MarketType.MULTIPLE_CHOICE:
        return 'Multiple Choice';
      case MarketType.NUMERIC_RANGE:
        return 'Numeric Range';
      case MarketType.ORACLE_FEED:
        return 'Oracle Feed';
      default:
        return 'Unknown';
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Prediction Markets</h2>
        <Link
          href="/markets/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create Market
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => (
          <Link
            key={market.id}
            href={`/markets/${market.id}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  market.settled ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                }`}>
                  {market.settled ? 'Settled' : 'Active'}
                </span>
                <span className="text-sm text-gray-500">
                  {getMarketTypeString(market.marketType)}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {market.question}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {market.description}
              </p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Total Liquidity:</span>
                  <span className="font-medium">
                    {market.totalLiquidity.toString()} USDC
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Start:</span>
                  <span>{formatTime(market.startTime)}</span>
                </div>

                <div className="flex justify-between">
                  <span>End:</span>
                  <span>{formatTime(market.endTime)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {markets.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No markets found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Be the first to create a prediction market!
          </p>
        </div>
      )}
    </div>
  );
}
