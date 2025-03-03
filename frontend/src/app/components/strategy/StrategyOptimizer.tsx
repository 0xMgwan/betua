import React, { useState, useEffect } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { useToast } from '@chakra-ui/react';
import BettingStrategyABI from '@/contracts/abis/BettingStrategy.json';
import { AIStrategyService } from '@/app/services/AIStrategyService';

interface OptimizationParams {
  stakeSize: {
    min: number;
    max: number;
    current: number;
  };
  oddsRange: {
    min: number;
    max: number;
    current: number;
  };
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  timePreference: {
    weekdays: boolean;
    weekends: boolean;
    timeOfDay: string[];
  };
  sportPreference: string[];
}

interface OptimizationResult {
  expectedRoi: number;
  winRate: number;
  riskScore: number;
  recommendations: string[];
}

export default function StrategyOptimizer() {
  const toast = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [params, setParams] = useState<OptimizationParams>({
    stakeSize: {
      min: 10,
      max: 1000,
      current: 100
    },
    oddsRange: {
      min: 1.5,
      max: 5.0,
      current: 2.0
    },
    riskLevel: 'moderate',
    timePreference: {
      weekdays: true,
      weekends: true,
      timeOfDay: ['morning', 'evening']
    },
    sportPreference: ['soccer', 'basketball']
  });
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const aiService = new AIStrategyService();

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      // In a real implementation, this would call the AI service
      // For demo, we'll simulate optimization
      await simulateOptimization();
    } catch (error) {
      toast({
        title: 'Optimization Error',
        description: 'Failed to optimize strategy parameters',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const simulateOptimization = async () => {
    // Simulate AI optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const optimizedResult: OptimizationResult = {
      expectedRoi: 18.5,
      winRate: 62.5,
      riskScore: 6.8,
      recommendations: [
        'Increase stake size by 15% for matches with odds between 1.8-2.2',
        'Focus on Premier League and NBA markets',
        'Avoid betting during major tournament finals',
        'Implement stop-loss at 5% of bankroll'
      ]
    };

    setResult(optimizedResult);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Strategy Optimizer</h2>
        <p className="text-gray-600">
          Fine-tune your betting strategy using AI-powered optimization. Our system analyzes
          your betting history and market conditions to recommend optimal parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Optimization Parameters */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-6">Strategy Parameters</h3>

          {/* Stake Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stake Size Range (USDC)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={params.stakeSize.min}
                  onChange={(e) => setParams({
                    ...params,
                    stakeSize: {
                      ...params.stakeSize,
                      min: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Min stake"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={params.stakeSize.max}
                  onChange={(e) => setParams({
                    ...params,
                    stakeSize: {
                      ...params.stakeSize,
                      max: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Max stake"
                />
              </div>
            </div>
          </div>

          {/* Odds Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Odds Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={params.oddsRange.min}
                  onChange={(e) => setParams({
                    ...params,
                    oddsRange: {
                      ...params.oddsRange,
                      min: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  step="0.1"
                  placeholder="Min odds"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={params.oddsRange.max}
                  onChange={(e) => setParams({
                    ...params,
                    oddsRange: {
                      ...params.oddsRange,
                      max: Number(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  step="0.1"
                  placeholder="Max odds"
                />
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Level
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['conservative', 'moderate', 'aggressive'].map((level) => (
                <button
                  key={level}
                  onClick={() => setParams({
                    ...params,
                    riskLevel: level as OptimizationParams['riskLevel']
                  })}
                  className={`py-2 px-4 rounded-md text-sm font-medium
                    ${params.riskLevel === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Preferences */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sport Preferences
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['soccer', 'basketball', 'tennis', 'hockey', 'baseball', 'esports'].map((sport) => (
                <label key={sport} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={params.sportPreference.includes(sport)}
                    onChange={(e) => {
                      const newPreferences = e.target.checked
                        ? [...params.sportPreference, sport]
                        : params.sportPreference.filter(s => s !== sport);
                      setParams({
                        ...params,
                        sportPreference: newPreferences
                      });
                    }}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">{
                    sport.charAt(0).toUpperCase() + sport.slice(1)
                  }</span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Preferences
            </label>
            <div className="space-y-2">
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={params.timePreference.weekdays}
                  onChange={(e) => setParams({
                    ...params,
                    timePreference: {
                      ...params.timePreference,
                      weekdays: e.target.checked
                    }
                  })}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm">Weekdays</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={params.timePreference.weekends}
                  onChange={(e) => setParams({
                    ...params,
                    timePreference: {
                      ...params.timePreference,
                      weekends: e.target.checked
                    }
                  })}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm">Weekends</span>
              </label>
            </div>
          </div>
        </div>

        {/* Optimization Results */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-6">Optimization Results</h3>

          {isOptimizing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Optimizing strategy parameters...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Expected ROI</div>
                  <div className="text-xl font-bold text-green-600">
                    +{result.expectedRoi}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Win Rate</div>
                  <div className="text-xl font-bold">
                    {result.winRate}%
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Risk Score</div>
                  <div className="text-xl font-bold">
                    {result.riskScore}/10
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  AI Recommendations
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-blue-600 mr-2">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <button
                className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply Optimized Parameters
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Click optimize to generate AI recommendations
            </div>
          )}

          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className={`w-full mt-6 py-2 px-4 rounded-md text-white font-medium
              ${isOptimizing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isOptimizing ? 'Optimizing...' : 'Optimize Strategy'}
          </button>
        </div>
      </div>
    </div>
  );
}
