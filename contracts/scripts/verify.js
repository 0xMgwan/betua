const hre = require("hardhat");

async function main() {
    const contractAddress = "0x3af1d3f1aEB5dD745F6e1F0EfBc557201fd408D0";
    const usdcAddress = "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582";

    console.log("Verifying contract...");
    console.log("Contract address:", contractAddress);
    console.log("USDC address:", usdcAddress);

    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            contract: "contracts/BettingStrategy.sol:BettingStrategy",
            constructorArguments: [usdcAddress],
        });
        console.log("Verification successful!");
    } catch (e) {
        console.error("Verification failed:", e);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
