import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Input,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { parseUnits } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import sportsBettingABI from '@/contracts/abis/SportsBetting.json';
import usdcAbi from '@/contracts/abis/USDC.json';
import TokenSelector from '../TokenSelector';

interface BetSlipProps {
  bets: {
    matchId: number;
    marketId: number;
    outcome: number;
    odds: number;
    homeTeam: string;
    awayTeam: string;
    marketType: string;
  }[];
  onRemoveBet: (marketId: number) => void;
  onClearSlip: () => void;
}

const tokens = [
  {
    symbol: 'USDC',
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`,
    decimals: 6,
    icon: '/tokens/usdc.svg',
  },
  {
    symbol: 'POL',
    address: process.env.NEXT_PUBLIC_POL_ADDRESS as `0x${string}`,
    decimals: 18,
    icon: '/tokens/pol.svg',
  },
];

const BetSlip: React.FC<BetSlipProps> = ({ bets, onRemoveBet, onClearSlip }) => {
  const [stakes, setStakes] = useState<{ [key: string]: string }>({});
  const [needsApproval, setNeedsApproval] = useState(true);
  const [selectedToken, setSelectedToken] = useState(tokens[0]); // Default to USDC
  const { address } = useAccount();
  const toast = useToast();

  const { data: balance } = useBalance({
    address,
    token: selectedToken.address,
  });

  const totalStake = Object.values(stakes).reduce(
    (sum, stake) => sum + (parseFloat(stake) || 0),
    0
  );
  
  // Convert bets to selectedMatches format for compatibility
  const selectedMatches = bets.map(bet => ({
    id: bet.marketId.toString(),
    homeTeam: bet.homeTeam,
    awayTeam: bet.awayTeam,
    selectedTeam: bet.outcome === 1 ? 'home' : 'away'
  }));

  const { config: approvalConfig } = usePrepareContractWrite({
    address: selectedToken.address,
    abi: usdcAbi,
    functionName: 'approve',
    args: [
      process.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS as `0x${string}`,
      parseUnits(totalStake.toString() || '0', selectedToken.decimals),
    ],
    enabled: parseFloat(totalStake.toString()) > 0 && needsApproval && !!address,
  });

  const { config: betConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_SPORTS_BETTING_ADDRESS as `0x${string}`,
    abi: sportsBettingABI.abi,
    functionName: 'placeBet',
    args: [
      selectedMatches.map((match) => ({
        matchId: match.id,
        prediction: match.selectedTeam === 'home' ? 1 : 2,
        stake: parseUnits(stakes[match.id] || '0', selectedToken.decimals),
      })),
      selectedToken.address,
    ],
    enabled: !needsApproval && totalStake > 0 && !!address,
  });

  const { write: approve } = useContractWrite({
    ...approvalConfig,
    onSuccess: () => {
      setNeedsApproval(false);
      toast({
        title: 'Approval Successful',
        description: 'You can now place your bet',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { write: placeBet } = useContractWrite({
    ...betConfig,
    onSuccess: () => {
      toast({
        title: 'Bet Placed Successfully',
        description: 'Your bet has been placed',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClearSlip();
    },
  });

  const handleStakeChange = (matchId: string, value: string) => {
    setStakes((prev) => ({ ...prev, [matchId]: value }));
  };

  const handleTokenSelect = (token: any) => {
    setSelectedToken(token);
    setNeedsApproval(true);
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Bet Slip
      </Text>
      <TokenSelector
        tokens={tokens}
        selectedToken={selectedToken}
        onSelect={handleTokenSelect}
      />
      <Divider my={4} />
      <VStack spacing={4} align="stretch">
        {selectedMatches.map((match) => (
          <Box key={match.id} p={4} borderWidth={1} borderRadius="md">
            <Text fontWeight="bold">
              {match.homeTeam} vs {match.awayTeam}
            </Text>
            <Text>Selected: {match.selectedTeam === 'home' ? match.homeTeam : match.awayTeam}</Text>
            <Input
              type="number"
              placeholder="Enter stake"
              value={stakes[match.id] || ''}
              onChange={(e) => handleStakeChange(match.id, e.target.value)}
              mt={2}
            />
          </Box>
        ))}
      </VStack>
      <Box mt={4}>
        <Text>Total Stake: {totalStake} {selectedToken.symbol}</Text>
        <Text>Balance: {balance?.formatted} {selectedToken.symbol}</Text>
      </Box>
      <Button
        colorScheme="blue"
        width="100%"
        mt={4}
        onClick={() => (needsApproval ? approve?.() : placeBet?.())}
        isDisabled={!approve && !placeBet}
      >
        {needsApproval ? 'Approve' : 'Place Bet'}
      </Button>
    </Box>
  );
};

export default BetSlip;
