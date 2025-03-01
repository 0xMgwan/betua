require('dotenv').config();

console.log('\nChecking .env file configuration:');
console.log('--------------------------------');

// Check AMOY_RPC_URL
const amoyRpcUrl = process.env.AMOY_RPC_URL;
console.log('AMOY_RPC_URL:', amoyRpcUrl ? 
    `✓ Found (${amoyRpcUrl.substring(0, 30)}...)` : 
    '✗ Missing');

// Check PRIVATE_KEY
const privateKey = process.env.PRIVATE_KEY;
console.log('PRIVATE_KEY:', privateKey ? 
    `✓ Found (length: ${privateKey.length}, starts with: ${privateKey.substring(0, 4)}...)` : 
    '✗ Missing');
if (privateKey) {
    console.log('  - Length check:', privateKey.length === 64 ? '✓ Correct (64 chars)' : `✗ Wrong (${privateKey.length} chars)`);
    console.log('  - Prefix check:', !privateKey.startsWith('0x') ? '✓ No 0x prefix' : '✗ Has 0x prefix');
    console.log('  - Format check:', /^[0-9a-fA-F]{64}$/.test(privateKey) ? '✓ Valid hex format' : '✗ Invalid hex format');
}

// Check POLYGONSCAN_API_KEY
const polygonscanKey = process.env.POLYGONSCAN_API_KEY;
console.log('POLYGONSCAN_API_KEY:', polygonscanKey ? 
    `✓ Found (${polygonscanKey.substring(0, 6)}...)` : 
    '✗ Missing');

console.log('\nRaw .env file content:');
console.log('--------------------------------');
const fs = require('fs');
const envContent = fs.readFileSync('.env', 'utf8');
console.log(envContent);
