const hre = require("hardhat");

async function main() {
  // Mumbai USDC address
  const USDC_ADDRESS = "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23";

  console.log("Deploying BetUA contract...");
  const BetUA = await hre.ethers.getContractFactory("BetUA");
  const betUA = await BetUA.deploy(USDC_ADDRESS);

  await betUA.deployed();

  console.log("BetUA deployed to:", betUA.address);
  console.log("Waiting for block confirmations...");
  
  // Wait for 6 block confirmations
  await betUA.deployTransaction.wait(6);
  
  // Verify the contract
  console.log("Verifying contract on Polygonscan...");
  await hre.run("verify:verify", {
    address: betUA.address,
    constructorArguments: [USDC_ADDRESS],
  });

  console.log("Contract verified successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
