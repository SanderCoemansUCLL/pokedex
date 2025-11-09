<script setup lang="ts">
import { usePokemonList } from '../../composables/usePokemonList';

const { pokemons, isLoading, error } = usePokemonList();

</script>
<template>
  <div>
    <h2>Pokémon</h2>
    <div v-if="error" class="">{{ error }}</div>
    <div v-else-if="isLoading">Loading...</div>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id" :href="`/${pokemon.name}`">
        <a >{{ pokemon.name }}</a>
      </li>
    </ul>
  </div>
</template>