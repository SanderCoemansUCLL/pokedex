import { defineStore } from 'pinia'
import type { Pokemon } from '../types';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Pokemon[],
    }),
    persist: {
        key: 'pokemon-store',
        storage: sessionStorage,
    },
    actions: {
        getAllPokemons() {
            return this.pokemons;
        },

        setPokemons(apiPokemons: Pokemon[]) {
            this.pokemons = apiPokemons;
        },

    }
});