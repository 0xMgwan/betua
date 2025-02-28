import mongoose from 'mongoose';

const betSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    odds: {
        type: Number,
        required: true,
    },
    prediction: {
        type: String,
        enum: ['home', 'draw', 'away'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'won', 'lost', 'cancelled'],
        default: 'pending',
    },
    transactionHash: String,
    payout: Number,
    settledAt: Date,
}, {
    timestamps: true,
});

export default mongoose.model('Bet', betSchema);
