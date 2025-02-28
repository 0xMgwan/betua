import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    homeTeam: {
        id: String,
        name: String,
    },
    awayTeam: {
        id: String,
        name: String,
    },
    league: {
        id: String,
        name: String,
    },
    startTime: Date,
    venue: String,
    odds: {
        home: Number,
        draw: Number,
        away: Number,
    },
    prediction: {
        winner: String,
        confidence: Number,
        predictedScore: String,
        keyFactors: [String],
        risks: [String],
        recommendedBetSize: String,
        mlAdjustedProbability: {
            homeWin: Number,
            draw: Number,
            awayWin: Number,
        },
    },
    status: {
        type: String,
        enum: ['scheduled', 'live', 'finished', 'cancelled'],
        default: 'scheduled',
    },
    result: {
        homeScore: Number,
        awayScore: Number,
        winner: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Event', eventSchema);
