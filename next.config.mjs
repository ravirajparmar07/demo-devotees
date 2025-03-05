/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["15.235.50.88"],
  },
  devIndicators: {
    buildActivity: false,
  },
  productionBrowserSourceMaps: false, // Removes source maps in production
};

export default nextConfig;
