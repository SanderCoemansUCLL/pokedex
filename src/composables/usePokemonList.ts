import { ref } from "vue";
import type { Pokemon } from "../types";
import { getAllPokemons } from "../services/pokemonService";
import { usePokemonStore } from "../stores/pokemons";

export function usePokemonList() {
  const pokemons = ref<Pokemon[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const pokemonStore = usePokemonStore();

  const fetchPokemons = async () => {
    const cachedPokemons = pokemonStore.getAllPokemons();
    if (cachedPokemons.length > 0) {
      pokemons.value = cachedPokemons;
      isLoading.value = false;
      return;
    }

    try {
      pokemons.value = await getAllPokemons();
    } catch (e: any) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
      if (pokemons.value.length > 0) {
        pokemonStore.setPokemons(pokemons.value);
      }
    }
  };

  fetchPokemons();

  return {
    pokemons,
    isLoading,
    error,
  };
}
