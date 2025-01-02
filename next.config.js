const nextConfig = {
  output: "export", // Enables static exports
  basePath: process.env.NODE_ENV === "production" ? "/tylers-books" : "", // Use basePath only in production
  trailingSlash: true, // Ensures paths end with a slash (useful for static hosting)
};

module.exports = nextConfig;
