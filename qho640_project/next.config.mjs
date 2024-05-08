/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['m.media-amazon.com'],
      },
};

/*
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
      },
    ],
  },
}
*/


export default nextConfig;
