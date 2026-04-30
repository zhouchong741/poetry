import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/poetry",
  assetPrefix: "/poetry/",
  trailingSlash: true,
};

export default nextConfig;
