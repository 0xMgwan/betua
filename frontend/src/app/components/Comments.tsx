import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';

interface Comment {
  id: number;
  commenter: string;
  content: string;
  timestamp: number;
  likes: number;
  dislikes: number;
  isDeleted: boolean;
  isModerated: boolean;
}

interface CommentsProps {
  contractAddress: string;
  contractABI: any;
  targetId: number;
  isEventComment: boolean;
}

export default function Comments({ contractAddress, contractABI, targetId, isEventComment }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { address } = useAccount();

  // Get user profile
  const { data: userProfile } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getUserProfile',
    args: [address],
  });

  // Add comment
  const { write: addComment } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'addComment',
  });

  // Like comment
  const { write: likeComment } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'likeComment',
  });

  // Dislike comment
  const { write: dislikeComment } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'dislikeComment',
  });

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    addComment({ args: [targetId, newComment, isEventComment] });
    setNewComment('');
  };

  const handleLike = (commentId: number) => {
    likeComment({ args: [commentId] });
  };

  const handleDislike = (commentId: number) => {
    dislikeComment({ args: [commentId] });
  };

  return (
    <div className="space-y-4 mt-4">
      {/* Comment Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmitComment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">
                  {ethers.utils.getAddress(comment.commenter).substring(0, 6)}...
                  {ethers.utils.getAddress(comment.commenter).substring(38)}
                </p>
                <p className="mt-1">{comment.content}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                >
                  <span>👍</span>
                  <span>{comment.likes}</span>
                </button>
                <button
                  onClick={() => handleDislike(comment.id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                >
                  <span>👎</span>
                  <span>{comment.dislikes}</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(comment.timestamp * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
