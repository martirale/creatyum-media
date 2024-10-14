/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_LOCALHOST_HOSTNAME,
        port: process.env.NEXT_PUBLIC_LOCALHOST_PORT,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi.creatyum.com",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
