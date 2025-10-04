import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix the workspace root warning
  outputFileTracingRoot: path.join(__dirname, "../"),
  
  // Allow cross-origin requests during development
  allowedDevOrigins: ["192.168.100.3"],
  
  // Disable telemetry if you prefer
  // telemetry: false,
};

export default nextConfig;
