/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["15.235.50.88"],
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
