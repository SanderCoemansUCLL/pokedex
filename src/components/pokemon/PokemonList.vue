<script setup lang="ts">
import { computed } from "vue";
import { usePokemonList } from "../../composables/usePokemonList";
import PokemonCard from "./PokemonCard.vue";

const { pokemons, isLoading, error } = usePokemonList();

const props = defineProps<{
  search?: string;
  onlyNames?: string[];
  sort?: "name-asc" | "name-desc" | "id-asc" | "id-desc";
  selectedId?: number;
}>();

const formattedId = (id: number) => {
  return `${String(id).padStart(3, "0")}`;
};

const sortedPokemons = computed(() => {
  let list = pokemons.value ?? [];

  if (props.sort === "name-asc") {
    list = list
      .slice()
      .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
  } else if (props.sort === "name-desc") {
    list = list
      .slice()
      .sort((a, b) => (b.name ?? "").localeCompare(a.name ?? ""));
  } else if (props.sort === "id-asc") {
    list = list.slice().sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  } else if (props.sort === "id-desc") {
    list = list.slice().sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  }

  return list;
});

const filteredPokemons = computed(() => {
  let list = sortedPokemons.value ?? [];

  if (props.onlyNames) {
    if (props.onlyNames.length === 0) return [];
    list = list.filter((p) => props.onlyNames!.includes(p.name));
  }

  const rawSearch = (props.search ?? "").trim().toLowerCase();
  if (props.onlyNames && props.onlyNames.length > 0) {
    return list.filter((p) => p.name && props.onlyNames!.includes(p.name));
  }
  if (!rawSearch) return list;

  return list.filter((p) => {
    const name = String(p.name ?? "").toLowerCase();
    if (name.includes(rawSearch)) return true;
    if (formattedId(p.id ?? "").includes(rawSearch)) return true;
    if (
      p.types?.some((type) => type.type.name.toLowerCase().includes(rawSearch))
    )
      return true;
    return false;
  });
});
</script>
<template>
  <div class="max-w-3xl mx-auto py-6">
    <div
      v-if="error"
      class="text-sm text-red-600 text-center py-6"
      aria-live="polite"
    >
      {{ error }}
    </div>

    <div
      v-else-if="isLoading && !(props.onlyNames?.length === 0)"
      class="flex justify-center items-center py-12"
    >
      <span class="text-gray-500">Loading…</span>
    </div>

    <div
      v-else-if="filteredPokemons.length === 0 && !props.onlyNames"
      class="flex justify-center items-center py-12"
    >
      <span class="text-gray-500">No Pokemon found.</span>
    </div>

    <ul class="grid grid-cols-1 gap-4">
      <li
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="list-none"
      >
        <router-link
          :to="{
            name: 'PokemonDetails',
            params: { pokemonName: pokemon.name },
          }"
        >
          <PokemonCard
            v-if="props.selectedId"
            :pokemon="pokemon"
            :selectedId="props.selectedId"
          />
          <PokemonCard v-else :pokemon="pokemon" />
        </router-link>
      </li>
    </ul>
  </div>
</template>
