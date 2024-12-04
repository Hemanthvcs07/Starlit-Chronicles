/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**", // Allows all paths under the domain
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Adding Unsplash
        pathname: "/**", // Allows all paths under the domain
      },
    ],
  },
};

export default nextConfig;
