import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/vibe-library' : '',
  assetPrefix: isProd ? '/vibe-library/' : '',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
