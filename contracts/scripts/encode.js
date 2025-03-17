const { Interface } = require('@ethersproject/abi');
const { defaultAbiCoder } = require('@ethersproject/abi');

async function main() {
    const usdcAddress = "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582";
    const sportsBettingAddress = "0x3af1d3f1aEB5dD745F6e1F0EfBc557201fd408D0"; // This is the SportsBetting contract
    
    // Create interface with constructor
    const iface = new Interface(['constructor(address _usdc, address _sportsBetting)']);
    
    // Encode constructor arguments
    const encodedArgs = defaultAbiCoder.encode(['address', 'address'], [usdcAddress, sportsBettingAddress]);
    
    // Remove the 0x prefix as it's not needed for constructor args
    console.log("Constructor Arguments:", encodedArgs.slice(2));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
