<script setup lang="ts">
import { ref } from 'vue';
import PokemonList from '../components/pokemon/PokemonList.vue';
import CollectionCard from '../components/card/CollectionCard.vue';
const search = ref('');
</script>

<template>
  <div class="max-w-screen min-h-screen min-w-screen mx-auto p-4">
  <header class="mb-4">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 text-left">Pokedex</h1>
  </header>
    <input v-model="search" type="text" placeholder="Search Pokemon" id="filter" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"/>
    <div class="flex w-full justify-between gap-2">
      <CollectionCard for="team" />
      <CollectionCard for="favourites" />
    </div>
    <PokemonList :filter="search" />
  </div>
</template>