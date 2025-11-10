import type { Ref } from 'vue';
import type { Pokemon, PokemonDetails } from '../types';

export async function getAllPokemons(): Promise<Pokemon[]> {
    const response = await fetch('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon');
    if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
    }
    const data = await response.json();
    return data;
}

export async function getPokemonByName(name: Ref<string>): Promise<PokemonDetails> {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name.value}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pokemon details');
    }
    const data = await response.json();
    return data;
}