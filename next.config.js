/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'instagram.fbkk12-2.fna.fbcdn.net',
      'instagram.fbkk13-2.fna.fbcdn.net',
      'instagram.fbkk13-1.fna.fbcdn.net', // Add this line
      'instagram.fbkk13-3.fna.fbcdn.net', // Add this line
    ],
  },
};

module.exports = nextConfig;
