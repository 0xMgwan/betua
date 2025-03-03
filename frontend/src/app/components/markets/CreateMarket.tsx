'use client';

import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
  HStack,
  IconButton,
  Badge,
  Card,
  CardBody,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { parseUnits } from 'viem';
import P2PMarketV2ABI from '@/contracts/abis/P2PMarketV2.json';

enum MarketType {
  BINARY = 0,
  MULTIPLE_CHOICE = 1,
  NUMERIC_RANGE = 2,
  ORACLE_FEED = 3
}

interface CreateMarketFormData {
  question: string;
  description: string;
  startTime: string;
  endTime: string;
  marketType: MarketType;
  minimumBet: string;
  options: string[];
  oracle: string;
  initialLiquidity: string;
}

export default function CreateMarket() {
  const toast = useToast();
  const [formData, setFormData] = useState<CreateMarketFormData>({
    question: '',
    description: '',
    startTime: '',
    endTime: '',
    marketType: MarketType.BINARY,
    minimumBet: '1',
    options: [],
    oracle: '',
    initialLiquidity: '100'
  });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_P2P_MARKET_ADDRESS as `0x${string}`,
    abi: P2PMarketV2ABI,
    functionName: 'createMarket',
    args: [{
      question: formData.question,
      description: formData.description,
      startTime: new Date(formData.startTime).getTime() / 1000,
      endTime: new Date(formData.endTime).getTime() / 1000,
      marketType: formData.marketType,
      minimumBet: parseUnits(formData.minimumBet, 6), // USDC has 6 decimals
      options: formData.options.map(opt => Number(opt)),
      oracle: formData.oracle as `0x${string}`,
      initialLiquidity: parseUnits(formData.initialLiquidity, 6)
    }]
  });

  const { write } = useContractWrite(config);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!write) return;

    try {
      await write();
      toast({
        title: 'Market Created',
        description: 'Your prediction market has been created successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create market. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const updateOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Card bg="gray.800" border="1px" borderColor="gray.700">
        <CardBody>
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Create Prediction Market
            </Text>
            
            <Divider />

            <FormControl isRequired>
              <FormLabel color="gray.300">Question</FormLabel>
              <Input
                placeholder="What will be the outcome of..."
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                bg="gray.700"
                border="none"
                color="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.300">Description</FormLabel>
              <Textarea
                placeholder="Provide detailed information about the market..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                bg="gray.700"
                border="none"
                color="white"
              />
            </FormControl>

            <HStack width="full" spacing={4}>
              <FormControl isRequired>
                <FormLabel color="gray.300">Start Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  bg="gray.700"
                  border="none"
                  color="white"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300">End Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  bg="gray.700"
                  border="none"
                  color="white"
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel color="gray.300">Market Type</FormLabel>
              <Select
                value={formData.marketType}
                onChange={(e) => setFormData(prev => ({ ...prev, marketType: Number(e.target.value) }))}
                bg="gray.700"
                border="none"
                color="white"
              >
                <option value={MarketType.BINARY}>Binary (Yes/No)</option>
                <option value={MarketType.MULTIPLE_CHOICE}>Multiple Choice</option>
                <option value={MarketType.NUMERIC_RANGE}>Numeric Range</option>
                <option value={MarketType.ORACLE_FEED}>Oracle Feed</option>
              </Select>
            </FormControl>

            {formData.marketType === MarketType.MULTIPLE_CHOICE && (
              <FormControl>
                <FormLabel color="gray.300">
                  Options
                  <IconButton
                    aria-label="Add option"
                    icon={<AddIcon />}
                    onClick={addOption}
                    size="sm"
                    ml={2}
                    colorScheme="blue"
                  />
                </FormLabel>
                <VStack spacing={2}>
                  {formData.options.map((option, index) => (
                    <HStack key={index} width="full">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        bg="gray.700"
                        border="none"
                        color="white"
                      />
                      <IconButton
                        aria-label="Remove option"
                        icon={<DeleteIcon />}
                        onClick={() => removeOption(index)}
                        colorScheme="red"
                        variant="ghost"
                      />
                    </HStack>
                  ))}
                </VStack>
              </FormControl>
            )}

            <HStack width="full" spacing={4}>
              <FormControl isRequired>
                <FormLabel color="gray.300">Minimum Bet (USDC)</FormLabel>
                <NumberInput
                  value={formData.minimumBet}
                  onChange={(value) => setFormData(prev => ({ ...prev, minimumBet: value }))}
                  min={0}
                >
                  <NumberInputField bg="gray.700" border="none" color="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300">Initial Liquidity (USDC)</FormLabel>
                <NumberInput
                  value={formData.initialLiquidity}
                  onChange={(value) => setFormData(prev => ({ ...prev, initialLiquidity: value }))}
                  min={0}
                >
                  <NumberInputField bg="gray.700" border="none" color="white" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>

            {formData.marketType === MarketType.ORACLE_FEED && (
              <FormControl isRequired>
                <FormLabel color="gray.300">Oracle Address</FormLabel>
                <Input
                  placeholder="0x..."
                  value={formData.oracle}
                  onChange={(e) => setFormData(prev => ({ ...prev, oracle: e.target.value }))}
                  bg="gray.700"
                  border="none"
                  color="white"
                />
              </FormControl>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isDisabled={!write}
            >
              Create Market
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
}
