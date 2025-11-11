import { ref, type Ref } from 'vue';
import type { PokemonDetails } from '../types';
import { getPokemonByName } from '../services/pokemonService';
import { usePokemonDetailsStore } from '../stores/pokemonDetails';

export function usePokemonDetails(name: Ref<string>) {
    const pokemon = ref<PokemonDetails | null>(null);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const pokemonDetailsStore = usePokemonDetailsStore();

    const fetchPokemons = async () => {
        const cachedPokemonDetails = pokemonDetailsStore.getPokemonDetails(name.value);
        if (cachedPokemonDetails) {
            pokemon.value = cachedPokemonDetails;
            isLoading.value = false;
            return;
        }

        try {
            pokemon.value = await getPokemonByName(name);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            isLoading.value = false;
            if (pokemon.value) {
                pokemonDetailsStore.addPokemonDetails(pokemon.value);
            }
        }
    };

    fetchPokemons();

    return {
        pokemon,
        isLoading,
        error
    };
}
