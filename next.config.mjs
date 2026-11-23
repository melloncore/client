/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      { source: "/blog", destination: "/en/blog", permanent: false },
      { source: "/blog/:slug", destination: "/en/blog/:slug", permanent: false },
    ];
  },
};
export default nextConfig;
