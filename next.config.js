/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const config = {
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  reactStrictMode: true,
};

module.exports = withPWA(config);
