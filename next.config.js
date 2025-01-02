const nextConfig = {
  output: "export",
  basePath: "/tylers-books", // Set the base path to match the subdirectory on your server
  publicRuntimeConfig: {
    basePath: "/tylers-books",
  },
  // Optional settings
  trailingSlash: true, // Ensure all paths end with a slash
};

module.exports = nextConfig;
