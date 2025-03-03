import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useContractRead } from 'wagmi';
import { formatUnits } from 'viem';
import BettingStrategyABI from '@/contracts/abis/BettingStrategy.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PerformanceMetrics {
  roi: number;
  winRate: number;
  profitFactor: number;
  sharpRatio: number;
  maxDrawdown: number;
  averageWin: number;
  averageLoss: number;
  consecutiveWins: number;
  consecutiveLosses: number;
}

interface SportPerformance {
  sport: string;
  bets: number;
  winRate: number;
  roi: number;
  expectedValue: number;
}

export default function StrategyPerformance() {
  const [timeframe, setTimeframe] = useState('30d');
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    roi: 0,
    winRate: 0,
    profitFactor: 0,
    sharpRatio: 0,
    maxDrawdown: 0,
    averageWin: 0,
    averageLoss: 0,
    consecutiveWins: 0,
    consecutiveLosses: 0
  });
  const [sportPerformance, setSportPerformance] = useState<SportPerformance[]>([]);
  const [profitHistory, setProfitHistory] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate fetching performance data
    const mockMetrics: PerformanceMetrics = {
      roi: 15.7,
      winRate: 58.3,
      profitFactor: 1.85,
      sharpRatio: 1.2,
      maxDrawdown: 12.5,
      averageWin: 125,
      averageLoss: 85,
      consecutiveWins: 5,
      consecutiveLosses: 2
    };

    const mockSportPerformance: SportPerformance[] = [
      { sport: 'Soccer', bets: 145, winRate: 62, roi: 18.5, expectedValue: 1.12 },
      { sport: 'Basketball', bets: 98, winRate: 55, roi: 12.3, expectedValue: 1.08 },
      { sport: 'Tennis', bets: 76, winRate: 59, roi: 15.8, expectedValue: 1.15 },
      { sport: 'Hockey', bets: 54, winRate: 52, roi: 8.9, expectedValue: 1.05 }
    ];

    const mockProfitHistory = Array.from({ length: 30 }, (_, i) => {
      return Math.sin(i / 5) * 50 + Math.random() * 20 + 100;
    });

    const mockLabels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toLocaleDateString();
    });

    setMetrics(mockMetrics);
    setSportPerformance(mockSportPerformance);
    setProfitHistory(mockProfitHistory);
    setLabels(mockLabels);
  }, [timeframe]);

  const profitChartData = {
    labels,
    datasets: [
      {
        label: 'Cumulative Profit',
        data: profitHistory,
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const sportRadarData = {
    labels: sportPerformance.map(s => s.sport),
    datasets: [
      {
        label: 'ROI %',
        data: sportPerformance.map(s => s.roi),
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Timeframe Selection */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Strategy Performance</h2>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y', 'all'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded ${
                timeframe === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">ROI</div>
          <div className="text-2xl font-bold text-green-600">
            +{metrics.roi.toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Win Rate</div>
          <div className="text-2xl font-bold">{metrics.winRate.toFixed(1)}%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Profit Factor</div>
          <div className="text-2xl font-bold">{metrics.profitFactor.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Sharp Ratio</div>
          <div className="text-2xl font-bold">{metrics.sharpRatio.toFixed(2)}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Profit History</h3>
          <Line
            data={profitChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Sport Performance</h3>
          <Radar
            data={sportRadarData}
            options={{
              responsive: true,
              scales: {
                r: {
                  beginAtZero: true,
                  min: 0,
                  max: 20
                }
              }
            }}
          />
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Detailed Performance Metrics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Win/Loss Metrics
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Average Win</span>
                  <span className="font-medium text-green-600">
                    ${metrics.averageWin}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average Loss</span>
                  <span className="font-medium text-red-600">
                    ${metrics.averageLoss}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max Drawdown</span>
                  <span className="font-medium">
                    {metrics.maxDrawdown}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Streak Analysis
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Consecutive Wins</span>
                  <span className="font-medium text-green-600">
                    {metrics.consecutiveWins}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Consecutive Losses</span>
                  <span className="font-medium text-red-600">
                    {metrics.consecutiveLosses}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Sport Analysis
              </h4>
              <div className="space-y-2">
                {sportPerformance.map((sport) => (
                  <div key={sport.sport} className="flex justify-between">
                    <span>{sport.sport}</span>
                    <span className="font-medium">
                      EV: {sport.expectedValue.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
