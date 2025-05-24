import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages:['pino', 'pino-pretty'],
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
