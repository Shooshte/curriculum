module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/curriculum",
        permanent: true,
      },
    ];
  },
};
