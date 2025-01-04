const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/tylers-books" : "",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH,
  },
};

module.exports = nextConfig;
