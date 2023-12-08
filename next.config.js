/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "bigpie-pizza-2.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
