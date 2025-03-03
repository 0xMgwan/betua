import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useContractRead } from 'wagmi';
import { formatUnits } from 'viem';
import { type Abi } from 'viem';
import SportsBettingABI from '../../../contracts/abis/SportsBetting.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BetStats {
  totalBets: number;
  winningBets: number;
  totalStaked: number;
  totalReturns: number;
  profitLoss: number;
}

interface SportStats {
  name: string;
  bets: number;
  winRate: number;
  profitLoss: number;
}

const contractAbi = SportsBettingABI.abi as Abi;

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('7d');
  const [betStats, setBetStats] = useState<BetStats>({
    totalBets: 0,
    winningBets: 0,
    totalStaked: 0,
    totalReturns: 0,
    profitLoss: 0
  });
  const [sportStats, setSportStats] = useState<SportStats[]>([]);
  const [profitHistory, setProfitHistory] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const { data: userBets } = useContractRead<typeof contractAbi, 'getUserBets', any[]>({
    address: process.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getUserBets',
    args: ['0x'], // Current user address would go here
  });

  useEffect(() => {
    // Mock data - would be replaced with actual contract data
    const mockStats: BetStats = {
      totalBets: 156,
      winningBets: 87,
      totalStaked: 2500,
      totalReturns: 2850,
      profitLoss: 350
    };

    const mockSportStats: SportStats[] = [
      { name: 'Basketball', bets: 45, winRate: 62, profitLoss: 180 },
      { name: 'Soccer', bets: 38, winRate: 55, profitLoss: 90 },
      { name: 'Tennis', bets: 28, winRate: 48, profitLoss: -40 },
      { name: 'Hockey', bets: 25, winRate: 58, profitLoss: 120 }
    ];

    const mockProfitHistory = [0, 50, -20, 120, 80, 200, 350];
    const mockLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    setBetStats(mockStats);
    setSportStats(mockSportStats);
    setProfitHistory(mockProfitHistory);
    setLabels(mockLabels);
  }, [timeframe]);

  const profitChartData = {
    labels,
    datasets: [
      {
        label: 'Profit/Loss',
        data: profitHistory,
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const sportChartData = {
    labels: sportStats.map(s => s.name),
    datasets: [
      {
        label: 'Win Rate (%)',
        data: sportStats.map(s => s.winRate),
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Timeframe Selection */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Betting Analytics</h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', 'all'].map((t) => (
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Total Bets</div>
          <div className="text-2xl font-bold">{betStats.totalBets}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Win Rate</div>
          <div className="text-2xl font-bold">
            {((betStats.winningBets / betStats.totalBets) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Total Staked</div>
          <div className="text-2xl font-bold">{betStats.totalStaked} USDC</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Total Returns</div>
          <div className="text-2xl font-bold">{betStats.totalReturns} USDC</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500">Profit/Loss</div>
          <div className={`text-2xl font-bold ${
            betStats.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {betStats.profitLoss > 0 ? '+' : ''}{betStats.profitLoss} USDC
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Profit/Loss Over Time</h3>
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
          <h3 className="text-lg font-medium mb-4">Win Rate by Sport</h3>
          <Bar
            data={sportChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div>
      </div>

      {/* Sport-wise Performance */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Performance by Sport</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Bets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Win Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit/Loss
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sportStats.map((sport) => (
                <tr key={sport.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {sport.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sport.bets}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sport.winRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      sport.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {sport.profitLoss > 0 ? '+' : ''}{sport.profitLoss} USDC
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
