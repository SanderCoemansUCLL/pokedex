<script setup lang="ts">
import { ref } from 'vue';
import PokemonList from '../components/pokemon/PokemonList.vue';
import CollectionCard from '../components/card/CollectionCard.vue';
import { SlidersHorizontal } from 'lucide-vue-next';
const search = ref('');
const menuOpen = ref(false);

const sortOption = ref<'name-asc' | 'name-desc' | 'id-asc' | 'id-desc'>('id-asc');

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function selectSort(option: typeof sortOption.value) {
  sortOption.value = option;
  menuOpen.value = false;
}
</script>

<template>
  <div class="max-w-screen min-h-screen min-w-screen mx-auto p-4">
  <header class="mb-4 flex justify-between">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 text-left">Pokedex</h1>
      <div class="relative">
        <button
          type="button"
          @click.stop="toggleMenu"
          class="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <SlidersHorizontal color="black" />
        </button>
        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 w-56 bg-white text-black border rounded-md shadow-lg z-40"
          role="menu"
        >
          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-50"
            :class="{'font-semibold': sortOption === 'name-asc'}"
            @click.stop="selectSort('name-asc')"
          >Alphabetically ↑</button>

          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-50"
            :class="{'font-semibold': sortOption === 'name-desc'}"
            @click.stop="selectSort('name-desc')"
          >Alphabetically ↓</button>

          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-50"
            :class="{'font-semibold': sortOption === 'id-asc'}"
            @click.stop="selectSort('id-asc')"
          >Numerically ↑</button>

          <button
            class="w-full text-left px-4 py-2 hover:bg-gray-50"
            :class="{'font-semibold': sortOption === 'id-desc'}"
            @click.stop="selectSort('id-desc')"
          >Numerically ↓</button>
        </div>
      </div>

  </header>
    <input v-model="search" type="text" placeholder="Search Pokemon" id="filter" class="w-full px-4 py-2 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"/>
    <div class="flex w-full justify-between gap-2">
      <CollectionCard for="team" />
      <CollectionCard for="favourites" />
    </div>
    <PokemonList :search="search" :sort="sortOption" />
  </div>
</template>