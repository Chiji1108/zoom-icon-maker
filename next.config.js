/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const config = {
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  webpack5: true,
};

module.exports = withPWA(config);
