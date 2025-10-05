const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix the workspace root warning
  outputFileTracingRoot: path.join(__dirname, "../"),

  // Allow cross-origin requests during development
  // (Note: 'allowedDevOrigins' is not a standard Next.js config option;
  // if this is custom middleware logic, you’ll need to handle it separately.)
  allowedDevOrigins: ["192.168.100.3"],

  // Disable telemetry if you prefer
  // telemetry: false,
};

module.exports = nextConfig;
