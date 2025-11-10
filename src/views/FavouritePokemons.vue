<script setup lang="ts">
import PokemonList from '../components/pokemon/PokemonList.vue';
import { useFavouritesStore } from '../stores/favourites';
const favouritesStore = useFavouritesStore();

const favouriteIds = favouritesStore.getFavourites();
</script>
<template>
    <div class="max-w-screen min-h-screen min-w-screen mx-auto p-4 bg-linear-to-br from-[#27e7c3] to-[#2193B0]">
    <div class="max-w-3xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4 text-left">Favourites</h1>
        <PokemonList :onlyIds="favouriteIds"/>
    </div>
    </div>
</template>