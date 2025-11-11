import type { Pokemon, PokemonDetails } from '../types';

export async function getAllPokemons(): Promise<Pokemon[]> {
    const response = await fetch('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon');
    if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
    }
    const data = await response.json();
    return data;
}

export async function getPokemonByName(name: string): Promise<PokemonDetails> {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pokemon details');
    }
    const data = await response.json();
    return data;
}

export async function getEvolutionChain(speciesId: number): Promise<any> {
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesId}`);
    if (!speciesResponse.ok) {
        throw new Error('Failed to fetch species details');
    }
    const speciesDetails = await speciesResponse.json();

    const evolutionChainUrl = speciesDetails.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionChainUrl);
    if (!evolutionResponse.ok) {
        throw new Error('Failed to fetch evolution chain');
    }
    const evolutionChain = await evolutionResponse.json();
    return evolutionChain;
}
