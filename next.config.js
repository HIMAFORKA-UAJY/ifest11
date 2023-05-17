/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate a static export of the site
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
