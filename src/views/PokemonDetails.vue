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

const route = useRoute()

const nameRef = toRef(route.params, 'pokemonName') as Ref<string>

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
  <div class="min-h-screen min-w-screen" :style="bgStyle">
    <div v-if="error">
      <p class="text-red-500">Error: {{ error }}</p>
    </div>

    <div v-else-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-else-if="pokemon == null">
      <p class="text-red-500">Pokemon not found.</p>
    </div>

    <div v-else class="pt-8 pl-8 pr-8 flex justify-between items-baseline">
      <h1 class="text-left font-bold">{{ capitalizedName }}</h1>
      <Heart v-if="isFavourite" :size="Number(32)" @click="toggleFavourite" fill="white"/>
      <Heart v-else :size="Number(32)" @click="toggleFavourite" />
    </div>
    <PokemonLightBox :sprites="pokemon!.sprites" />

    <div class="pl-8 pr-8 pb-6">
      <h2 class="text-left font-bold text-lg">About</h2>
      <PokemonAbout :pokemon="pokemon!" />
    </div>

    <div class="pl-8 pr-8 pb-6">
      <h2 class="text-left font-bold text-lg">Stats</h2>
      <PokemonStats :stats="pokemon!.stats" />
    </div>

    <div class="pl-8 pr-8 pb-6">
      <h2 class="text-left font-bold text-lg">Moveset</h2>
      <PokemonMoves :moves="pokemon!.moves" />
    </div>

  </div>
</template>