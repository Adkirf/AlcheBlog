/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const removeImports = require('next-remove-imports')();
module.exports = removeImports({});

module.exports = nextConfig
