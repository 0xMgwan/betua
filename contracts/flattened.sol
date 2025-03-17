// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface SportsBetting {
    function placeBet(uint256 marketId, uint256 outcome, uint256 amount) external;
    function getMatchDetails(uint256 matchId) external view returns (
        string memory homeTeam,
        string memory awayTeam,
        uint256 startTime,
        uint256 endTime,
        bool settled,
        uint8 result,
        uint8 status
    );
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

abstract contract Ownable is Context {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor() {
        _transferOwnership(_msgSender());
    }
    modifier onlyOwner() {
        _checkOwner();
        _;
    }
    function owner() public view virtual returns (address) {
        return _owner;
    }
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;
    constructor() {
        _status = _NOT_ENTERED;
    }
    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

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
    event StrategyCreated(uint256 indexed id, string name, StrategyType strategyType);
    event UserStrategyCreated(uint256 indexed id, address indexed user, uint256 indexed strategyId);
    event StrategyExecuted(uint256 indexed userStrategyId, uint256 indexed matchId, uint256 amount);

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

    function createUserStrategy(
        uint256 strategyId,
        uint256 stake,
        bool autoExecute,
        uint256 duration
    ) external {
        Strategy storage strategy = strategies[strategyId];
        require(strategy.active, "Strategy not active");
        require(stake >= strategy.minStake, "Stake too low");
        require(stake <= strategy.maxStake, "Stake too high");

        uint256 userStrategyId = nextUserStrategyId++;
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + duration;

        userStrategies[userStrategyId] = UserStrategy({
            id: userStrategyId,
            user: msg.sender,
            strategyId: strategyId,
            stake: stake,
            autoExecute: autoExecute,
            startTime: startTime,
            endTime: endTime,
            totalProfit: 0,
            active: true
        });

        userStrategyIds[msg.sender].push(userStrategyId);

        emit UserStrategyCreated(userStrategyId, msg.sender, strategyId);
    }

    function executeStrategy(uint256 userStrategyId, uint256 matchId) external nonReentrant {
        UserStrategy storage userStrategy = userStrategies[userStrategyId];
        require(userStrategy.active, "Strategy not active");
        require(
            userStrategy.user == msg.sender || userStrategy.autoExecute,
            "Not authorized"
        );
        require(block.timestamp >= userStrategy.startTime, "Strategy not started");
        require(block.timestamp <= userStrategy.endTime, "Strategy expired");

        Strategy storage strategy = strategies[userStrategy.strategyId];
        require(strategy.active, "Base strategy not active");

        // Get match details
        (
            string memory homeTeam,
            string memory awayTeam,
            uint256 startTime,
            ,
            bool settled,
            ,
            
        ) = sportsBetting.getMatchDetails(matchId);

        require(!settled, "Match already settled");
        require(startTime > block.timestamp, "Match already started");

        // Approve USDC transfer
        require(usdc.approve(address(sportsBetting), userStrategy.stake), "Approve failed");

        // Place bet using the strategy
        uint256 outcome = _determineOutcome(strategy.strategyType, matchId);
        sportsBetting.placeBet(matchId, outcome, userStrategy.stake);

        emit StrategyExecuted(userStrategyId, matchId, userStrategy.stake);
    }

    function _determineOutcome(StrategyType strategyType, uint256 matchId) internal view returns (uint256) {
        // This is where we would implement different betting strategies
        // For now, we'll just return 1 (home team wins) as a placeholder
        return 1;
    }

    function getUserStrategies(address user) external view returns (uint256[] memory) {
        return userStrategyIds[user];
    }

    function updateStrategy(
        uint256 strategyId,
        string memory name,
        string memory description,
        uint256 minStake,
        uint256 maxStake,
        uint256 targetOdds,
        uint256 stopLoss,
        uint256 takeProfit,
        bool active
    ) external onlyOwner {
        Strategy storage strategy = strategies[strategyId];
        
        strategy.name = name;
        strategy.description = description;
        strategy.minStake = minStake;
        strategy.maxStake = maxStake;
        strategy.targetOdds = targetOdds;
        strategy.stopLoss = stopLoss;
        strategy.takeProfit = takeProfit;
        strategy.active = active;
    }

    function updateUserStrategy(
        uint256 userStrategyId,
        uint256 stake,
        bool autoExecute,
        bool active
    ) external {
        UserStrategy storage userStrategy = userStrategies[userStrategyId];
        require(userStrategy.user == msg.sender, "Not authorized");
        
        Strategy storage strategy = strategies[userStrategy.strategyId];
        require(stake >= strategy.minStake, "Stake too low");
        require(stake <= strategy.maxStake, "Stake too high");

        userStrategy.stake = stake;
        userStrategy.autoExecute = autoExecute;
        userStrategy.active = active;
    }
}
