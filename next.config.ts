import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Disable optimization for development to avoid 400 errors
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
