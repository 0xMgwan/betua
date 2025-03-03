// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SportsBetting.sol";

contract BettingStrategy is ReentrancyGuard, Ownable {
    IERC20 public usdc;
    SportsBetting public sportsBetting;

    struct Strategy {
        uint256 id;
        string name;
        string description;
        StrategyType strategyType;
        uint256 minStake;
        uint256 maxStake;
        uint256 targetOdds;
        uint256 stopLoss;
        uint256 takeProfit;
        bool active;
        uint256 successRate;
        uint256 totalBets;
        uint256 winningBets;
    }

    struct UserStrategy {
        uint256 id;
        address user;
        uint256 strategyId;
        uint256 stake;
        bool autoExecute;
        uint256 startTime;
        uint256 endTime;
        uint256 totalProfit;
        bool active;
    }

    enum StrategyType {
        VALUE_BETTING,
        ARBITRAGE,
        MARTINGALE,
        KELLY_CRITERION,
        FIXED_PROFIT,
        AI_RECOMMENDED
    }

    // Mappings
    mapping(uint256 => Strategy) public strategies;
    mapping(uint256 => UserStrategy) public userStrategies;
    mapping(address => uint256[]) public userStrategyIds;
    
    // Counters
    uint256 public nextStrategyId = 1;
    uint256 public nextUserStrategyId = 1;

    // Events
    event StrategyCreated(
        uint256 indexed id,
        string name,
        StrategyType strategyType
    );

    event UserStrategyCreated(
        uint256 indexed id,
        address indexed user,
        uint256 indexed strategyId,
        uint256 stake
    );

    event StrategyExecuted(
        uint256 indexed userStrategyId,
        uint256 indexed matchId,
        uint256 amount,
        bool success
    );

    constructor(address _usdc, address _sportsBetting) {
        usdc = IERC20(_usdc);
        sportsBetting = SportsBetting(_sportsBetting);
    }

    function createStrategy(
        string memory name,
        string memory description,
        StrategyType strategyType,
        uint256 minStake,
        uint256 maxStake,
        uint256 targetOdds,
        uint256 stopLoss,
        uint256 takeProfit
    ) external onlyOwner {
        uint256 strategyId = nextStrategyId++;
        
        strategies[strategyId] = Strategy({
            id: strategyId,
            name: name,
            description: description,
            strategyType: strategyType,
            minStake: minStake,
            maxStake: maxStake,
            targetOdds: targetOdds,
            stopLoss: stopLoss,
            takeProfit: takeProfit,
            active: true,
            successRate: 0,
            totalBets: 0,
            winningBets: 0
        });

        emit StrategyCreated(strategyId, name, strategyType);
    }

    function subscribeToStrategy(
        uint256 strategyId,
        uint256 stake,
        bool autoExecute,
        uint256 duration
    ) external nonReentrant {
        Strategy storage strategy = strategies[strategyId];
        require(strategy.active, "Strategy not active");
        require(stake >= strategy.minStake, "Stake too low");
        require(stake <= strategy.maxStake, "Stake too high");

        uint256 userStrategyId = nextUserStrategyId++;
        uint256 endTime = block.timestamp + duration;

        userStrategies[userStrategyId] = UserStrategy({
            id: userStrategyId,
            user: msg.sender,
            strategyId: strategyId,
            stake: stake,
            autoExecute: autoExecute,
            startTime: block.timestamp,
            endTime: endTime,
            totalProfit: 0,
            active: true
        });

        userStrategyIds[msg.sender].push(userStrategyId);

        // Transfer initial stake to contract
        require(
            usdc.transferFrom(msg.sender, address(this), stake),
            "Transfer failed"
        );

        emit UserStrategyCreated(userStrategyId, msg.sender, strategyId, stake);
    }

    function executeStrategy(uint256 userStrategyId, uint256 matchId) external nonReentrant {
        UserStrategy storage userStrategy = userStrategies[userStrategyId];
        require(userStrategy.active, "Strategy not active");
        require(
            userStrategy.user == msg.sender || userStrategy.autoExecute,
            "Not authorized"
        );
        require(block.timestamp <= userStrategy.endTime, "Strategy expired");

        Strategy storage strategy = strategies[userStrategy.strategyId];
        
        // Get match details and validate according to strategy
        (
            string memory homeTeam,
            string memory awayTeam,
            uint256 startTime,
            uint256 endTime,
            bool settled,
            uint8 result,
            SportsBetting.MatchStatus status
        ) = sportsBetting.getMatchDetails(matchId);

        require(startTime > block.timestamp, "Match already started");
        require(!settled, "Match already settled");

        // Execute bet based on strategy type
        bool success = executeBetForStrategy(
            userStrategy,
            strategy,
            matchId,
            homeTeam,
            awayTeam
        );

        emit StrategyExecuted(userStrategyId, matchId, userStrategy.stake, success);
    }

    function executeBetForStrategy(
        UserStrategy storage userStrategy,
        Strategy storage strategy,
        uint256 matchId,
        string memory homeTeam,
        string memory awayTeam
    ) internal returns (bool) {
        uint256 recommendedOutcome;
        uint256 recommendedStake;
        
        if (strategy.strategyType == StrategyType.VALUE_BETTING) {
            (recommendedOutcome, recommendedStake) = getValueBettingRecommendation(
                matchId,
                strategy
            );
        } else if (strategy.strategyType == StrategyType.KELLY_CRITERION) {
            (recommendedOutcome, recommendedStake) = getKellyCriterionRecommendation(
                matchId,
                strategy,
                userStrategy.stake
            );
        } else if (strategy.strategyType == StrategyType.AI_RECOMMENDED) {
            (recommendedOutcome, recommendedStake) = getAIRecommendation(
                matchId,
                strategy,
                homeTeam,
                awayTeam
            );
        }

        // Place bet using SportsBetting contract
        require(
            usdc.approve(address(sportsBetting), recommendedStake),
            "Approval failed"
        );

        try sportsBetting.placeBet(matchId, recommendedOutcome, recommendedStake) {
            strategy.totalBets += 1;
            return true;
        } catch {
            return false;
        }
    }

    function getValueBettingRecommendation(
        uint256 matchId,
        Strategy storage strategy
    ) internal view returns (uint256 outcome, uint256 stake) {
        // Implement value betting logic
        // Compare actual odds with expected odds
        // Return recommended outcome and stake
        return (1, strategy.minStake); // Placeholder
    }

    function getKellyCriterionRecommendation(
        uint256 matchId,
        Strategy storage strategy,
        uint256 bankroll
    ) internal view returns (uint256 outcome, uint256 stake) {
        // Implement Kelly Criterion formula
        // f* = (bp - q) / b
        // where:
        // b = odds - 1
        // p = probability of winning
        // q = probability of losing (1 - p)
        return (1, strategy.minStake); // Placeholder
    }

    function getAIRecommendation(
        uint256 matchId,
        Strategy storage strategy,
        string memory homeTeam,
        string memory awayTeam
    ) internal view returns (uint256 outcome, uint256 stake) {
        // This would integrate with external AI service
        // For now, return placeholder values
        return (1, strategy.minStake);
    }

    function updateStrategyStats(uint256 strategyId, bool won) external {
        Strategy storage strategy = strategies[strategyId];
        strategy.totalBets += 1;
        if (won) {
            strategy.winningBets += 1;
        }
        strategy.successRate = (strategy.winningBets * 10000) / strategy.totalBets;
    }

    function getUserStrategies(address user) external view returns (uint256[] memory) {
        return userStrategyIds[user];
    }

    function withdrawFromStrategy(uint256 userStrategyId) external nonReentrant {
        UserStrategy storage userStrategy = userStrategies[userStrategyId];
        require(userStrategy.user == msg.sender, "Not strategy owner");
        require(userStrategy.active, "Strategy not active");

        userStrategy.active = false;
        require(
            usdc.transfer(msg.sender, userStrategy.stake),
            "Transfer failed"
        );
    }
}
