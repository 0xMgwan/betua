import OpenAI from 'openai';
import axios from 'axios';

class AIPredictionService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.sportsDataApi = axios.create({
            baseURL: 'https://api.sportsdataapi.com/v1/',
            headers: {
                'apikey': process.env.SPORTS_DATA_API_KEY
            }
        });
    }

    async getTeamStats(teamId, league) {
        try {
            const response = await this.sportsDataApi.get(`/soccer/teams/${teamId}/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching team stats:', error);
            return null;
        }
    }

    async getHeadToHead(team1Id, team2Id) {
        try {
            const response = await this.sportsDataApi.get('/soccer/matches', {
                params: {
                    team_id: [team1Id, team2Id].join(','),
                    last: 10
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching head to head:', error);
            return [];
        }
    }

    async getPlayerStats(teamId) {
        try {
            const response = await this.sportsDataApi.get(`/soccer/players`, {
                params: {
                    team_id: teamId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching player stats:', error);
            return [];
        }
    }

    async getWeatherData(location) {
        try {
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
                params: {
                    key: process.env.WEATHER_API_KEY,
                    q: location,
                    days: 1
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }

    async analyzePrediction(matchData) {
        const {
            homeTeam,
            awayTeam,
            venue,
            league,
            datetime
        } = matchData;

        // Gather all relevant data
        const [
            homeTeamStats,
            awayTeamStats,
            headToHead,
            homePlayerStats,
            awayPlayerStats,
            weatherData
        ] = await Promise.all([
            this.getTeamStats(homeTeam.id, league),
            this.getTeamStats(awayTeam.id, league),
            this.getHeadToHead(homeTeam.id, awayTeam.id),
            this.getPlayerStats(homeTeam.id),
            this.getPlayerStats(awayTeam.id),
            this.getWeatherData(venue)
        ]);

        // Prepare the prompt for GPT-4
        const prompt = {
            role: "system",
            content: `You are an expert sports analyst AI that provides detailed match predictions based on comprehensive data analysis. 
            Analyze the following data and provide a prediction with confidence levels and reasoning.`
        };

        const userPrompt = {
            role: "user",
            content: `Analyze this match:
            Home Team: ${homeTeam.name}
            Away Team: ${awayTeam.name}
            
            Home Team Stats:
            ${JSON.stringify(homeTeamStats, null, 2)}
            
            Away Team Stats:
            ${JSON.stringify(awayTeamStats, null, 2)}
            
            Head to Head History:
            ${JSON.stringify(headToHead, null, 2)}
            
            Weather Conditions:
            ${JSON.stringify(weatherData, null, 2)}
            
            Provide a detailed prediction including:
            1. Match winner prediction
            2. Predicted score
            3. Confidence level (percentage)
            4. Key factors influencing the prediction
            5. Potential risks to consider
            6. Recommended bet size (conservative, moderate, or aggressive)
            
            Format the response as JSON.`
        };

        // Get AI prediction
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [prompt, userPrompt],
            temperature: 0.7,
            max_tokens: 1000
        });

        // Parse and enhance the prediction
        const prediction = JSON.parse(completion.choices[0].message.content);

        // Add machine learning-based probability adjustments
        prediction.mlAdjustedProbability = await this.calculateMLProbability({
            homeTeamStats,
            awayTeamStats,
            headToHead,
            weatherData
        });

        return prediction;
    }

    async calculateMLProbability(data) {
        // Here we would implement a machine learning model
        // For now, we'll use a simple heuristic
        const homeTeamStrength = this.calculateTeamStrength(data.homeTeamStats);
        const awayTeamStrength = this.calculateTeamStrength(data.awayTeamStats);
        const h2hFactor = this.calculateH2HFactor(data.headToHead);
        const weatherImpact = this.calculateWeatherImpact(data.weatherData);

        const probability = {
            homeWin: (homeTeamStrength * 0.4 + h2hFactor * 0.3 + weatherImpact * 0.3) * 100,
            draw: 25,
            awayWin: (awayTeamStrength * 0.4 + h2hFactor * 0.3 + weatherImpact * 0.3) * 100
        };

        return probability;
    }

    calculateTeamStrength(stats) {
        // Implement team strength calculation based on stats
        if (!stats) return 0.5;
        
        const winRate = stats.wins / (stats.wins + stats.losses + stats.draws);
        const goalDiff = (stats.goalsFor - stats.goalsAgainst) / stats.matches;
        
        return (winRate * 0.6 + (goalDiff + 1) * 0.4);
    }

    calculateH2HFactor(h2h) {
        if (!h2h || !h2h.length) return 0.5;
        
        const recentMatches = h2h.slice(0, 5);
        const homeWins = recentMatches.filter(m => m.winner === 'home').length;
        return homeWins / recentMatches.length;
    }

    calculateWeatherImpact(weather) {
        if (!weather) return 0.5;
        
        // Implement weather impact calculation
        // For example, heavy rain might favor the home team
        const conditions = weather.current.condition.text.toLowerCase();
        if (conditions.includes('rain')) return 0.6;
        if (conditions.includes('wind')) return 0.55;
        return 0.5;
    }
}

export default new AIPredictionService();
