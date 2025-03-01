// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract UserAuth is Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    struct User {
        string email;           // Email address (hashed)
        address walletAddress;  // Ethereum wallet address
        bool isEmailVerified;   // Email verification status
        uint256 createdAt;     // Registration timestamp
        string username;        // Username
        UserType authType;      // Authentication type
    }

    enum UserType {
        EMAIL,      // Traditional email authentication
        WALLET,     // Web3 wallet authentication
        HYBRID      // Both email and wallet linked
    }

    // Mappings
    mapping(address => User) public usersByWallet;
    mapping(bytes32 => User) public usersByEmail; // email hash => User
    mapping(string => bool) public usernameExists;
    
    // Events
    event UserRegistered(
        address indexed walletAddress,
        string username,
        UserType authType
    );
    
    event EmailVerified(
        address indexed walletAddress,
        string username
    );
    
    event WalletLinked(
        address indexed walletAddress,
        string username
    );

    // Modifiers
    modifier onlyRegisteredUser(address _wallet) {
        require(usersByWallet[_wallet].createdAt > 0, "User not registered");
        _;
    }

    // Registration with email
    function registerWithEmail(
        string memory _email,
        string memory _username,
        bytes memory _signature
    ) external {
        bytes32 emailHash = keccak256(abi.encodePacked(_email));
        require(usersByEmail[emailHash].createdAt == 0, "Email already registered");
        require(!usernameExists[_username], "Username taken");
        
        // Verify email ownership through signature
        bytes32 messageHash = keccak256(abi.encodePacked(_email, _username));
        address signer = messageHash.toEthSignedMessageHash().recover(_signature);
        require(signer == owner(), "Invalid signature");

        User memory newUser = User({
            email: _email,
            walletAddress: address(0),
            isEmailVerified: false,
            createdAt: block.timestamp,
            username: _username,
            authType: UserType.EMAIL
        });

        usersByEmail[emailHash] = newUser;
        usernameExists[_username] = true;

        emit UserRegistered(address(0), _username, UserType.EMAIL);
    }

    // Registration with wallet
    function registerWithWallet(string memory _username) external {
        require(usersByWallet[msg.sender].createdAt == 0, "Wallet already registered");
        require(!usernameExists[_username], "Username taken");

        User memory newUser = User({
            email: "",
            walletAddress: msg.sender,
            isEmailVerified: false,
            createdAt: block.timestamp,
            username: _username,
            authType: UserType.WALLET
        });

        usersByWallet[msg.sender] = newUser;
        usernameExists[_username] = true;

        emit UserRegistered(msg.sender, _username, UserType.WALLET);
    }

    // Link wallet to email account
    function linkWalletToEmail(
        string memory _email,
        bytes memory _signature
    ) external {
        bytes32 emailHash = keccak256(abi.encodePacked(_email));
        require(usersByEmail[emailHash].createdAt > 0, "Email not registered");
        require(usersByEmail[emailHash].walletAddress == address(0), "Email already linked to wallet");
        require(usersByWallet[msg.sender].createdAt == 0, "Wallet already registered");

        // Verify email ownership
        bytes32 messageHash = keccak256(abi.encodePacked(_email, msg.sender));
        address signer = messageHash.toEthSignedMessageHash().recover(_signature);
        require(signer == owner(), "Invalid signature");

        User storage user = usersByEmail[emailHash];
        user.walletAddress = msg.sender;
        user.authType = UserType.HYBRID;
        usersByWallet[msg.sender] = user;

        emit WalletLinked(msg.sender, user.username);
    }

    // Link email to wallet account
    function linkEmailToWallet(
        string memory _email,
        bytes memory _signature
    ) external onlyRegisteredUser(msg.sender) {
        bytes32 emailHash = keccak256(abi.encodePacked(_email));
        require(usersByEmail[emailHash].createdAt == 0, "Email already registered");
        
        // Verify email ownership
        bytes32 messageHash = keccak256(abi.encodePacked(_email, msg.sender));
        address signer = messageHash.toEthSignedMessageHash().recover(_signature);
        require(signer == owner(), "Invalid signature");

        User storage user = usersByWallet[msg.sender];
        user.email = _email;
        user.authType = UserType.HYBRID;
        usersByEmail[emailHash] = user;

        emit EmailVerified(msg.sender, user.username);
    }

    // Verify email
    function verifyEmail(
        string memory _email,
        bytes memory _signature
    ) external {
        bytes32 emailHash = keccak256(abi.encodePacked(_email));
        require(usersByEmail[emailHash].createdAt > 0, "Email not registered");
        
        User storage user = usersByEmail[emailHash];
        require(!user.isEmailVerified, "Email already verified");

        // Verify email ownership
        bytes32 messageHash = keccak256(abi.encodePacked(_email));
        address signer = messageHash.toEthSignedMessageHash().recover(_signature);
        require(signer == owner(), "Invalid signature");

        user.isEmailVerified = true;
        emit EmailVerified(user.walletAddress, user.username);
    }

    // Check if username exists
    function isUsernameTaken(string memory _username) external view returns (bool) {
        return usernameExists[_username];
    }

    // Get user by wallet
    function getUserByWallet(address _wallet) external view returns (
        string memory username,
        string memory email,
        bool isEmailVerified,
        uint256 createdAt,
        UserType authType
    ) {
        User memory user = usersByWallet[_wallet];
        return (
            user.username,
            user.email,
            user.isEmailVerified,
            user.createdAt,
            user.authType
        );
    }

    // Get user by email
    function getUserByEmail(string memory _email) external view returns (
        string memory username,
        address walletAddress,
        bool isEmailVerified,
        uint256 createdAt,
        UserType authType
    ) {
        bytes32 emailHash = keccak256(abi.encodePacked(_email));
        User memory user = usersByEmail[emailHash];
        return (
            user.username,
            user.walletAddress,
            user.isEmailVerified,
            user.createdAt,
            user.authType
        );
    }
}
