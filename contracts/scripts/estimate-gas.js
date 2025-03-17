const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Estimating gas costs for deployment from:", deployer.address);

  // Get current gas price
  const gasPrice = await hre.ethers.provider.getGasPrice();
  console.log("Current gas price:", hre.ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");

  // Estimate MockUSDC deployment
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const mockUSDCDeploy = await MockUSDC.getDeployTransaction();
  const mockUSDCGas = await deployer.estimateGas(mockUSDCDeploy);
  console.log("MockUSDC estimated gas:", mockUSDCGas.toString());
  
  // Estimate P2PMarketV2 deployment
  const mockUSDCAddress = "0x0000000000000000000000000000000000000001"; // Dummy address for estimation
  const P2PMarket = await hre.ethers.getContractFactory("P2PMarketV2");
  const p2pMarketDeploy = await P2PMarket.getDeployTransaction(mockUSDCAddress);
  const p2pMarketGas = await deployer.estimateGas(p2pMarketDeploy);
  console.log("P2PMarketV2 estimated gas:", p2pMarketGas.toString());

  // Calculate total gas cost
  const totalGas = mockUSDCGas.add(p2pMarketGas);
  const totalCostWei = totalGas.mul(gasPrice);
  const totalCostMatic = hre.ethers.utils.formatEther(totalCostWei);

  console.log("\nEstimated deployment costs:");
  console.log("Total gas needed:", totalGas.toString());
  console.log("Total cost in MATIC:", totalCostMatic);
  console.log("\nNote: This is an estimate. Actual gas costs may vary based on network conditions.");
  console.log("Additional costs to consider:");
  console.log("1. Contract verification on Polygonscan");
  console.log("2. Initial token minting and transfers");
  console.log("3. Setting up initial market parameters");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
