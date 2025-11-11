<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { usePokemonDetails } from "../composables/usePokemonDetails";
import PokemonLightBox from "../components/pokemon/PokemonLightBox.vue";
import colours from "../utils/pokemonTypeColors";
import PokemonAbout from "../components/pokemon/PokemonAbout.vue";
import PokemonStats from "../components/pokemon/PokemonStats.vue";
import PokemonMoves from "../components/pokemon/PokemonMoves.vue";
import PokemonEvolutions from "../components/pokemon/PokemonEvolutions.vue";
import { Heart } from "lucide-vue-next";
import { useFavouritesStore } from "../stores/favourites";
import BackButton from "../components/ui/BackButton.vue";
import { useTeamStore } from "../stores/team";

const route = useRoute();

const teamStore = useTeamStore();

const inTeam = computed(() => {
  const pokemonName = pokemon.value?.name ?? "";
  return teamStore.isMember(pokemonName);
});

const teamIsFull = computed(() => {
  return teamStore.getMembers().length >= 6;
});

const name = computed(() => route.params.pokemonName as string);

const { pokemon, isLoading, error } = usePokemonDetails(name);

const primaryType = computed(
  () => pokemon.value?.types?.[0]?.type?.name ?? "normal"
);

const colors = computed(
  () => colours[primaryType.value as keyof typeof colours]
);

const bgStyle = computed(() => ({
  background: `linear-gradient(${colors.value[0]}, ${colors.value[1]})`,
}));

const capitalizedName = computed(() => {
  const n = pokemon.value?.name ?? "";
  return n ? n.charAt(0).toUpperCase() + n.slice(1) : "";
});

const favouritesStore = useFavouritesStore();

const toggleFavourite = () => {
  favouritesStore.toggleFavourite(pokemon.value?.name ?? "");
};

const isFavourite = computed(() => {
  return favouritesStore.isFavourite(pokemon.value?.name ?? "");
});
</script>

<template>
  <div
    class="min-h-screen min-w-screen p-4 sm:p-6 lg:p-8 pb-24 sm:pb-28"
    :style="bgStyle"
    :key="name"
  >
    <div class="max-w-2xl mx-auto" :style="bgStyle">
      <BackButton />
      <div v-if="error">
        <p class="text-red-500 text-sm sm:text-base">Error: {{ error }}</p>
      </div>

      <div v-else-if="isLoading">
        <p class="text-sm sm:text-base">Loading...</p>
      </div>

      <div v-else-if="pokemon == null">
        <p class="text-red-500 text-sm sm:text-base">Pokemon not found.</p>
      </div>

      <div v-else class="pt-6 sm:pt-8 flex justify-between items-baseline">
        <h1 class="text-left font-bold text-2xl sm:text-3xl lg:text-4xl">
          {{ capitalizedName }}
        </h1>
        <Heart
          v-if="isFavourite"
          :size="Number(28)"
          class="sm:w-8 sm:h-8"
          @click="toggleFavourite"
          fill="white"
        />
        <Heart
          v-else
          :size="Number(28)"
          class="sm:w-8 sm:h-8"
          @click="toggleFavourite"
        />
      </div>
      <PokemonLightBox :sprites="pokemon!.sprites" />

      <div class="pb-4 sm:pb-6">
        <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
          About
        </h2>
        <PokemonAbout :pokemon="pokemon!" />
      </div>

      <div class="pb-4 sm:pb-6">
        <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
          Stats
        </h2>
        <PokemonStats :stats="pokemon!.stats" />
      </div>

      <div class="pb-4 sm:pb-6">
        <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
          Moveset
        </h2>
        <PokemonMoves :moves="pokemon!.moves" />
      </div>

      <div class="pb-4 sm:pb-6">
        <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
          Evolution
        </h2>
        <PokemonEvolutions :pokemonId="pokemon!.id" />
      </div>

      <div
        class="fixed left-1/2 transform -translate-x-1/2 bottom-4 sm:bottom-6 z-50 w-[90%] sm:w-3/4 max-w-md"
      >
        <button
          type="button"
          @click="teamStore.toggleMember(pokemon!.name)"
          class="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg flex items-center justify-center bg-gray-900 hover:bg-gray-800 active:scale-95 transition-transform"
          :disabled="teamIsFull && !inTeam"
        >
          <span
            v-if="!inTeam && !teamIsFull"
            class="text-base sm:text-lg font-bold text-white"
            >Add to team</span
          >
          <span
            v-else-if="teamIsFull && !inTeam"
            class="text-base sm:text-lg font-bold text-white"
            >Team is full</span
          >
          <span v-else class="text-base sm:text-lg font-bold text-white"
            >Remove from team</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
