export const CONTRACT_ABI = [
  // Events
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "name": "EventCreated",
    "type": "event"
  },
  // Comments
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_targetId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_content",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "_isEventComment",
        "type": "bool"
      }
    ],
    "name": "addComment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_commentId",
        "type": "uint256"
      }
    ],
    "name": "likeComment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_commentId",
        "type": "uint256"
      }
    ],
    "name": "dislikeComment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_commentId",
        "type": "uint256"
      }
    ],
    "name": "getCommentDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "commenter",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "likes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "dislikes",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isDeleted",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isModerated",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserProfile",
    "outputs": [
      {
        "internalType": "int256",
        "name": "reputation",
        "type": "int256"
      },
      {
        "internalType": "bool",
        "name": "isModerator",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "totalLikesReceived",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalCommentsPosted",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
