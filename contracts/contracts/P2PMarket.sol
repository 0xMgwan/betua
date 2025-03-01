// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract P2PMarket is ReentrancyGuard, Ownable {
    IERC20 public usdc;
    
    struct Market {
        uint256 id;
        address creator;
        string question;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 totalLiquidity;
        bool settled;
        uint8 outcome;
        MarketType marketType;
        uint256 minimumBet;
        uint256[] options;  // For multiple choice markets
        mapping(uint256 => uint256) optionLiquidity; // option -> liquidity
        mapping(address => Position) positions;
    }

    struct Position {
        uint256 amount;
        uint256 option;
        uint256 entryPrice;
        bool settled;
    }

    enum MarketType {
        BINARY,          // Yes/No
        MULTIPLE_CHOICE, // Multiple options
        NUMERIC_RANGE    // Predict a number within range
    }

    struct MarketParams {
        string question;
        string description;
        uint256 startTime;
        uint256 endTime;
        MarketType marketType;
        uint256 minimumBet;
        uint256[] options;  // Empty for binary markets
        uint256 initialLiquidity;
    }

    mapping(uint256 => Market) public markets;
    uint256 public nextMarketId = 1;
    uint256 public platformFee = 25; // 0.25%

    event MarketCreated(
        uint256 indexed marketId,
        address indexed creator,
        string question,
        MarketType marketType
    );

    event PositionTaken(
        uint256 indexed marketId,
        address indexed trader,
        uint256 option,
        uint256 amount,
        uint256 entryPrice
    );

    event MarketSettled(
        uint256 indexed marketId,
        uint8 outcome
    );

    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }

    function createMarket(MarketParams memory params) external nonReentrant {
        require(params.startTime > block.timestamp, "Invalid start time");
        require(params.endTime > params.startTime, "Invalid end time");
        require(params.minimumBet >= 1e6, "Minimum bet too low"); // 1 USDC minimum
        require(params.initialLiquidity >= params.minimumBet * 10, "Insufficient initial liquidity");

        uint256 marketId = nextMarketId++;
        Market storage market = markets[marketId];
        
        market.id = marketId;
        market.creator = msg.sender;
        market.question = params.question;
        market.description = params.description;
        market.startTime = params.startTime;
        market.endTime = params.endTime;
        market.marketType = params.marketType;
        market.minimumBet = params.minimumBet;

        if (params.marketType == MarketType.MULTIPLE_CHOICE) {
            require(params.options.length >= 2, "Need at least 2 options");
            market.options = params.options;
        }

        // Transfer initial liquidity from creator
        require(
            usdc.transferFrom(msg.sender, address(this), params.initialLiquidity),
            "Failed to transfer initial liquidity"
        );
        
        market.totalLiquidity = params.initialLiquidity;

        emit MarketCreated(marketId, msg.sender, params.question, params.marketType);
    }

    function takePosition(
        uint256 marketId,
        uint256 option,
        uint256 amount
    ) external nonReentrant {
        Market storage market = markets[marketId];
        require(block.timestamp >= market.startTime, "Market not started");
        require(block.timestamp < market.endTime, "Market ended");
        require(!market.settled, "Market already settled");
        require(amount >= market.minimumBet, "Below minimum bet");

        if (market.marketType == MarketType.BINARY) {
            require(option <= 1, "Invalid option for binary market");
        } else if (market.marketType == MarketType.MULTIPLE_CHOICE) {
            require(option < market.options.length, "Invalid option");
        }

        // Calculate entry price based on current liquidity
        uint256 entryPrice = calculateEntryPrice(marketId, option, amount);
        
        // Transfer USDC from user
        require(
            usdc.transferFrom(msg.sender, address(this), amount),
            "Failed to transfer USDC"
        );

        // Update position
        market.positions[msg.sender] = Position({
            amount: amount,
            option: option,
            entryPrice: entryPrice,
            settled: false
        });

        market.totalLiquidity += amount;
        market.optionLiquidity[option] += amount;

        emit PositionTaken(marketId, msg.sender, option, amount, entryPrice);
    }

    function settleMarket(uint256 marketId, uint8 outcome) external {
        Market storage market = markets[marketId];
        require(msg.sender == market.creator || msg.sender == owner(), "Not authorized");
        require(block.timestamp >= market.endTime, "Market not ended");
        require(!market.settled, "Already settled");

        if (market.marketType == MarketType.BINARY) {
            require(outcome <= 1, "Invalid outcome for binary market");
        } else if (market.marketType == MarketType.MULTIPLE_CHOICE) {
            require(outcome < market.options.length, "Invalid outcome");
        }

        market.settled = true;
        market.outcome = outcome;

        emit MarketSettled(marketId, outcome);
    }

    function claimRewards(uint256 marketId) external nonReentrant {
        Market storage market = markets[marketId];
        require(market.settled, "Market not settled");
        
        Position storage position = market.positions[msg.sender];
        require(!position.settled, "Already claimed");
        require(position.amount > 0, "No position");

        uint256 reward = calculateReward(marketId, msg.sender);
        position.settled = true;

        if (reward > 0) {
            require(
                usdc.transfer(msg.sender, reward),
                "Failed to transfer reward"
            );
        }
    }

    function calculateEntryPrice(
        uint256 marketId,
        uint256 option,
        uint256 amount
    ) public view returns (uint256) {
        Market storage market = markets[marketId];
        uint256 currentLiquidity = market.optionLiquidity[option];
        
        // Simple constant product formula
        // Price increases as more liquidity is added to one side
        return (currentLiquidity * 1e18) / (market.totalLiquidity + amount);
    }

    function calculateReward(
        uint256 marketId,
        address user
    ) public view returns (uint256) {
        Market storage market = markets[marketId];
        Position storage position = market.positions[user];

        if (position.option == market.outcome) {
            // Winner gets proportional share of losing side minus platform fee
            uint256 totalWinningPool = market.optionLiquidity[market.outcome];
            uint256 shareOfPool = (position.amount * 1e18) / totalWinningPool;
            uint256 reward = (market.totalLiquidity * shareOfPool) / 1e18;
            uint256 fee = (reward * platformFee) / 10000;
            return reward - fee;
        }
        return 0;
    }

    function getMarketInfo(uint256 marketId) external view returns (
        address creator,
        string memory question,
        string memory description,
        uint256 startTime,
        uint256 endTime,
        uint256 totalLiquidity,
        bool settled,
        uint8 outcome,
        MarketType marketType,
        uint256[] memory options
    ) {
        Market storage market = markets[marketId];
        return (
            market.creator,
            market.question,
            market.description,
            market.startTime,
            market.endTime,
            market.totalLiquidity,
            market.settled,
            market.outcome,
            market.marketType,
            market.options
        );
    }

    function getUserPosition(uint256 marketId, address user) external view returns (
        uint256 amount,
        uint256 option,
        uint256 entryPrice,
        bool settled
    ) {
        Position storage position = markets[marketId].positions[user];
        return (
            position.amount,
            position.option,
            position.entryPrice,
            position.settled
        );
    }
}
