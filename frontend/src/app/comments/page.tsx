'use client';

import { useState } from 'react';
import { Container, Heading, Box, VStack, Text } from '@chakra-ui/react';
import Logo from '../components/Logo';
import { WalletButton } from '../components/WalletButton';

export default function CommentsPage() {
  const [newComment, setNewComment] = useState('');

  const mockComments = [
    {
      id: 1,
      user: 'Alex',
      match: 'Arsenal vs Chelsea',
      comment: 'Arsenal looking strong at home, expecting a solid win here.',
      timestamp: '2 hours ago',
      likes: 12
    },
    {
      id: 2,
      user: 'Sarah',
      match: 'Liverpool vs Man City',
      comment: 'This will be a close one, but City\'s defense has been incredible lately.',
      timestamp: '3 hours ago',
      likes: 8
    },
    {
      id: 3,
      user: 'Mike',
      match: 'Man United vs Tottenham',
      comment: 'United\'s midfield needs to step up if they want to win this one.',
      timestamp: '5 hours ago',
      likes: 15
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setNewComment('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <Container maxW="container.xl" py={8}>
        <Heading size="lg" mb={6}>Community</Heading>
        <Box>
          <VStack spacing={4} align="stretch">
            <Text>Community content will go here</Text>
          </VStack>
        </Box>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Community Discussion</h1>
            <p className="text-gray-400">Join the conversation about upcoming matches</p>
          </div>

          <div className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 mb-8">
            <form onSubmit={handleSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full bg-black/30 rounded-lg p-4 text-white placeholder-gray-500 border border-blue-500/10 focus:border-blue-500/50 focus:outline-none resize-none mb-4"
                rows={3}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white hover:from-blue-400 hover:to-blue-500 transition-all"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {mockComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{comment.user}</h3>
                    <p className="text-sm text-blue-400">{comment.match}</p>
                  </div>
                  <span className="text-sm text-gray-400">{comment.timestamp}</span>
                </div>
                <p className="text-gray-300 mb-4">{comment.comment}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-gray-400 hover:text-blue-400 transition-colors">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
