/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'instagram.fbkk12-2.fna.fbcdn.net',
      'instagram.fbkk13-2.fna.fbcdn.net',
      'instagram.fbkk13-1.fna.fbcdn.net',
      'instagram.fbkk13-3.fna.fbcdn.net',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ เพิ่มบรรทัดนี้
  },
};

module.exports = nextConfig;
