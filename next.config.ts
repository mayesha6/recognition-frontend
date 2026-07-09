import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // আপনার হোস্টনেম এখানে দিন
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
