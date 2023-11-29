export default {
  base: "/travel-my/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        explore: "explore/index.html",
        itinerary: "itinerary/index.html",
        packages: "packages/index.html",
        information: "information/index.html",
        kl: "kl/index.html",
        petronas_twin_towers: "petronas_twin_towers/index.html",
      },
    },
  },
};
