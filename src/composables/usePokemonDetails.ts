import { computed, ref, watch, type Ref } from "vue";
import type { PokemonDetails } from "../types";
import { getPokemonByName } from "../services/pokemonService";
import { usePokemonDetailsStore } from "../stores/pokemonDetails";

export function usePokemonDetails(name: Ref<string> | string) {
  const pokemon = ref<PokemonDetails | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const pokemonDetailsStore = usePokemonDetailsStore();

  const pokemonName = computed(() =>
    typeof name === "string" ? name : name.value
  );

  const fetchPokemons = async (currentName: string) => {
    isLoading.value = true;
    error.value = null;

    const cachedPokemonDetails =
      pokemonDetailsStore.getPokemonDetails(currentName);
    if (cachedPokemonDetails) {
      pokemon.value = cachedPokemonDetails;
      isLoading.value = false;
      return;
    }

    try {
      pokemon.value = await getPokemonByName(currentName);
    } catch (e: any) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
      if (pokemon.value) {
        pokemonDetailsStore.addPokemonDetails(pokemon.value);
      }
    }
  };

  watch(
    pokemonName,
    (newName) => {
      fetchPokemons(newName);
    },
    { immediate: true }
  );

  return {
    pokemon,
    isLoading,
    error,
  };
}
