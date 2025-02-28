# BetUA Platform

BetUA is a next-generation sports betting platform that combines blockchain technology with AI-powered predictions to provide users with the most advanced betting experience.

## Features

- AI-powered sports predictions
- Secure blockchain-based betting
- Real-time odds and updates
- User-friendly interface
- Multi-wallet support
- Comprehensive analytics

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, RainbowKit
- **Backend**: Node.js, Express, MongoDB
- **Blockchain**: Solidity, Hardhat
- **AI**: OpenAI GPT, Custom ML Models
- **Infrastructure**: Digital Ocean, Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/0xMgwan/betua.git
   cd betua
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install

   # Install contract dependencies
   cd ../contracts
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Frontend
   cp frontend/.env.example frontend/.env

   # Backend
   cp backend/.env.example backend/.env

   # Smart Contracts
   cp contracts/.env.example contracts/.env
   ```

4. Start development servers:
   ```bash
   # Start frontend
   cd frontend
   npm run dev

   # Start backend
   cd ../backend
   npm run dev
   ```

## Documentation

- [API Documentation](./docs/api.md)
- [Smart Contract Documentation](./docs/contracts.md)
- [Frontend Documentation](./docs/frontend.md)

## Contributing

Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting any pull requests.

## Security

For security concerns, please refer to our [Security Policy](./SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
