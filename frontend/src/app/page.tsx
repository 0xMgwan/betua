'use client';

import AIPredictionCard from './components/AIPredictionCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-black">
      <nav className="bg-black/30 backdrop-blur-sm border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-400">BetUA</h1>
              </div>
            </div>
            {/* WalletButton */}
          </div>
        </div>
      </nav>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to BetUA
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
              The most advanced sports betting platform powered by AI predictions
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get Started
              </button>
            </div>
            {/* AI Predictions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="sm:col-span-2"
            >
              {selectedEvent && (
                <AIPredictionCard
                  matchData={selectedEvent}
                  onPredictionComplete={(prediction) => {
                    // Update betting odds based on AI prediction
                    if (prediction.mlAdjustedProbability) {
                      setOdds({
                        home: (100 / prediction.mlAdjustedProbability.homeWin).toFixed(2),
                        draw: (100 / prediction.mlAdjustedProbability.draw).toFixed(2),
                        away: (100 / prediction.mlAdjustedProbability.awayWin).toFixed(2),
                      });
                    }
                  }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
