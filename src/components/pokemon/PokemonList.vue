<script setup lang="ts">
import { computed } from 'vue';
import { usePokemonList } from '../../composables/usePokemonList';
import PokemonCard from './PokemonCard.vue';

const { pokemons, isLoading, error } = usePokemonList();

const props = defineProps<{ filter?: string }>();

const formattedId = (id: number) => {
  return `${String(id).padStart(3, "0")}`;
};

const filteredPokemons = computed(() => {
  const list = pokemons.value ?? []
  const rawSearch = (props.filter ?? '').trim().toLowerCase()
  if (!rawSearch) return list

  return list.filter(p => {
    const name = String(p.name ?? '').toLowerCase()
    if (name.includes(rawSearch)) return true
    if (formattedId(p.id ?? '').includes(rawSearch)) return true
    if (p.types?.some(type => type.type.name.toLowerCase().includes(rawSearch))) return true
    return false
  })
})

</script>
<template>
  <div class="max-w-3xl mx-auto px-4 py-6">

    <div v-if="error" class="text-sm text-red-600 text-center py-6" aria-live="polite">
      {{ error }}
    </div>

    <div v-else-if="isLoading" class="flex justify-center items-center py-12">
      <span class="text-gray-500">Loading…</span>
    </div>

    <div v-else-if="filteredPokemons.length === 0" class="flex justify-center items-center py-12">
      <span class="text-gray-500">No Pokemon found.</span>
    </div>

    <ul class="grid grid-cols-1 gap-4">
      <li
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="list-none"
      >
      <router-link
          :to="{ name: 'PokemonDetails', params: { pokemonName: pokemon.name } }"
        >
        <PokemonCard :pokemon="pokemon" />
      </router-link>
      </li>
    </ul>
  </div>
</template>