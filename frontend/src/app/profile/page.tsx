'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import Logo from '../components/Logo';
import { WalletButton } from '../components/WalletButton';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('bets');

  const mockData = {
    bets: [
      { id: 1, match: 'Arsenal vs Chelsea', prediction: 'Home Win', amount: '0.1 ETH', status: 'Pending' },
      { id: 2, match: 'Liverpool vs Man City', prediction: 'Away Win', amount: '0.2 ETH', status: 'Won' },
    ],
    earnings: {
      total: '1.5 ETH',
      thisMonth: '0.5 ETH',
      winRate: '65%'
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Profile Dashboard</h1>
              <p className="text-gray-400">Manage your bets and track your performance</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-gray-400">Total Earnings</p>
                <p className="text-2xl font-bold text-yellow-400">{mockData.earnings.total}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('bets')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'bets'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/30 text-gray-400 hover:bg-black/50'
              }`}
            >
              Active Bets
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'history'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/30 text-gray-400 hover:bg-black/50'
              }`}
            >
              Betting History
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'stats'
                  ? 'bg-blue-500 text-white'
                  : 'bg-black/30 text-gray-400 hover:bg-black/50'
              }`}
            >
              Statistics
            </button>
          </div>

          <div className="space-y-4">
            {mockData.bets.map((bet) => (
              <div
                key={bet.id}
                className="bg-black/30 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">{bet.match}</h3>
                  <p className="text-gray-400">Prediction: {bet.prediction}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Amount</p>
                    <p className="text-lg font-semibold text-white">{bet.amount}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${
                    bet.status === 'Won' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {bet.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
