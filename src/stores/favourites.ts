import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favourites: [] as number[],
    }),
    persist: {
        key: 'favourites-store',
        storage: localStorage,
    },
    actions: {
        toggleFavourite(pokemonId: number) {
            if (this.favourites.includes(pokemonId)) {
                this.favourites = this.favourites.filter(id => id !== pokemonId);
            } else {
                this.favourites.push(pokemonId);
            }
        },
        isFavourite(pokemonId: number) {
            return this.favourites.includes(pokemonId);
        },
        getFavourites() {
            return this.favourites;
        }
    }
});