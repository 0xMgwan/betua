'use client';

import { useState, useEffect } from 'react';
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseUnits, type Abi } from 'viem';
import P2PMarketV2ABI from '@/contracts/abis/P2PMarketV2.json';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

interface Market {
  id: number;
  question: string;
  description: string;
  startTime: number;
  endTime: number;
  marketType: MarketType;
  minimumBet: bigint;
  options: string[];
  oracle: string;
  totalLiquidity: bigint;
  isResolved: boolean;
  winningOption: number;
}

interface Position {
  option: number;
  amount: string;
  odds: string;
}

interface MarketTradeProps {
  marketId: number;
}

enum MarketType {
  BINARY = 'BINARY',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  NUMERIC_RANGE = 'NUMERIC_RANGE',
  ORACLE_FEED = 'ORACLE_FEED'
}

const contractAbi = P2PMarketV2ABI.abi as Abi;

export default function MarketTrade({ marketId }: MarketTradeProps) {
  const [market, setMarket] = useState<Market | null>(null);
  const [position, setPosition] = useState<Position>({
    option: 0,
    amount: '',
    odds: '',
  });

  const toast = useToast();

  const { data: marketData } = useContractRead<typeof contractAbi, 'getMarket', Market>({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getMarket',
    args: [marketId],
    watch: true,
  });

  useEffect(() => {
    if (marketData) {
      setMarket(marketData);
    }
  }, [marketData]);

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'placeBet',
    args: [
      marketId,
      position.option,
      parseUnits(position.amount || '0', 18),
      parseUnits(position.odds || '0', 18),
    ],
  });

  const { write } = useContractWrite(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!write) {
      toast({
        title: 'Error',
        description: 'Failed to prepare transaction',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    write();
  };

  if (!market) {
    return (
      <Container maxW="container.md" py={8}>
        <Text>Loading market data...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {market.question}
          </Text>
          <Text color="gray.400" mt={2}>
            {market.description}
          </Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel color="gray.300">Select Option</FormLabel>
              <Select
                value={position.option}
                onChange={(e) => setPosition(prev => ({ ...prev, option: Number(e.target.value) }))}
                bg="gray.700"
                border="none"
                color="white"
              >
                {market.options.map((option, index) => (
                  <option key={index} value={index}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel color="gray.300">Amount (USDC)</FormLabel>
              <NumberInput
                min={Number(market.minimumBet)}
                value={position.amount}
                onChange={(value) => setPosition(prev => ({ ...prev, amount: value }))}
              >
                <NumberInputField
                  bg="gray.700"
                  border="none"
                  color="white"
                  _focus={{ boxShadow: 'none' }}
                />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel color="gray.300">Odds</FormLabel>
              <NumberInput
                min={1}
                value={position.odds}
                onChange={(value) => setPosition(prev => ({ ...prev, odds: value }))}
              >
                <NumberInputField
                  bg="gray.700"
                  border="none"
                  color="white"
                  _focus={{ boxShadow: 'none' }}
                />
              </NumberInput>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isDisabled={!write}
            >
              Place Bet
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Container>
  );
}
