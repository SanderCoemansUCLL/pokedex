<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, toRef, type Ref } from 'vue'
import { usePokemonDetails } from '../composables/usePokemonDetails'
import PokemonLightBox from '../components/pokemon/PokemonLightBox.vue'
import colours from '../utils/pokemonTypeColors'
import PokemonAbout from '../components/pokemon/PokemonAbout.vue'
import PokemonStats from '../components/pokemon/PokemonStats.vue'

const route = useRoute()

const nameRef = toRef(route.params, 'pokemonName') as Ref<string>

const { pokemon, isLoading, error } = usePokemonDetails(nameRef)

const primaryType = computed(() => pokemon.value?.types?.[0]?.type?.name ?? 'normal')

const bgColor = computed(() => colours[primaryType.value as keyof typeof colours])

const capitalizedName = computed(() => {
  const n = pokemon.value?.name ?? ''
  return n ? n.charAt(0).toUpperCase() + n.slice(1) : ''
})

</script>

<template>
  <div :class="['min-h-screen min-w-screen', bgColor]" >
    <div v-if="error">
      <p class="text-red-500">Error: {{ error }}</p>
    </div>

    <div v-else-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-else-if="pokemon == null">
      <p class="text-red-500">Pokemon not found.</p>
    </div>

    <div v-else class="pt-8 pl-8">
      <h1 class="text-left font-bold">{{ capitalizedName }}</h1>
    </div>
    <PokemonLightBox :sprites="pokemon!.sprites" />

    <div class="pl-8 pr-8">
      <h2 class="text-left">About</h2>
      <PokemonAbout :pokemon="pokemon!" />
    </div>

    <div class="pl-8 pr-8">
      <h2 class="text-left">Stats</h2>
      <PokemonStats :stats="pokemon!.stats" />
    </div>

    <div class="pl-8 pr-8">
      <h2 class="text-left">Moveset</h2>
    </div>

  </div>
</template>