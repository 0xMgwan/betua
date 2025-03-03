'use client';

import { useState } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import Logo from '../components/Logo';
import { WalletButton } from '../components/WalletButton';

export default function PredictionsPage() {
  const predictions = [
    {
      id: 1,
      match: 'Arsenal vs Chelsea',
      league: 'Premier League',
      date: '2025-03-01',
      prediction: {
        homeWin: 48,
        draw: 26,
        awayWin: 26
      },
      confidence: 85,
      factors: [
        'Arsenal\'s strong home record this season',
        'Chelsea\'s inconsistent away form',
        'Historical head-to-head favors Arsenal at home',
        'Key players returning from injury for Arsenal'
      ]
    },
    {
      id: 2,
      match: 'Liverpool vs Manchester City',
      league: 'Premier League',
      date: '2025-03-02',
      prediction: {
        homeWin: 35,
        draw: 30,
        awayWin: 35
      },
      confidence: 92,
      factors: [
        'Both teams in excellent form',
        'Manchester City\'s recent defensive improvements',
        'Liverpool\'s strong attacking statistics',
        'High-stakes match affecting title race'
      ]
    },
    {
      id: 3,
      match: 'Manchester United vs Tottenham',
      league: 'Premier League',
      date: '2025-03-02',
      prediction: {
        homeWin: 42,
        draw: 33,
        awayWin: 25
      },
      confidence: 78,
      factors: [
        'United\'s improved home performances',
        'Tottenham\'s mixed away results',
        'Key injuries in Tottenham\'s defense',
        'Historical rivalry impact'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Container maxW="container.xl" py={8}>
        <Heading size="lg" mb={6}>AI Predictions</Heading>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">AI Match Predictions</h1>
              <p className="text-gray-400">Powered by advanced machine learning algorithms</p>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-sm text-gray-400">Average Accuracy</p>
              <p className="text-2xl font-bold text-green-400">84.5%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {predictions.map((pred) => (
              <div
                key={pred.id}
                className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10"
              >
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6">
                  <div>
                    <div className="text-sm text-blue-400 mb-2">{pred.league} - {pred.date}</div>
                    <h3 className="text-xl font-semibold text-white">{pred.match}</h3>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <div className="inline-flex px-4 py-2 bg-green-500/20 rounded-full">
                      <span className="text-green-400">{pred.confidence}% Confidence</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500"
                      style={{ width: `${pred.prediction.homeWin}%` }}
                    />
                    <div
                      className="absolute h-full bg-yellow-500"
                      style={{ left: `${pred.prediction.homeWin}%`, width: `${pred.prediction.draw}%` }}
                    />
                    <div
                      className="absolute right-0 top-0 h-full bg-blue-500"
                      style={{ width: `${pred.prediction.awayWin}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Home Win</div>
                      <div className="text-lg font-semibold text-white">{pred.prediction.homeWin}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Draw</div>
                      <div className="text-lg font-semibold text-white">{pred.prediction.draw}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Away Win</div>
                      <div className="text-lg font-semibold text-white">{pred.prediction.awayWin}%</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Key Factors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pred.factors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-300">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
