'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Input,
  Text,
  VStack,
  HStack,
  Avatar,
  Divider,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaComment, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface Comment {
  id: string;
  author: string;
  authorAddress: string;
  text: string;
  timestamp: number;
}

interface CommentsDropdownProps {
  matchId: number;
}

export default function CommentsDropdown({ matchId }: CommentsDropdownProps) {
  const { isOpen, onToggle } = useDisclosure();
  const [commentText, setCommentText] = useState('');
  const { isConnected, address } = useAccount();
  const toast = useToast();

  // Mock comments data - in a real app, this would come from a database or blockchain
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'CryptoFan',
      authorAddress: '0x1234...5678',
      text: 'Lakers are going to win this one for sure!',
      timestamp: Date.now() - 3600000,
    },
    {
      id: '2',
      author: 'BlockchainBaller',
      authorAddress: '0xabcd...efgh',
      text: 'Celtics have been on fire lately, my money is on them.',
      timestamp: Date.now() - 1800000,
    },
  ]);

  const handleSubmitComment = () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to post comments',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!commentText.trim()) {
      toast({
        title: 'Empty comment',
        description: 'Please enter a comment',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // In a real app, this would be sent to a database or blockchain
    const newComment: Comment = {
      id: Date.now().toString(),
      author: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Anonymous',
      authorAddress: address || '0x0000',
      text: commentText,
      timestamp: Date.now(),
    };

    setComments([...comments, newComment]);
    setCommentText('');

    toast({
      title: 'Comment posted',
      description: 'Your comment has been posted successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Box mt={2}>
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<FaComment />}
        rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        onClick={onToggle}
        _hover={{ bg: 'blue.900' }}
      >
        Comments ({comments.length})
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <Box
          mt={2}
          p={4}
          bg="navy.900"
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.700"
        >
          {!isConnected ? (
            <Box mb={4} p={3} bg="blue.900" borderRadius="md">
              <Text mb={2} fontSize="sm">Connect your wallet to join the conversation</Text>
              <ConnectButton />
            </Box>
          ) : (
            <Flex mb={4}>
              <Input
                placeholder="Add your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                mr={2}
                bg="navy.800"
                borderColor="gray.600"
              />
              <Button colorScheme="blue" onClick={handleSubmitComment}>
                Post
              </Button>
            </Flex>
          )}

          <Divider mb={4} borderColor="gray.700" />

          <VStack spacing={4} align="stretch">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Box key={comment.id} p={3} bg="navy.800" borderRadius="md">
                  <HStack mb={2}>
                    <Avatar size="xs" name={comment.author} />
                    <Text fontWeight="bold" fontSize="sm">
                      {comment.author}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatTimestamp(comment.timestamp)}
                    </Text>
                  </HStack>
                  <Text fontSize="sm">{comment.text}</Text>
                </Box>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500" textAlign="center">
                No comments yet. Be the first to comment!
              </Text>
            )}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}
