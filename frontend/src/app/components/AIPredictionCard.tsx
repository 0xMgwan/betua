import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface PredictionData {
    matchWinner: string;
    predictedScore: string;
    confidence: number;
    keyFactors: string[];
    risks: string[];
    recommendedBetSize: 'conservative' | 'moderate' | 'aggressive';
    mlAdjustedProbability: {
        homeWin: number;
        draw: number;
        awayWin: number;
    };
}

interface Props {
    matchData: {
        homeTeam: {
            id: string;
            name: string;
        };
        awayTeam: {
            id: string;
            name: string;
        };
        venue: string;
        league: string;
        datetime: string;
    };
    onPredictionComplete?: (prediction: PredictionData) => void;
}

export default function AIPredictionCard({ matchData, onPredictionComplete }: Props) {
    const [prediction, setPrediction] = useState<PredictionData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrediction = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post('/api/predictions/analyze', matchData);
                setPrediction(response.data);
                onPredictionComplete?.(response.data);
            } catch (err) {
                setError('Failed to fetch prediction');
                console.error('Prediction error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (matchData) {
            fetchPrediction();
        }
    }, [matchData]);

    return (
        <div className="betting-card overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">AI Match Analysis</h2>
            
            <AnimatePresence>
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center items-center py-8"
                    >
                        <div className="relative w-16 h-16">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-black rounded-full animate-spin border-t-transparent"></div>
                        </div>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-center py-4"
                    >
                        {error}
                    </motion.div>
                ) : prediction ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Prediction Header */}
                        <div className="text-center">
                            <div className="text-2xl font-bold mb-2">
                                {prediction.matchWinner}
                            </div>
                            <div className="text-lg text-gray-600">
                                Predicted Score: {prediction.predictedScore}
                            </div>
                        </div>

                        {/* Confidence Meter */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Confidence Level</span>
                                <span className="font-semibold">{prediction.confidence}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${prediction.confidence}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-black rounded-full"
                                />
                            </div>
                        </div>

                        {/* Win Probabilities */}
                        <div className="space-y-2">
                            <h3 className="font-semibold">Win Probabilities</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Home</div>
                                    <div className="font-semibold">
                                        {prediction.mlAdjustedProbability.homeWin.toFixed(1)}%
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Draw</div>
                                    <div className="font-semibold">
                                        {prediction.mlAdjustedProbability.draw.toFixed(1)}%
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Away</div>
                                    <div className="font-semibold">
                                        {prediction.mlAdjustedProbability.awayWin.toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Factors */}
                        <div>
                            <h3 className="font-semibold mb-2">Key Factors</h3>
                            <ul className="space-y-1">
                                {prediction.keyFactors.map((factor, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        • {factor}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Risk Assessment */}
                        <div>
                            <h3 className="font-semibold mb-2">Risk Assessment</h3>
                            <ul className="space-y-1">
                                {prediction.risks.map((risk, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        • {risk}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bet Size Recommendation */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Recommended Bet Size</h3>
                            <div className="flex items-center space-x-2">
                                <div className={`h-3 w-3 rounded-full ${
                                    prediction.recommendedBetSize === 'conservative' ? 'bg-green-500' :
                                    prediction.recommendedBetSize === 'moderate' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                }`} />
                                <span className="capitalize">{prediction.recommendedBetSize}</span>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
