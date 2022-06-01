/** @type {import('next').NextConfig} */
const culinaryConfig = require('./culinaryConfig');
const domainURL = culinaryConfig.imageURL + culinaryConfig.userName
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig, {
  images: {
    domains: [domainURL],
    minimumCacheTTL: culinaryConfig.imageCacheTTL,
  },
}
