'use client';

import Link from 'next/link';
import { Navigation } from './components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-24">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-yellow-400">Predict.</span>{' '}
            <span className="text-blue-400">Bet.</span>{' '}
            <span className="text-blue-500">Win.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Experience the future of sports betting with AI-powered predictions
            <br />and blockchain technology
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/betting">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg text-black font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/20">
                Start Betting
              </button>
            </Link>
            <Link href="/predictions">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg hover:shadow-blue-500/20">
                View Predictions
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Predictions</h3>
            <p className="text-gray-400">Get accurate predictions powered by advanced machine learning algorithms</p>
          </div>

          <div className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Blockchain</h3>
            <p className="text-gray-400">Your bets are secured by smart contracts on the blockchain</p>
          </div>

          <div className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
            <p className="text-gray-400">Get instant updates on odds, scores, and match statistics</p>
          </div>
        </div>
      </div>
    </main>
  );
}
