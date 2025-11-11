import { defineStore } from "pinia";
import type { PokemonDetails } from "../types";

export const usePokemonDetailsStore = defineStore("pokemonDetails", {
  state: () => ({
    pokemonDetails: {} as Record<string, PokemonDetails>,
  }),
  persist: {
    key: "pokemon-details-store",
    storage: sessionStorage,
  },
  actions: {
    getPokemonDetails(name: string) {
      return this.pokemonDetails[name.toLowerCase()];
    },

    addPokemonDetails(apiPokemonDetails: PokemonDetails) {
      this.pokemonDetails[apiPokemonDetails.name.toLowerCase()] =
        apiPokemonDetails;
    },
  },
});
