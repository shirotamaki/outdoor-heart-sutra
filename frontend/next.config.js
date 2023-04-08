/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    workerTimeout: 180000,
  },
}

module.exports = nextConfig
