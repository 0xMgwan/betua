// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract P2PMarketV2 is ReentrancyGuard, Ownable {
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
        uint256[] options;
        address oracle;
        bool disputed;
        uint256 disputeEndTime;
        uint256 totalStaked;
        mapping(uint256 => uint256) optionLiquidity;
        mapping(address => Position) positions;
        mapping(address => Dispute) disputes;
    }

    struct Position {
        uint256 amount;
        uint256 option;
        uint256 entryPrice;
        bool settled;
    }

    struct Dispute {
        uint256 amount;
        uint8 claimedOutcome;
        string evidence;
        uint256 timestamp;
        bool resolved;
    }

    enum MarketType {
        BINARY,
        MULTIPLE_CHOICE,
        NUMERIC_RANGE,
        ORACLE_FEED    // New type for Chainlink oracle feeds
    }

    struct MarketParams {
        string question;
        string description;
        uint256 startTime;
        uint256 endTime;
        MarketType marketType;
        uint256 minimumBet;
        uint256[] options;
        address oracle;        // Optional Chainlink oracle address
        uint256 initialLiquidity;
    }

    mapping(uint256 => Market) public markets;
    mapping(address => bool) public verifiedOracles;
    
    uint256 public nextMarketId = 1;
    uint256 public platformFee = 25; // 0.25%
    uint256 public constant DISPUTE_PERIOD = 3 days;
    uint256 public constant DISPUTE_STAKE = 100e6; // 100 USDC
    uint256 public constant MIN_DISPUTE_EVIDENCE_LENGTH = 20;

    event MarketCreated(
        uint256 indexed marketId,
        address indexed creator,
        string question,
        MarketType marketType,
        address oracle
    );

    event MarketSettled(
        uint256 indexed marketId,
        uint8 outcome
    );

    event DisputeRaised(
        uint256 indexed marketId,
        address indexed disputer,
        uint8 claimedOutcome,
        string evidence
    );

    event DisputeResolved(
        uint256 indexed marketId,
        uint8 finalOutcome,
        address[] rewardedDisputers
    );

    event OracleAdded(address indexed oracle, string description);
    event OracleRemoved(address indexed oracle);

    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }

    function addOracle(address oracle, string calldata description) external onlyOwner {
        require(oracle != address(0), "Invalid oracle address");
        verifiedOracles[oracle] = true;
        emit OracleAdded(oracle, description);
    }

    function removeOracle(address oracle) external onlyOwner {
        require(verifiedOracles[oracle], "Oracle not found");
        verifiedOracles[oracle] = false;
        emit OracleRemoved(oracle);
    }

    function createMarket(MarketParams memory params) external nonReentrant {
        require(params.startTime > block.timestamp, "Invalid start time");
        require(params.endTime > params.startTime, "Invalid end time");
        require(params.minimumBet >= 1e6, "Minimum bet too low");
        require(params.initialLiquidity >= params.minimumBet * 10, "Insufficient initial liquidity");

        if (params.marketType == MarketType.ORACLE_FEED) {
            require(verifiedOracles[params.oracle], "Invalid oracle");
        }

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
        market.oracle = params.oracle;

        if (params.marketType == MarketType.MULTIPLE_CHOICE) {
            require(params.options.length >= 2, "Need at least 2 options");
            market.options = params.options;
        }

        require(
            usdc.transferFrom(msg.sender, address(this), params.initialLiquidity),
            "Failed to transfer initial liquidity"
        );
        
        market.totalLiquidity = params.initialLiquidity;

        emit MarketCreated(marketId, msg.sender, params.question, params.marketType, params.oracle);
    }

    function getOraclePrice(address oracle) internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(oracle);
        (, int256 price,,,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid oracle price");
        return uint256(price);
    }

    function determineOutcomeFromPrice(uint256 price, Market storage market) internal view returns (uint8) {
        // For binary markets, we'll use the price to determine if it's above or below the first option
        if (market.marketType == MarketType.BINARY) {
            return price >= market.options[0] ? 1 : 0;
        }
        
        // For multiple choice, find the closest option
        uint256 closestOption = 0;
        uint256 minDiff = type(uint256).max;
        
        for (uint256 i = 0; i < market.options.length; i++) {
            uint256 diff = price > market.options[i] ? 
                price - market.options[i] : 
                market.options[i] - price;
                
            if (diff < minDiff) {
                minDiff = diff;
                closestOption = i;
            }
        }
        
        return uint8(closestOption);
    }

    function settleMarket(uint256 marketId, uint8 outcome) external {
        Market storage market = markets[marketId];
        require(msg.sender == market.creator || msg.sender == owner(), "Not authorized");
        require(block.timestamp >= market.endTime, "Market not ended");
        require(!market.settled, "Already settled");

        if (market.marketType == MarketType.ORACLE_FEED) {
            uint256 oraclePrice = getOraclePrice(market.oracle);
            outcome = determineOutcomeFromPrice(oraclePrice, market);
        }

        market.settled = true;
        market.outcome = outcome;
        market.disputeEndTime = block.timestamp + DISPUTE_PERIOD;

        emit MarketSettled(marketId, outcome);
    }

    function raiseDispute(
        uint256 marketId,
        uint8 claimedOutcome,
        string calldata evidence
    ) external nonReentrant {
        Market storage market = markets[marketId];
        require(market.settled, "Market not settled");
        require(block.timestamp <= market.disputeEndTime, "Dispute period ended");
        require(bytes(evidence).length >= MIN_DISPUTE_EVIDENCE_LENGTH, "Evidence too short");
        require(
            usdc.transferFrom(msg.sender, address(this), DISPUTE_STAKE),
            "Failed to transfer dispute stake"
        );

        market.disputed = true;
        market.disputes[msg.sender] = Dispute({
            amount: DISPUTE_STAKE,
            claimedOutcome: claimedOutcome,
            evidence: evidence,
            timestamp: block.timestamp,
            resolved: false
        });

        emit DisputeRaised(marketId, msg.sender, claimedOutcome, evidence);
    }

    function resolveDispute(uint256 marketId, uint8 finalOutcome, address[] calldata rewardedDisputers) external onlyOwner {
        Market storage market = markets[marketId];
        require(market.disputed, "No active dispute");
        require(!market.disputes[rewardedDisputers[0]].resolved, "Dispute already resolved");

        market.outcome = finalOutcome;
        uint256 totalReward = DISPUTE_STAKE * rewardedDisputers.length;

        for (uint256 i = 0; i < rewardedDisputers.length; i++) {
            address disputer = rewardedDisputers[i];
            require(market.disputes[disputer].claimedOutcome == finalOutcome, "Invalid rewarded disputer");
            market.disputes[disputer].resolved = true;
            require(usdc.transfer(disputer, DISPUTE_STAKE), "Reward transfer failed");
        }

        emit DisputeResolved(marketId, finalOutcome, rewardedDisputers);
    }
}
