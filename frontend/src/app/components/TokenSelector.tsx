import React from 'react';
import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { Token } from '@/types';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token;
  onSelect: (token: Token) => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  tokens,
  selectedToken,
  onSelect,
}) => {
  return (
    <VStack spacing={2} align="stretch">
      {tokens.map((token) => (
        <Button
          key={token.symbol}
          onClick={() => onSelect(token)}
          variant={selectedToken.symbol === token.symbol ? 'solid' : 'outline'}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          width="100%"
          p={2}
        >
          <Image
            src={token.icon}
            alt={token.symbol}
            boxSize="24px"
            mr={2}
          />
          <Box>
            <Text color="black" fontWeight="bold">
              {token.symbol}
            </Text>
          </Box>
        </Button>
      ))}
    </VStack>
  );
};

export default TokenSelector;
