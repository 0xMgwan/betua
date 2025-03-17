import { ethers } from "hardhat";

async function main() {
  const SportsBetting = await ethers.getContractFactory("SportsBetting");
  
  // Token addresses for Polygon Amoy testnet
  const supportedTokens = [
    {
      address: "0xf4bfc32c9b60c9dfc43060ac168690e536646cc2", // USDC on Amoy
      symbol: "USDC",
      decimals: 6,
      priceFeed: "0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0" // USDC/USD price feed
    },
    {
      address: "0x0000000000000000000000000000000000001010", // Native POL/MATIC on Amoy
      symbol: "POL",
      decimals: 18,
      priceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A" // MATIC/USD price feed
    }
  ];

  console.log("Deploying SportsBetting contract...");
  const sportsBetting = await SportsBetting.deploy();
  await sportsBetting.deployed();
  console.log("SportsBetting deployed to:", sportsBetting.address);

  // Add supported tokens
  console.log("Adding supported tokens...");
  for (const token of supportedTokens) {
    console.log(`Adding ${token.symbol}...`);
    await sportsBetting.addSupportedToken(
      token.address,
      token.symbol,
      token.decimals,
      token.priceFeed
    );
  }

  console.log("All tokens added successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
