const hre = require("hardhat");

async function main() {
  // Polygon Amoy USDC address (we'll use a mock USDC for testing)
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.deployed();
  console.log("MockUSDC deployed to:", mockUSDC.address);

  console.log("Deploying P2PMarketV2 contract...");
  const P2PMarket = await hre.ethers.getContractFactory("P2PMarketV2");
  const p2pMarket = await P2PMarket.deploy(mockUSDC.address);

  await p2pMarket.deployed();

  console.log("P2PMarketV2 deployed to:", p2pMarket.address);
  console.log("Waiting for block confirmations...");
  
  // Wait for 6 block confirmations
  await p2pMarket.deployTransaction.wait(6);
  
  // Verify the contracts
  console.log("Verifying contracts on Polygonscan...");
  
  // Verify MockUSDC
  await hre.run("verify:verify", {
    address: mockUSDC.address,
    constructorArguments: [],
  });
  
  // Verify P2PMarketV2
  await hre.run("verify:verify", {
    address: p2pMarket.address,
    constructorArguments: [mockUSDC.address],
  });

  console.log("Contracts verified successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
