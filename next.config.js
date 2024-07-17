/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    images: {
        domains: ['localhost'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
    },
}

export default nextConfig