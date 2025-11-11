<script setup lang="ts">
import { computed } from "vue";
import colours from "../../utils/pokemonTypeColors";
import type { Pokemon } from "../../types";

const props = defineProps<{ pokemon: Pokemon; selectedId?: number }>();

const isSelected = computed(() => {
  if (props.selectedId) {
    return props.pokemon.id === props.selectedId;
  }
  return true;
});

const formattedId = computed(() => {
  return `Nr. ${String(props.pokemon.id).padStart(3, "0")}`;
});
</script>

<template>
  <div
    :class="[
      'relative flex items-center gap-2 p-2 pr-12 rounded-xl shadow-sm cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
    ]"
    :style="{
      backgroundColor: isSelected
        ? 'rgb(255 255 255)'
        : 'rgba(255, 255, 255, 0.5)',
    }"
  >
    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="w-12 h-12 shrink-0"
    />

    <div class="flex flex-col flex-1 min-w-0 text-left">
      <h3
        class="text-base font-semibold text-gray-800 capitalize whitespace-normal"
      >
        {{ pokemon.name }}
      </h3>
      <p class="text-xs text-gray-500 mt-1">
        {{ formattedId }}
      </p>
    </div>

    <div class="flex flex-col items-end gap-2 shrink-0 ml-3 w-20">
      <div class="flex gap-1 justify-end">
        <span
          v-for="typeInfo in pokemon.types"
          :key="typeInfo.type.name"
          :class="[
            'px-1.5 py-0.5 rounded-full text-[11px] font-semibold text-white capitalize',
          ]"
          :style="{ maxWidth: '100%', backgroundColor: colours[typeInfo.type.name as keyof typeof colours][0] }"
        >
          {{ typeInfo.type.name }}
        </span>
      </div>
    </div>

    <span
      class="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400"
    >
      &gt;
    </span>
  </div>
</template>
