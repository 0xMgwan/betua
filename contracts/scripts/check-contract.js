const hre = require("hardhat");

async function main() {
  const contractAddress = "0x8fD222cd4E8eeBB2d1357A62DBF9aC753A83AE25";
  
  console.log("Checking contract at:", contractAddress);
  
  // Get contract instance
  const BetUA = await hre.ethers.getContractFactory("BetUA");
  const contract = BetUA.attach(contractAddress);
  
  try {
    // Try to call some view functions
    const events = await contract.getEvents();
    console.log("Events:", events);
  } catch (error) {
    console.log("Error getting events:", error.message);
  }
  
  try {
    // Get USDC address
    const usdc = await contract.usdc();
    console.log("USDC Address:", usdc);
  } catch (error) {
    console.log("Error getting USDC address:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
