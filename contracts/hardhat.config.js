require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

console.log("Private key length:", PRIVATE_KEY.length);
console.log("First 4 chars:", PRIVATE_KEY.substring(0, 4));

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY],
      chainId: 80001
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/demo",
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  }
};
