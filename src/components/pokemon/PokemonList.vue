<script setup lang="ts">
import { usePokemonList } from '../../composables/usePokemonList';
import PokemonCard from './PokemonCard.vue';

const { pokemons, isLoading, error } = usePokemonList();

</script>
<template>
  <div class="max-w-3xl mx-auto px-4 py-6">
    <header class="mb-4">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 text-left">Pokedex</h1>
    </header>

    <div v-if="error" class="text-sm text-red-600 text-center py-6" aria-live="polite">
      {{ error }}
    </div>

    <div v-else-if="isLoading" class="flex justify-center items-center py-12">
      <span class="text-gray-500">Loading…</span>
    </div>

    <ul class="grid grid-cols-1 gap-4">
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="list-none"
      >
        <PokemonCard :pokemon="pokemon" />
      </li>
    </ul>
  </div>
</template>