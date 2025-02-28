import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import OpenAI from 'openai';
import { ethers } from 'ethers';

import userRoutes from './routes/users.js';
import predictionRoutes from './routes/predictions.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/events', eventRoutes);

// AI Prediction endpoint
app.post('/api/ai-prediction', async (req, res) => {
    try {
        const { homeTeam, awayTeam, historicalData } = req.body;

        const prompt = `Based on the following historical data: ${JSON.stringify(historicalData)},
            predict the outcome of the match between ${homeTeam} and ${awayTeam}.
            Provide the prediction in the following format:
            {
                "winner": "team name or draw",
                "confidence": "percentage",
                "reasoning": "brief explanation"
            }`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a sports prediction AI that analyzes historical data and current team statistics to make match predictions."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const prediction = JSON.parse(completion.choices[0].message.content);
        res.json(prediction);
    } catch (error) {
        console.error('AI Prediction error:', error);
        res.status(500).json({ error: 'Failed to generate prediction' });
    }
});

// Blockchain interaction endpoints
app.post('/api/place-bet', async (req, res) => {
    try {
        const { eventId, prediction, amount, userAddress } = req.body;
        
        // Initialize provider and contract
        const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
        const contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS,
            process.env.CONTRACT_ABI,
            provider
        );

        // Generate transaction data
        const tx = await contract.populateTransaction.placeBet(
            eventId,
            prediction,
            ethers.utils.parseUnits(amount.toString(), 6), // USDC has 6 decimals
            200 // Example odds (2.00)
        );

        res.json({ 
            tx: tx,
            gas: await provider.estimateGas(tx)
        });
    } catch (error) {
        console.error('Blockchain interaction error:', error);
        res.status(500).json({ error: 'Failed to prepare transaction' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
