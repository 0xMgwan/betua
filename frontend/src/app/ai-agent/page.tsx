'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  useColorModeValue,
  Card,
  CardBody,
  Badge,
  Progress,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';

interface Prediction {
  match: string;
  confidence: number;
  recommendation: string;
  reasoning: string[];
  potentialReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export default function AIAgentPage() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const predictions: Prediction[] = [
    {
      match: 'Sacramento Kings vs Houston Rockets',
      confidence: 85,
      recommendation: 'Back Kings -6.0',
      reasoning: [
        'Kings have won 7 of their last 8 home games',
        'Rockets struggling on road with 3-12 record',
        'Key players injury advantage for Kings',
      ],
      potentialReturn: 1.76,
      riskLevel: 'Medium',
    },
    {
      match: 'Udinese vs Parma',
      confidence: 92,
      recommendation: 'Over 241.5',
      reasoning: [
        'Both teams averaging 3+ goals in last 5 games',
        'Historical h2h suggests high-scoring matches',
        'Weather conditions favorable for attacking play',
      ],
      potentialReturn: 4.71,
      riskLevel: 'Low',
    },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            AI Betting Assistant
          </Text>
          <HStack>
            <Input
              placeholder="Ask anything about matches, odds, or strategies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="lg"
            />
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
            >
              Analyze
            </Button>
          </HStack>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>
            Today's Top Predictions
          </Text>
          <VStack spacing={4}>
            {predictions.map((prediction, index) => (
              <Card key={index} w="full" bg={cardBg}>
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{prediction.match}</Text>
                      <Badge
                        colorScheme={
                          prediction.confidence > 85
                            ? 'green'
                            : prediction.confidence > 70
                            ? 'yellow'
                            : 'red'
                        }
                      >
                        {prediction.confidence}% Confidence
                      </Badge>
                    </HStack>

                    <Box>
                      <Text fontWeight="semibold" mb={2}>
                        Recommendation: {prediction.recommendation}
                      </Text>
                      <Progress
                        value={prediction.confidence}
                        colorScheme="blue"
                        size="sm"
                        mb={2}
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" mb={2}>
                        Reasoning:
                      </Text>
                      {prediction.reasoning.map((reason, idx) => (
                        <Text key={idx} fontSize="sm" color="gray.500">
                          • {reason}
                        </Text>
                      ))}
                    </Box>

                    <Divider />

                    <HStack justify="space-between">
                      <Stat>
                        <StatLabel>Potential Return</StatLabel>
                        <StatNumber>{prediction.potentialReturn}x</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          {((prediction.potentialReturn - 1) * 100).toFixed(1)}%
                        </StatHelpText>
                      </Stat>

                      <Badge
                        colorScheme={
                          prediction.riskLevel === 'Low'
                            ? 'green'
                            : prediction.riskLevel === 'Medium'
                            ? 'yellow'
                            : 'red'
                        }
                      >
                        {prediction.riskLevel} Risk
                      </Badge>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
