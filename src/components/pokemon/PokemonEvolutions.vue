<script setup lang="ts">
import { useEvolutionChain } from "../../composables/useEvolutionChain";
import PokemonList from "./PokemonList.vue";

const props = defineProps<{
  pokemonId: number;
}>();

const { names, isLoading, error } = useEvolutionChain(props.pokemonId);
</script>

<template>
  <PokemonList :onlyNames="names" :selectedId="props.pokemonId" />
</template>
