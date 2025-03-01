// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SportsBetting is ReentrancyGuard, Ownable {
    IERC20 public usdc;

    struct Sport {
        uint256 id;
        string name;
        string category;
        bool active;
    }

    struct League {
        uint256 id;
        uint256 sportId;
        string name;
        string region;
        bool active;
    }

    struct GameMatch {
        uint256 id;
        uint256 leagueId;
        string homeTeam;
        string awayTeam;
        uint256 startTime;
        uint256 endTime;
        bool settled;
        uint8 result; // 1 = home, 2 = draw, 3 = away
        MatchStatus status;
    }

    struct Market {
        uint256 id;
        uint256 matchId;
        MarketType marketType;
        uint256[] outcomes;
        mapping(uint256 => uint256) odds; // outcome -> odds (in basis points)
        mapping(uint256 => uint256) totalStaked;
        bool settled;
        uint256 winningOutcome;
    }

    struct Bet {
        uint256 id;
        address bettor;
        uint256 marketId;
        uint256 outcome;
        uint256 amount;
        uint256 potentialPayout;
        bool settled;
        bool won;
    }

    enum MarketType {
        MATCH_WINNER,      // 1X2
        OVER_UNDER,       // Total goals/points
        HANDICAP,         // Spread
        CORRECT_SCORE,    // Exact score
        PLAYER_PROPS,     // Player statistics
        FUTURES          // Tournament winners, etc.
    }

    enum MatchStatus {
        SCHEDULED,
        LIVE,
        FINISHED,
        CANCELLED,
        POSTPONED
    }

    // State variables
    mapping(uint256 => Sport) public sports;
    mapping(uint256 => League) public leagues;
    mapping(uint256 => GameMatch) public matches;
    mapping(uint256 => Market) public markets;
    mapping(uint256 => Bet) public bets;
    mapping(address => uint256[]) public userBets;
    
    // Counters
    uint256 public nextSportId = 1;
    uint256 public nextLeagueId = 1;
    uint256 public nextMatchId = 1;
    uint256 public nextMarketId = 1;
    uint256 public nextBetId = 1;

    // Platform settings
    uint256 public minBet = 1e6; // 1 USDC
    uint256 public maxBet = 1000e6; // 1000 USDC
    uint256 public platformFee = 25; // 0.25%

    // Events
    event SportAdded(
        uint256 indexed id,
        string name,
        string category
    );

    event LeagueAdded(
        uint256 indexed id,
        uint256 indexed sportId,
        string name,
        string region
    );

    event MatchCreated(
        uint256 indexed id,
        uint256 indexed leagueId,
        string homeTeam,
        string awayTeam,
        uint256 startTime
    );

    event MarketCreated(
        uint256 indexed id,
        uint256 indexed matchId,
        MarketType marketType
    );

    event BetPlaced(
        uint256 indexed id,
        address indexed bettor,
        uint256 indexed marketId,
        uint256 outcome,
        uint256 amount,
        uint256 potentialPayout
    );

    event MatchUpdated(
        uint256 indexed id,
        MatchStatus status,
        uint8 result
    );

    event MarketSettled(
        uint256 indexed id,
        uint256 winningOutcome
    );

    event BetSettled(
        uint256 indexed id,
        bool won,
        uint256 payout
    );

    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }

    function addSport(string memory name, string memory category) external onlyOwner {
        uint256 sportId = nextSportId++;
        
        sports[sportId] = Sport({
            id: sportId,
            name: name,
            category: category,
            active: true
        });

        emit SportAdded(sportId, name, category);
    }

    function addLeague(
        uint256 sportId,
        string memory name,
        string memory region
    ) external onlyOwner {
        require(sports[sportId].active, "Sport not found");
        uint256 leagueId = nextLeagueId++;
        leagues[leagueId] = League({
            id: leagueId,
            sportId: sportId,
            name: name,
            region: region,
            active: true
        });
        emit LeagueAdded(leagueId, sportId, name, region);
    }

    function createMatch(
        uint256 leagueId,
        string memory homeTeam,
        string memory awayTeam,
        uint256 startTime,
        uint256 endTime
    ) external onlyOwner {
        require(leagues[leagueId].active, "League not found");
        require(startTime > block.timestamp, "Invalid start time");
        require(endTime > startTime, "Invalid end time");

        uint256 matchId = nextMatchId++;
        matches[matchId] = GameMatch({
            id: matchId,
            leagueId: leagueId,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            startTime: startTime,
            endTime: endTime,
            settled: false,
            result: 0,
            status: MatchStatus.SCHEDULED
        });

        emit MatchCreated(matchId, leagueId, homeTeam, awayTeam, startTime);
    }

    function createMarket(
        uint256 matchId,
        MarketType marketType,
        uint256[] memory outcomes,
        uint256[] memory initialOdds
    ) external onlyOwner {
        require(outcomes.length == initialOdds.length, "Invalid odds array");
        GameMatch storage gameMatch = matches[matchId];
        require(!gameMatch.settled, "Match already settled");

        uint256 marketId = nextMarketId++;
        Market storage market = markets[marketId];
        market.id = marketId;
        market.matchId = matchId;
        market.marketType = marketType;
        market.outcomes = outcomes;
        
        for (uint256 i = 0; i < outcomes.length; i++) {
            market.odds[outcomes[i]] = initialOdds[i];
        }

        emit MarketCreated(marketId, matchId, marketType);
    }

    function placeBet(
        uint256 marketId,
        uint256 outcome,
        uint256 amount
    ) external nonReentrant {
        Market storage market = markets[marketId];
        GameMatch storage gameMatch = matches[market.matchId];
        
        require(!market.settled, "Market already settled");
        require(block.timestamp < gameMatch.startTime, "Match already started");
        require(amount >= minBet && amount <= maxBet, "Invalid bet amount");
        
        bool validOutcome = false;
        for (uint256 i = 0; i < market.outcomes.length; i++) {
            if (market.outcomes[i] == outcome) {
                validOutcome = true;
                break;
            }
        }
        require(validOutcome, "Invalid outcome");

        uint256 odds = market.odds[outcome];
        uint256 potentialPayout = (amount * odds) / 10000;

        require(
            usdc.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        uint256 betId = nextBetId++;
        bets[betId] = Bet({
            id: betId,
            bettor: msg.sender,
            marketId: marketId,
            outcome: outcome,
            amount: amount,
            potentialPayout: potentialPayout,
            settled: false,
            won: false
        });

        userBets[msg.sender].push(betId);
        market.totalStaked[outcome] += amount;

        emit BetPlaced(betId, msg.sender, marketId, outcome, amount, potentialPayout);
    }

    function updateMatchStatus(
        uint256 matchId,
        MatchStatus status,
        uint8 result
    ) external onlyOwner {
        GameMatch storage gameMatch = matches[matchId];
        require(!gameMatch.settled, "Match already settled");
        
        if (status == MatchStatus.FINISHED) {
            require(result > 0 && result <= 3, "Invalid result");
            gameMatch.settled = true;
            gameMatch.result = result;
        }
        
        gameMatch.status = status;
        emit MatchUpdated(matchId, status, result);
    }

    function settleMarket(
        uint256 marketId,
        uint256 winningOutcome
    ) external onlyOwner {
        Market storage market = markets[marketId];
        require(!market.settled, "Market already settled");
        require(matches[market.matchId].settled, "Match not settled");

        market.settled = true;
        market.winningOutcome = winningOutcome;

        emit MarketSettled(marketId, winningOutcome);
    }

    function claimBet(uint256 betId) external nonReentrant {
        Bet storage bet = bets[betId];
        require(msg.sender == bet.bettor, "Not bet owner");
        require(!bet.settled, "Bet already settled");

        Market storage market = markets[bet.marketId];
        require(market.settled, "Market not settled");

        bet.settled = true;
        if (bet.outcome == market.winningOutcome) {
            bet.won = true;
            uint256 payout = bet.potentialPayout;
            uint256 fee = (payout * platformFee) / 10000;
            uint256 finalPayout = payout - fee;

            require(
                usdc.transfer(msg.sender, finalPayout),
                "Transfer failed"
            );

            emit BetSettled(betId, true, finalPayout);
        } else {
            emit BetSettled(betId, false, 0);
        }
    }

    function getMatchDetails(uint256 matchId) external view returns (
        string memory homeTeam,
        string memory awayTeam,
        uint256 startTime,
        uint256 endTime,
        bool settled,
        uint8 result,
        MatchStatus status
    ) {
        GameMatch storage gameMatch = matches[matchId];
        return (
            gameMatch.homeTeam,
            gameMatch.awayTeam,
            gameMatch.startTime,
            gameMatch.endTime,
            gameMatch.settled,
            gameMatch.result,
            gameMatch.status
        );
    }

    function getUserBets(address user) external view returns (uint256[] memory) {
        return userBets[user];
    }

    function getMarketOdds(uint256 marketId, uint256 outcome) external view returns (uint256) {
        return markets[marketId].odds[outcome];
    }
}
