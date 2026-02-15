import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

module.exports = {
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/about/resume',
        permanent: true,
      },
      {
        source: '/bio',
        destination: '/about/bio',
        permanent: true,
      },
      {
        source: '/software',
        destination: '/my-work/software',
        permanent: true,
      },
      {
        source: '/graphics',
        destination: '/my-work/graphics',
        permanent: true,
      },
      {
        source: '/music',
        destination: '/my-work/music',
        permanent: true,
      },
      {
        source: '/photos',
        destination: '/my-work/photos',
        permanent: true,
      }
    ]
  },
}
