[https://betua-two.vercel.app/](https://betuav2.vercel.app/)
# BetUA - AI-Powered Sports Betting Platform

BetUA is a modern sports betting platform that combines AI-powered predictions with blockchain technology to provide a transparent and engaging betting experience for all sports and prediction markets globally.

## Features

- **Wallet Integration**: Secure wallet connection using RainbowKit and WagmiConfig
- **Smart Contract Betting**: Place bets directly through blockchain smart contracts
- **AI Predictions**: Get accurate match predictions powered by advanced algorithms
- **Live Match Data**: Real-time updates on odds, scores, and statistics
- **User Profiles**: Track your betting history and performance
- **Community Features**: Engage with other users through match discussions

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Blockchain**: Polygon (Mainnet & Mumbai Testnet)
- **Wallet**: RainbowKit, Wagmi
- **Styling**: TailwindCSS with custom gradients and glass morphism
- **State Management**: React Hooks with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or any WalletConnect compatible wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/betua.git
cd betua
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the frontend directory with:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ENVIRONMENT=development
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000/` to see the application.

## Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your forked repository
4. Set the environment variables:
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_ENVIRONMENT`
5. Deploy!

## Smart Contracts

The betting smart contracts are deployed on:
- Sepolia: `[0x8fD222cd4E8eeBB2d1357A62DBF9aC753A83AE25]`
- Polygon Mumbai (Testnet): `[TBC]`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue in the repository.
