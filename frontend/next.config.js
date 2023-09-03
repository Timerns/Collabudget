/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND,
    FRONTEND_URL: process.env.FRONTEND
  }
}

module.exports = nextConfig
