import { ref } from 'vue';
import type { Pokemon } from '../types';
import { getAllPokemons } from '../services/pokemonService';

export function usePokemonList() {
    const pokemons = ref<Pokemon[]>([]);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const fetchPokemons = async () => {
        try {
            pokemons.value = await getAllPokemons();
        } catch (e: any) {
            error.value = e.message;
        } finally {
            isLoading.value = false;
        }
    };

    fetchPokemons();

    return {
        pokemons,
        isLoading,
        error
    };
}
