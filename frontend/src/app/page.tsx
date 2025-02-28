'use client';

import AIPredictionCard from './components/AIPredictionCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AfricaBet - Sports Betting Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join the future of sports betting with our AI-powered platform.
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
