/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX({
  // Configuration options here
});

export default withMDX(nextConfig);