require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

console.log("Environment variables loaded:", Object.keys(process.env));
console.log("AMOY_RPC_URL present:", !!process.env.AMOY_RPC_URL);
console.log("PRIVATE_KEY present:", !!process.env.PRIVATE_KEY);

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

console.log("Private key length:", PRIVATE_KEY.length);
console.log("First 4 chars:", PRIVATE_KEY.substring(0, 4));

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    amoy: {
      url: process.env.AMOY_RPC_URL || "https://polygon-amoy.g.alchemy.com/v2/demo",
      accounts: [PRIVATE_KEY],
      chainId: 80002  // Polygon Amoy chainId
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/demo",
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  }
};
