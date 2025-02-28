import express from 'express';
import aiPredictionService from '../services/aiPredictionService.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
    try {
        const matchData = req.body;
        const prediction = await aiPredictionService.analyzePrediction(matchData);
        res.json(prediction);
    } catch (error) {
        console.error('Prediction analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze prediction' });
    }
});

router.get('/match-history/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const stats = await aiPredictionService.getTeamStats(teamId);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching team history:', error);
        res.status(500).json({ error: 'Failed to fetch team history' });
    }
});

router.get('/head-to-head/:team1Id/:team2Id', async (req, res) => {
    try {
        const { team1Id, team2Id } = req.params;
        const h2h = await aiPredictionService.getHeadToHead(team1Id, team2Id);
        res.json(h2h);
    } catch (error) {
        console.error('Error fetching head to head:', error);
        res.status(500).json({ error: 'Failed to fetch head to head data' });
    }
});

export default router;
