'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';

interface Comment {
  id: number;
  text: string;
  author: `0x${string}` | string;
  timestamp: number;
}

interface CommentsProps {
  contractAddress: `0x${string}`;
  contractABI: any;
  targetId: number;
  isEventComment: boolean;
}

export default function Comments({ contractAddress, contractABI, targetId, isEventComment }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { address } = useAccount();

  // Sample data - replace with actual contract interaction
  const sampleComments: Comment[] = [
    {
      id: 1,
      text: "Great match prediction!",
      author: "0x1234567890123456789012345678901234567890",
      timestamp: Date.now()
    },
    {
      id: 2,
      text: "I think the odds are too high",
      author: "0x8765432109876543210987654321098765432109",
      timestamp: Date.now() - 3600000
    }
  ];

  useEffect(() => {
    setComments(sampleComments);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !address) return;

    const comment: Comment = {
      id: comments.length + 1,
      text: newComment,
      author: address,
      timestamp: Date.now()
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Match Discussion</h2>
      
      <div className="space-y-4 mb-8">
        {comments.map((comment) => (
          <div 
            key={comment.id}
            className="bg-gradient-to-br from-black/50 to-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/10"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-blue-400 text-sm">{formatAddress(comment.author)}</span>
              <span className="text-gray-500 text-xs">
                {new Date(comment.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-200">{comment.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 bg-black/50 border border-blue-500/20 rounded-xl focus:border-blue-500/50 focus:outline-none text-white"
          rows={3}
        />
        <button
          type="submit"
          disabled={!address}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
        >
          {address ? 'Post Comment' : 'Connect Wallet to Comment'}
        </button>
      </form>
    </div>
  );
}
