import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdntest.postuly.com",
        port: "",
        pathname: "/resumes/**",
      },
    ],
  },
};

export default nextConfig;
