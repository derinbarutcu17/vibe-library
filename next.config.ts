import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/vibe-library',
  assetPrefix: '/vibe-library/',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
