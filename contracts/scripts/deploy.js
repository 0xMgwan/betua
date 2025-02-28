const hre = require("hardhat");

async function main() {
  // For Sepolia testnet, we'll use the USDC test token address
  const USDC_ADDRESS = "0x8267cF9254734C6Eb452a7bb9AAF97B392258b21"; // Sepolia USDC test token

  const AfricaBet = await hre.ethers.getContractFactory("AfricaBet");
  const africaBet = await AfricaBet.deploy(USDC_ADDRESS);

  await africaBet.deployed();

  console.log("AfricaBet deployed to:", africaBet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
