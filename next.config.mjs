/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  reactStrictMode: false,
  ...(isGhPages
    ? {
        output: 'export',
        basePath: '/tuvi-hhd',
        images: { unoptimized: true },
      }
    : {}),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
