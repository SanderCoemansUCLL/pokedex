import type { Pokemon } from '../types';

export async function getAllPokemons(): Promise<Pokemon[]> {
    const response = await fetch('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon');
    if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
    }
    const data = await response.json();
    return data;
}