import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdntest.postuly.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
