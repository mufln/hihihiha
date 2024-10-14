/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://back:8000/:path*',
      },
    ];
  },
};

const withMDX = createMDX({
  // Configuration options here
});

export default withMDX(nextConfig);