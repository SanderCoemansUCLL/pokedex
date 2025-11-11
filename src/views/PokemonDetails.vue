<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { usePokemonDetails } from "../composables/usePokemonDetails";
import PokemonLightBox from "../components/pokemon/PokemonLightBox.vue";
import colours from "../utils/pokemonTypeColors";
import PokemonAbout from "../components/pokemon/PokemonAbout.vue";
import PokemonStats from "../components/pokemon/PokemonStats.vue";
import PokemonMoves from "../components/pokemon/PokemonMoves.vue";
import PokemonEvolutions from "../components/pokemon/PokemonEvolutions.vue";
import { Heart, X } from "lucide-vue-next";
import { useFavouritesStore } from "../stores/favourites";
import BackButton from "../components/ui/BackButton.vue";
import { useTeamStore } from "../stores/team";

const route = useRoute();
const router = useRouter();

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

const closeDetails = () => {
  router.push('/');
};
</script>

<template>
  <div
    class="min-h-screen p-4 sm:p-6 lg:p-8 pb-24 sm:pb-28 relative"
    :style="bgStyle"
    :key="name"
  >
    <button
      @click="closeDetails"
      class="hidden lg:block absolute top-4 right-4 p-2 rounded-full"
    >
      <X :size="24"/>
    </button>

    <BackButton class="lg:hidden" />
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
        class="sm:w-8 sm:h-8 cursor-pointer"
        @click="toggleFavourite"
        fill="white"
      />
      <Heart
        v-else
        :size="Number(28)"
        class="sm:w-8 sm:h-8 cursor-pointer"
        @click="toggleFavourite"
      />
    </div>
    <PokemonLightBox v-if="pokemon" :sprites="pokemon.sprites" />

    <div v-if="pokemon" class="pb-4 sm:pb-6">
      <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
        About
      </h2>
      <PokemonAbout :pokemon="pokemon" />
    </div>

    <div v-if="pokemon" class="pb-4 sm:pb-6">
      <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
        Stats
      </h2>
      <PokemonStats :stats="pokemon.stats" />
    </div>

    <div v-if="pokemon" class="pb-4 sm:pb-6">
      <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
        Moveset
      </h2>
      <PokemonMoves :moves="pokemon.moves" />
    </div>

    <div v-if="pokemon" class="pb-4 sm:pb-6">
      <h2 class="text-left font-bold text-base sm:text-lg lg:text-xl">
        Evolution
      </h2>
      <PokemonEvolutions :pokemonId="pokemon.id" />
    </div>

    <div
      v-if="pokemon"
      class="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 px-4 lg:left-1/2 lg:px-4"
    >
      <button
        type="button"
        @click="teamStore.toggleMember(pokemon.name)"
        class="w-full max-w-md mx-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg flex items-center justify-center bg-gray-900 hover:bg-gray-800 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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
</template>