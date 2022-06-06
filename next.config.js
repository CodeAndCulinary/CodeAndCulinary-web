/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  images: {
    domains: ['github.com'],
    minimumCacheTTL: 10,
  },
})
