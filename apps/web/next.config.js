// Using import
import { dotenvLoad } from "dotenv-mono";
const dotenv = dotenvLoad(); // Dotenv instance
dotenv.load();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatar.iran.liara.run", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
