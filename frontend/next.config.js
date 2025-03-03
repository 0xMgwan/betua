/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.sportsdataapi.com'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    console.log('Build Directory:', process.cwd());
    console.log('Node Modules Path:', require.resolve('tailwindcss'));
    console.log('PostCSS Config Path:', require.resolve('./postcss.config.js'));
    return config;
  },
}

module.exports = nextConfig
