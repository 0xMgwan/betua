import axios from 'axios';

export interface MatchData {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  startTime: number;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  statistics: {
    homeForm: number[];
    awayForm: number[];
    h2h: {
      date: number;
      homeScore: number;
      awayScore: number;
    }[];
  };
}

export interface AIRecommendation {
  confidence: number;
  predictedOutcome: number;
  recommendedStake: number;
  reasoning: string[];
  riskLevel: 'low' | 'medium' | 'high';
  expectedValue: number;
}

export interface MarketAnalysis {
  valueGap: number;
  marketEfficiency: number;
  trendAnalysis: {
    direction: 'up' | 'down' | 'stable';
    strength: number;
  };
}

export class AIStrategyService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_AI_SERVICE_API_KEY || '';
    this.baseUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL || '';
  }

  async analyzeMatch(matchData: MatchData): Promise<AIRecommendation> {
    try {
      // In a real implementation, this would call an AI service
      // For demo, we'll use a simplified analysis
      const recommendation = await this.generateRecommendation(matchData);
      return recommendation;
    } catch (error) {
      console.error('Error analyzing match:', error);
      throw error;
    }
  }

  private async generateRecommendation(matchData: MatchData): Promise<AIRecommendation> {
    // Simulate AI analysis
    const homeFormAvg = this.calculateFormAverage(matchData.statistics.homeForm);
    const awayFormAvg = this.calculateFormAverage(matchData.statistics.awayForm);
    const h2hAdvantage = this.analyzeHeadToHead(matchData.statistics.h2h);

    const confidence = this.calculateConfidence(homeFormAvg, awayFormAvg, h2hAdvantage);
    const predictedOutcome = this.predictOutcome(homeFormAvg, awayFormAvg, h2hAdvantage);
    const recommendedStake = this.calculateRecommendedStake(confidence);

    return {
      confidence,
      predictedOutcome,
      recommendedStake,
      reasoning: this.generateReasoning(matchData, homeFormAvg, awayFormAvg, h2hAdvantage),
      riskLevel: this.determineRiskLevel(confidence),
      expectedValue: this.calculateExpectedValue(matchData.odds, predictedOutcome, confidence)
    };
  }

  private calculateFormAverage(form: number[]): number {
    return form.reduce((acc, val) => acc + val, 0) / form.length;
  }

  private analyzeHeadToHead(h2h: MatchData['statistics']['h2h']): number {
    let homeAdvantage = 0;
    h2h.forEach(match => {
      if (match.homeScore > match.awayScore) homeAdvantage++;
      else if (match.homeScore < match.awayScore) homeAdvantage--;
    });
    return homeAdvantage / h2h.length;
  }

  private calculateConfidence(
    homeForm: number,
    awayForm: number,
    h2hAdvantage: number
  ): number {
    const formDiff = Math.abs(homeForm - awayForm);
    const h2hWeight = Math.abs(h2hAdvantage);
    return Math.min((formDiff * 0.6 + h2hWeight * 0.4) * 100, 100);
  }

  private predictOutcome(
    homeForm: number,
    awayForm: number,
    h2hAdvantage: number
  ): number {
    if (homeForm > awayForm && h2hAdvantage > 0) return 1; // Home win
    if (awayForm > homeForm && h2hAdvantage < 0) return 2; // Away win
    return 0; // Draw
  }

  private calculateRecommendedStake(confidence: number): number {
    // Use Kelly Criterion or similar formula
    return Math.floor(confidence * 0.01 * 100); // Simplified version
  }

  private generateReasoning(
    matchData: MatchData,
    homeForm: number,
    awayForm: number,
    h2hAdvantage: number
  ): string[] {
    const reasons: string[] = [];

    reasons.push(`${matchData.homeTeam} recent form rating: ${homeForm.toFixed(2)}`);
    reasons.push(`${matchData.awayTeam} recent form rating: ${awayForm.toFixed(2)}`);
    
    if (h2hAdvantage > 0) {
      reasons.push(`${matchData.homeTeam} has historical advantage in head-to-head matches`);
    } else if (h2hAdvantage < 0) {
      reasons.push(`${matchData.awayTeam} has historical advantage in head-to-head matches`);
    }

    // Add market analysis
    const marketAnalysis = this.analyzeMarket(matchData.odds);
    if (marketAnalysis.valueGap > 0.1) {
      reasons.push(`Potential value bet identified with ${(marketAnalysis.valueGap * 100).toFixed(1)}% edge`);
    }

    return reasons;
  }

  private determineRiskLevel(confidence: number): 'low' | 'medium' | 'high' {
    if (confidence >= 75) return 'low';
    if (confidence >= 50) return 'medium';
    return 'high';
  }

  private calculateExpectedValue(
    odds: MatchData['odds'],
    predictedOutcome: number,
    confidence: number
  ): number {
    const probability = confidence / 100;
    const relevantOdds = predictedOutcome === 1 ? odds.home : 
                        predictedOutcome === 2 ? odds.away : 
                        odds.draw;
    return (probability * relevantOdds) - 1;
  }

  private analyzeMarket(odds: MatchData['odds']): MarketAnalysis {
    // Convert odds to implied probabilities
    const totalProb = (1/odds.home + 1/odds.draw + 1/odds.away);
    const marketEfficiency = Math.abs(1 - totalProb);

    return {
      valueGap: Math.max(0, 1 - totalProb),
      marketEfficiency,
      trendAnalysis: {
        direction: 'stable',
        strength: 0.5
      }
    };
  }

  // Additional methods for strategy optimization
  async optimizeStrategy(
    userId: string,
    strategyId: number,
    historicalData: any[]
  ): Promise<any> {
    // Implement strategy optimization using machine learning
    // This would typically be done on the backend
    return {
      optimizedParameters: {
        stakeSize: 0,
        oddsThreshold: 0,
        sportPreference: [],
        timeOfDay: []
      }
    };
  }
}

// Export a singleton instance
export const aiStrategyService = new AIStrategyService();
