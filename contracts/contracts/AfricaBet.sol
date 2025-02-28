// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract AfricaBet is ReentrancyGuard, Ownable {
    struct Bet {
        uint256 id;
        address bettor;
        uint256 amount;
        uint256 odds;
        uint256 eventId;
        uint8 prediction;
        bool settled;
        bool won;
    }

    struct Event {
        uint256 id;
        string name;
        uint256 startTime;
        uint256 endTime;
        bool settled;
        uint8 outcome;
    }

    struct Comment {
        uint256 id;
        address commenter;
        string content;
        uint256 timestamp;
        uint256 targetId;
        bool isEventComment;
        uint256[] replies;
        uint256 likes;
        uint256 dislikes;
        bool isDeleted;
        bool isModerated;
    }

    struct UserProfile {
        int256 reputation;
        bool isModerator;
        uint256 totalLikesReceived;
        uint256 totalCommentsPosted;
        mapping(uint256 => bool) likedComments;
        mapping(uint256 => bool) dislikedComments;
    }

    IERC20 public usdc;
    uint256 public minBet = 1e6; // 1 USDC
    uint256 public maxBet = 1000e6; // 1000 USDC
    uint256 public platformFee = 25; // 0.25%
    
    mapping(uint256 => Event) public events;
    mapping(uint256 => Bet) public bets;
    mapping(address => uint256[]) public userBets;
    
    // New mappings for social features
    mapping(uint256 => Comment) public comments;
    mapping(uint256 => uint256[]) public eventComments; // eventId => commentIds
    mapping(uint256 => uint256[]) public betComments; // betId => commentIds
    uint256 public nextCommentId = 1;
    
    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public moderators;
    
    int256 public constant REPUTATION_FOR_COMMENT = 1;
    int256 public constant REPUTATION_FOR_LIKE = 2;
    int256 public constant REPUTATION_FOR_DISLIKE = -1;
    int256 public constant MIN_REPUTATION_TO_COMMENT = -10;
    
    uint256 public nextEventId = 1;
    uint256 public nextBetId = 1;

    event EventCreated(uint256 indexed eventId, string name, uint256 startTime, uint256 endTime);
    event BetPlaced(uint256 indexed betId, address indexed bettor, uint256 indexed eventId, uint256 amount, uint256 odds);
    event BetSettled(uint256 indexed betId, bool won, uint256 payout);
    event EventSettled(uint256 indexed eventId, uint8 outcome);
    // New events for social features
    event CommentAdded(uint256 indexed commentId, address indexed commenter, uint256 indexed targetId, bool isEventComment);
    event ReplyAdded(uint256 indexed parentCommentId, uint256 indexed replyId, address indexed commenter);
    event CommentModerated(uint256 indexed commentId, address indexed moderator);
    event CommentDeleted(uint256 indexed commentId, address indexed deleter);
    event CommentLiked(uint256 indexed commentId, address indexed liker);
    event CommentDisliked(uint256 indexed commentId, address indexed disliker);
    event ModeratorAdded(address indexed moderator);
    event ModeratorRemoved(address indexed moderator);

    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }

    function createEvent(
        string memory _name,
        uint256 _startTime,
        uint256 _endTime
    ) external onlyOwner {
        require(_startTime > block.timestamp, "Invalid start time");
        require(_endTime > _startTime, "Invalid end time");

        events[nextEventId] = Event({
            id: nextEventId,
            name: _name,
            startTime: _startTime,
            endTime: _endTime,
            settled: false,
            outcome: 0
        });

        emit EventCreated(nextEventId, _name, _startTime, _endTime);
        nextEventId++;
    }

    function placeBet(
        uint256 _eventId,
        uint8 _prediction,
        uint256 _amount,
        uint256 _odds
    ) external nonReentrant {
        require(_amount >= minBet, "Bet too small");
        require(_amount <= maxBet, "Bet too large");
        require(events[_eventId].startTime > block.timestamp, "Event started");
        require(!events[_eventId].settled, "Event settled");
        require(_prediction <= 2, "Invalid prediction"); // 0: Draw, 1: Team A, 2: Team B

        usdc.transferFrom(msg.sender, address(this), _amount);

        bets[nextBetId] = Bet({
            id: nextBetId,
            bettor: msg.sender,
            amount: _amount,
            odds: _odds,
            eventId: _eventId,
            prediction: _prediction,
            settled: false,
            won: false
        });

        userBets[msg.sender].push(nextBetId);
        
        emit BetPlaced(nextBetId, msg.sender, _eventId, _amount, _odds);
        nextBetId++;
    }

    function settleEvent(uint256 _eventId, uint8 _outcome) external onlyOwner {
        require(!events[_eventId].settled, "Already settled");
        require(_outcome <= 2, "Invalid outcome");
        require(block.timestamp >= events[_eventId].endTime, "Event not finished");

        events[_eventId].settled = true;
        events[_eventId].outcome = _outcome;

        emit EventSettled(_eventId, _outcome);
    }

    function settleBet(uint256 _betId) external nonReentrant {
        Bet storage bet = bets[_betId];
        require(!bet.settled, "Already settled");
        require(events[bet.eventId].settled, "Event not settled");

        bet.settled = true;
        if (bet.prediction == events[bet.eventId].outcome) {
            bet.won = true;
            uint256 payout = calculatePayout(bet.amount, bet.odds);
            usdc.transfer(bet.bettor, payout);
            emit BetSettled(_betId, true, payout);
        } else {
            emit BetSettled(_betId, false, 0);
        }
    }

    function calculatePayout(uint256 _amount, uint256 _odds) internal view returns (uint256) {
        uint256 grossPayout = (_amount * _odds) / 100;
        uint256 fee = (grossPayout * platformFee) / 10000;
        return grossPayout - fee;
    }

    function getUserBets(address _user) external view returns (uint256[] memory) {
        return userBets[_user];
    }

    function setMinBet(uint256 _minBet) external onlyOwner {
        minBet = _minBet;
    }

    function setMaxBet(uint256 _maxBet) external onlyOwner {
        maxBet = _maxBet;
    }

    function setPlatformFee(uint256 _fee) external onlyOwner {
        require(_fee <= 1000, "Fee too high"); // Max 10%
        platformFee = _fee;
    }

    function withdrawFees(address _to) external onlyOwner {
        uint256 balance = usdc.balanceOf(address(this));
        usdc.transfer(_to, balance);
    }

    // New functions for social features
    function addComment(uint256 _targetId, string memory _content, bool _isEventComment) 
        external 
    {
        require(bytes(_content).length > 0 && bytes(_content).length <= 500, "Invalid comment length");
        
        if (_isEventComment) {
            require(events[_targetId].id != 0, "Event does not exist");
        } else {
            require(bets[_targetId].id != 0, "Bet does not exist");
        }

        comments[nextCommentId] = Comment({
            id: nextCommentId,
            commenter: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            targetId: _targetId,
            isEventComment: _isEventComment,
            replies: new uint256[](0),
            likes: 0,
            dislikes: 0,
            isDeleted: false,
            isModerated: false
        });

        if (_isEventComment) {
            eventComments[_targetId].push(nextCommentId);
        } else {
            betComments[_targetId].push(nextCommentId);
        }

        // Update user profile
        userProfiles[msg.sender].totalCommentsPosted++;
        userProfiles[msg.sender].reputation += REPUTATION_FOR_COMMENT;

        emit CommentAdded(nextCommentId, msg.sender, _targetId, _isEventComment);
        nextCommentId++;
    }

    function addReply(uint256 _parentCommentId, string memory _content) external {
        require(comments[_parentCommentId].id != 0, "Parent comment does not exist");
        require(bytes(_content).length > 0 && bytes(_content).length <= 500, "Invalid comment length");

        comments[nextCommentId] = Comment({
            id: nextCommentId,
            commenter: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            targetId: comments[_parentCommentId].targetId,
            isEventComment: comments[_parentCommentId].isEventComment,
            replies: new uint256[](0),
            likes: 0,
            dislikes: 0,
            isDeleted: false,
            isModerated: false
        });

        comments[_parentCommentId].replies.push(nextCommentId);

        emit ReplyAdded(_parentCommentId, nextCommentId, msg.sender);
        nextCommentId++;
    }

    function getEventComments(uint256 _eventId) external view returns (uint256[] memory) {
        return eventComments[_eventId];
    }

    function getBetComments(uint256 _betId) external view returns (uint256[] memory) {
        return betComments[_betId];
    }

    function getCommentReplies(uint256 _commentId) external view returns (uint256[] memory) {
        return comments[_commentId].replies;
    }

    // Moderation functions
    function addModerator(address _moderator) external onlyOwner {
        require(!moderators[_moderator], "Already a moderator");
        moderators[_moderator] = true;
        userProfiles[_moderator].isModerator = true;
        emit ModeratorAdded(_moderator);
    }

    function removeModerator(address _moderator) external onlyOwner {
        require(moderators[_moderator], "Not a moderator");
        moderators[_moderator] = false;
        userProfiles[_moderator].isModerator = false;
        emit ModeratorRemoved(_moderator);
    }

    function moderateComment(uint256 _commentId) external {
        require(moderators[msg.sender], "Not a moderator");
        require(comments[_commentId].id != 0, "Comment does not exist");
        require(!comments[_commentId].isModerated, "Already moderated");
        
        comments[_commentId].isModerated = true;
        emit CommentModerated(_commentId, msg.sender);
    }

    // Enhanced comment functions
    modifier hasEnoughReputation() {
        require(
            int256(userProfiles[msg.sender].reputation) >= MIN_REPUTATION_TO_COMMENT,
            "Insufficient reputation"
        );
        _;
    }

    function addCommentEnhanced(uint256 _targetId, string memory _content, bool _isEventComment) 
        external 
        hasEnoughReputation 
    {
        require(bytes(_content).length > 0 && bytes(_content).length <= 500, "Invalid comment length");
        
        if (_isEventComment) {
            require(events[_targetId].id != 0, "Event does not exist");
        } else {
            require(bets[_targetId].id != 0, "Bet does not exist");
        }

        comments[nextCommentId] = Comment({
            id: nextCommentId,
            commenter: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            targetId: _targetId,
            isEventComment: _isEventComment,
            replies: new uint256[](0),
            likes: 0,
            dislikes: 0,
            isDeleted: false,
            isModerated: false
        });

        if (_isEventComment) {
            eventComments[_targetId].push(nextCommentId);
        } else {
            betComments[_targetId].push(nextCommentId);
        }

        // Update user profile
        userProfiles[msg.sender].totalCommentsPosted++;
        userProfiles[msg.sender].reputation += REPUTATION_FOR_COMMENT;

        emit CommentAdded(nextCommentId, msg.sender, _targetId, _isEventComment);
        nextCommentId++;
    }

    function deleteComment(uint256 _commentId) external {
        Comment storage comment = comments[_commentId];
        require(comment.id != 0, "Comment does not exist");
        require(
            msg.sender == comment.commenter || moderators[msg.sender],
            "Not authorized"
        );
        require(!comment.isDeleted, "Already deleted");

        comment.isDeleted = true;
        emit CommentDeleted(_commentId, msg.sender);
    }

    function likeComment(uint256 _commentId) external {
        Comment storage comment = comments[_commentId];
        require(comment.id != 0, "Comment does not exist");
        require(!comment.isDeleted, "Comment deleted");
        require(!userProfiles[msg.sender].likedComments[_commentId], "Already liked");
        
        if (userProfiles[msg.sender].dislikedComments[_commentId]) {
            comment.dislikes--;
            userProfiles[msg.sender].dislikedComments[_commentId] = false;
            userProfiles[comment.commenter].reputation -= REPUTATION_FOR_DISLIKE;
        }

        comment.likes++;
        userProfiles[msg.sender].likedComments[_commentId] = true;
        userProfiles[comment.commenter].reputation += REPUTATION_FOR_LIKE;
        userProfiles[comment.commenter].totalLikesReceived++;

        emit CommentLiked(_commentId, msg.sender);
    }

    function dislikeComment(uint256 _commentId) external {
        Comment storage comment = comments[_commentId];
        require(comment.id != 0, "Comment does not exist");
        require(!comment.isDeleted, "Comment deleted");
        require(!userProfiles[msg.sender].dislikedComments[_commentId], "Already disliked");
        
        if (userProfiles[msg.sender].likedComments[_commentId]) {
            comment.likes--;
            userProfiles[msg.sender].likedComments[_commentId] = false;
            userProfiles[comment.commenter].reputation -= REPUTATION_FOR_LIKE;
            userProfiles[comment.commenter].totalLikesReceived--;
        }

        comment.dislikes++;
        userProfiles[msg.sender].dislikedComments[_commentId] = true;
        userProfiles[comment.commenter].reputation += REPUTATION_FOR_DISLIKE;

        emit CommentDisliked(_commentId, msg.sender);
    }

    // View functions
    function getUserProfile(address _user) external view returns (
        int256 reputation,
        bool isModerator,
        uint256 totalLikesReceived,
        uint256 totalCommentsPosted
    ) {
        UserProfile storage profile = userProfiles[_user];
        return (
            profile.reputation,
            profile.isModerator,
            profile.totalLikesReceived,
            profile.totalCommentsPosted
        );
    }

    function getCommentDetails(uint256 _commentId) external view returns (
        address commenter,
        string memory content,
        uint256 timestamp,
        uint256 likes,
        uint256 dislikes,
        bool isDeleted,
        bool isModerated
    ) {
        Comment storage comment = comments[_commentId];
        return (
            comment.commenter,
            comment.content,
            comment.timestamp,
            comment.likes,
            comment.dislikes,
            comment.isDeleted,
            comment.isModerated
        );
    }
}
