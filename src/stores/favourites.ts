import { defineStore } from "pinia";

export const useFavouritesStore = defineStore("favourites", {
  state: () => ({
    favourites: [] as string[],
  }),
  persist: {
    key: "favourites-store",
    storage: localStorage,
  },
  actions: {
    toggleFavourite(pokemonName: string) {
      if (this.favourites.includes(pokemonName)) {
        this.favourites = this.favourites.filter(
          (name) => name !== pokemonName
        );
      } else {
        this.favourites.push(pokemonName);
      }
    },
    isFavourite(pokemonName: string) {
      return this.favourites.includes(pokemonName);
    },
    getFavourites() {
      return this.favourites;
    },
  },
});
