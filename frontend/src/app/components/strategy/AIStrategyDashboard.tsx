import React, { useState, useEffect } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { useToast as useChakraToast } from '@chakra-ui/react';
import BettingStrategyABI from '../../../contracts/abis/BettingStrategy.json';
import { AIStrategyService, AIRecommendation, MatchData } from '@/app/services/AIStrategyService';

enum StrategyType {
  VALUE_BETTING,
  ARBITRAGE,
  MARTINGALE,
  KELLY_CRITERION,
  FIXED_PROFIT,
  AI_RECOMMENDED
}

interface Strategy {
  id: number;
  name: string;
  description: string;
  strategyType: StrategyType;
  minStake: bigint;
  maxStake: bigint;
  targetOdds: bigint;
  stopLoss: bigint;
  takeProfit: bigint;
  active: boolean;
  successRate: bigint;
  totalBets: bigint;
  winningBets: bigint;
}

const contractAbi = BettingStrategyABI.abi as any;

export default function AIStrategyDashboard() {
  const toast = useChakraToast();
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [stake, setStake] = useState('');

  const aiService = new AIStrategyService();

  const { data: strategies } = useContractRead<typeof contractAbi, 'getStrategies', Strategy[]>({
    address: process.env.NEXT_PUBLIC_BETTING_STRATEGY_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getStrategies',
  });

  const { data: userStrategies } = useContractRead<typeof contractAbi, 'getUserStrategies', Strategy[]>({
    address: process.env.NEXT_PUBLIC_BETTING_STRATEGY_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getUserStrategies',
    args: ['0x'], // Current user address
  });

  const { write: subscribeToStrategy } = useContractWrite({
    address: process.env.NEXT_PUBLIC_BETTING_STRATEGY_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'subscribeToStrategy',
  });

  useEffect(() => {
    if (selectedStrategy !== null) {
      analyzeCurrentMatches();
    }
  }, [selectedStrategy]);

  const analyzeCurrentMatches = async () => {
    setIsLoading(true);
    try {
      // Mock match data for demonstration
      const mockMatch: MatchData = {
        id: 1,
        homeTeam: "Team A",
        awayTeam: "Team B",
        league: "Premier League",
        startTime: Date.now() + 86400000,
        odds: {
          home: 2.1,
          draw: 3.2,
          away: 3.5
        },
        statistics: {
          homeForm: [1, 1, 0, 1, 1],
          awayForm: [1, 0, 0, 1, 0],
          h2h: [
            {
              date: Date.now() - 7776000000,
              homeScore: 2,
              awayScore: 1
            }
          ]
        }
      };

      const recommendation = await aiService.analyzeMatch(mockMatch);
      setAiRecommendation(recommendation);
    } catch (error) {
      toast({
        title: 'Error analyzing matches',
        description: 'Failed to get AI recommendations',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedStrategy || !stake) return;

    try {
      const duration = 30 * 24 * 60 * 60; // 30 days
      subscribeToStrategy({
        args: [selectedStrategy, parseUnits(stake, 6), autoMode, duration],
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe to strategy',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI Betting Strategies</h2>
        <p className="text-gray-600">
          Let our AI analyze matches and recommend optimal betting strategies based on
          historical data, current form, and market conditions.
        </p>
      </div>

      {/* Strategy Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {strategies?.map((strategy: Strategy) => (
          <div
            key={strategy.id}
            className={`p-6 rounded-lg shadow-md cursor-pointer transition-all
              ${selectedStrategy === strategy.id
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-white hover:shadow-lg'
              }`}
            onClick={() => setSelectedStrategy(Number(strategy.id))}
          >
            <h3 className="text-lg font-medium mb-2">{strategy.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-medium text-green-600">
                  {formatUnits(strategy.successRate, 2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Bets:</span>
                <span className="font-medium">{strategy.totalBets.toString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Min Stake:</span>
                <span className="font-medium">
                  {formatUnits(strategy.minStake, 6)} USDC
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendation */}
      {selectedStrategy !== null && aiRecommendation && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">AI Analysis & Recommendation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Prediction Confidence</h4>
              <div className="h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${aiRecommendation.confidence}%` }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <span className="font-medium">{aiRecommendation.confidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className={`font-medium ${
                    aiRecommendation.riskLevel === 'low' ? 'text-green-600' :
                    aiRecommendation.riskLevel === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {aiRecommendation.riskLevel.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Value:</span>
                  <span className="font-medium">
                    {(aiRecommendation.expectedValue * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Reasoning</h4>
              <ul className="space-y-2 text-sm">
                {aiRecommendation.reasoning.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Form */}
      {selectedStrategy !== null && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Subscribe to Strategy</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stake Amount (USDC)
              </label>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
                step="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Execution Mode
              </label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={!autoMode}
                    onChange={() => setAutoMode(false)}
                    className="form-radio"
                  />
                  <span className="ml-2">Manual</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={autoMode}
                    onChange={() => setAutoMode(true)}
                    className="form-radio"
                  />
                  <span className="ml-2">Automatic</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={!selectedStrategy || !stake || isLoading}
            className={`mt-6 w-full py-2 px-4 rounded-md text-white font-medium
              ${(!selectedStrategy || !stake || isLoading)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Processing...' : 'Subscribe to Strategy'}
          </button>
        </div>
      )}
    </div>
  );
}
