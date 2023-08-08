/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.multiavatar.com'],
    },
    experimental: {
        allowDangerousSvg: true,
    },
}

module.exports = nextConfig
