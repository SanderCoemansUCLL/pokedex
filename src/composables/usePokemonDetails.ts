import { ref, type Ref } from 'vue';
import type { PokemonDetails } from '../types';
import { getPokemonByIdentifier } from '../services/pokemonService';

export function usePokemonDetails(identifier: Ref<string>) {
    const pokemon = ref<PokemonDetails | null>(null);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const fetchPokemons = async () => {
        try {
            pokemon.value = await getPokemonByIdentifier(identifier);
        } catch (e: any) {
            error.value = e.message;
        } finally {
            isLoading.value = false;
        }
    };

    fetchPokemons();

    return {
        pokemon,
        isLoading,
        error
    };
}
