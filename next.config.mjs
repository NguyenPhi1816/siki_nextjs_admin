const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
