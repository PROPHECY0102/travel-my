export default {
  base: "/travel-my/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        explore: "explore/index.html",
        itinerary: "itinerary/index.html",
        kl: "kl/index.html",
      },
    },
  },
};
