/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    qualities: [50, 75, 85, 90],
  },
}

export default nextConfig
