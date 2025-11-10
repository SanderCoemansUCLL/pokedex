<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, toRef, type Ref } from 'vue'
import { usePokemonDetails } from '../composables/usePokemonDetails'
import PokemonLightBox from '../components/pokemon/PokemonLightBox.vue'
import colours from '../utils/pokemonTypeColors'
import PokemonAbout from '../components/pokemon/PokemonAbout.vue'
import PokemonStats from '../components/pokemon/PokemonStats.vue'
import PokemonMoves from '../components/pokemon/PokemonMoves.vue'
import { Heart } from 'lucide-vue-next';
import { useFavouritesStore } from '../stores/favourites';
import BackButton from '../components/ui/BackButton.vue'
import { useTeamStore } from '../stores/team'

const route = useRoute();

const teamStore = useTeamStore();

const inTeam = computed(() => {
  const pokemonId = pokemon.value?.id ?? 0;
  return teamStore.isMember(pokemonId);
});

const teamIsFull = computed(() => {
  return teamStore.getMembers().length >= 6;
});

const nameRef = toRef(route.params, 'pokemonName') as Ref<string>;

const { pokemon, isLoading, error } = usePokemonDetails(nameRef)

const primaryType = computed(() => pokemon.value?.types?.[0]?.type?.name ?? 'normal')

const colors = computed(() => colours[primaryType.value as keyof typeof colours]);

const bgStyle = computed(() => ({
  background: `linear-gradient(${colors.value[0]}, ${colors.value[1]})`
}))

const capitalizedName = computed(() => {
  const n = pokemon.value?.name ?? ''
  return n ? n.charAt(0).toUpperCase() + n.slice(1) : ''
})

const favouritesStore = useFavouritesStore();

const toggleFavourite = () => {
  favouritesStore.toggleFavourite(pokemon.value?.id ?? 0);
}

const isFavourite = computed(() => {
  return favouritesStore.isFavourite(pokemon.value?.id ?? 0);
});

</script>

<template>
  <div class="min-h-screen min-w-screen p-4 pb-20" :style="bgStyle">
    <BackButton />
    <div v-if="error">
      <p class="text-red-500">Error: {{ error }}</p>
    </div>

    <div v-else-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-else-if="pokemon == null">
      <p class="text-red-500">Pokemon not found.</p>
    </div>

    <div v-else class="pt-8 flex justify-between items-baseline">
      <h1 class="text-left font-bold">{{ capitalizedName }}</h1>
      <Heart v-if="isFavourite" :size="Number(32)" @click="toggleFavourite" fill="white"/>
      <Heart v-else :size="Number(32)" @click="toggleFavourite" />
    </div>
    <PokemonLightBox :sprites="pokemon!.sprites" />

    <div class="pb-6">
      <h2 class="text-left font-bold text-lg">About</h2>
      <PokemonAbout :pokemon="pokemon!" />
    </div>

    <div class="pb-6">
      <h2 class="text-left font-bold text-lg">Stats</h2>
      <PokemonStats :stats="pokemon!.stats" />
    </div>

    <div class="pb-6">
      <h2 class="text-left font-bold text-lg">Moveset</h2>
      <PokemonMoves :moves="pokemon!.moves" />
    </div>

    <div class="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-50 w-3/4">
      <button
        type="button"
        @click="teamStore.toggleMember(pokemon!.id)"
        class="w-full px-6 py-3 rounded-full shadow-lg flex items-center justify-center
               bg-gray-900 hover:bg-gray-800 active:scale-95"
        :disabled="teamIsFull && !inTeam"
      >
        <span v-if="!inTeam && !teamIsFull" class="text-lg font-bold text-white">Add to team</span>
        <span v-else-if="teamIsFull && !inTeam" class="text-lg font-bold text-white">Team is full</span>
        <span v-else class="text-lg font-bold text-white">Remove from team</span>
      </button>
    </div>

  </div>
</template>