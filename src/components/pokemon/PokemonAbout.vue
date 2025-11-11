<script setup lang="ts">
import { computed } from "vue";
import type { PokemonDetails } from "../../types";
import colours from "../../utils/pokemonTypeColors";

const props = defineProps<{ pokemon: PokemonDetails }>();

const capitalize = (s = "") =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";

const number = computed(() => `00${props.pokemon.id}`.slice(-3));
const height = (h: number) => `${h / 10}m`;
const weight = (w: number) => `${w / 10} kg`;

const abilities = computed(() =>
  props.pokemon.abilities
    .filter((a) => !a.is_hidden)
    .map((a) => capitalize(a.ability.name))
    .join(", ")
);

const genders = computed(() => {
  if (
    props.pokemon.sprites.front_default != null &&
    props.pokemon.sprites.front_female != null
  ) {
    return "♂ ♀";
  } else if (
    props.pokemon.sprites.front_default != null &&
    props.pokemon.sprites.front_female == null
  ) {
    return "♂";
  } else if (
    props.pokemon.sprites.front_female != null &&
    props.pokemon.sprites.front_default == null
  ) {
    return "♀";
  } else {
    return "—";
  }
});
</script>

<template>
  <div class="max-w-full">
    <div class="bg-white rounded-xl shadow p-4 text-left max-w-full">
      <div class="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <div class="text-base text-gray-400">Type</div>
        <div class="flex gap-2">
          <template v-for="t in props.pokemon.types" :key="t.type.name">
            <span
              :class="[
                'px-2 py-1 rounded-full text-[11px] font-semibold text-white capitalize',
              ]"
              :style="{ backgroundColor: colours[t.type.name as keyof typeof colours][0] }"
            >
              {{ t.type.name }}
            </span>
          </template>
        </div>

        <div class="text-base text-gray-400">Number</div>
        <div class="font-medium">#{{ number }}</div>

        <div class="text-base text-gray-400">Height</div>
        <div class="font-medium">{{ height(props.pokemon.height) }}</div>

        <div class="text-base text-gray-400">Weight</div>
        <div class="font-medium">{{ weight(props.pokemon.weight) }}</div>

        <div class="text-base text-gray-400">Gender</div>
        <div class="font-medium">{{ genders }}</div>

        <div class="text-base text-gray-400">Abilities</div>
        <div class="font-medium">{{ abilities }}</div>
      </div>
    </div>
  </div>
</template>
