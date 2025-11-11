<script setup lang="ts">
import type { PokemonDetails } from "../../types";

const props = defineProps<{ moves: PokemonDetails["moves"] }>();

const capitalize = (s = "") =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";

const formattedMoveName = (name: string) => {
  return capitalize(name.replace("-", " "));
};

const gen1VersionGroups = ["red-blue", "yellow"];

const gen1LevelUpMoves = props.moves
  .map((move) => {
    const gen1Details = move.version_group_details.find((detail) =>
      gen1VersionGroups.includes(detail.version_group.name)
    );

    if (!gen1Details) {
      return null;
    }

    if (
      gen1Details.move_learn_method.name === "level-up" &&
      gen1Details.level_learned_at > 0
    ) {
      return {
        name: move.move.name,
        level: gen1Details.level_learned_at,
      };
    }

    return null;
  })
  .filter((move) => move !== null);

gen1LevelUpMoves.sort((a, b) => a.level - b.level);
</script>

<template>
  <div class="max-w-full">
    <div class="bg-white rounded-xl shadow p-4 text-left max-w-full">
      <div class="grid grid-cols-2 gap-2">
        <template
          v-for="move in gen1LevelUpMoves"
          :key="move.name + '-' + move.level"
        >
          <div class="flex items-center gap-3 min-h-10">
            <span
              class="inline-flex items-center justify-center text-xs font-semibold text-violet-700 bg-violet-100 px-3 py-1 rounded-full min-w-18 shadow-sm shrink-0 border border-violet-900"
            >
              Level {{ move.level }}
            </span>

            <span
              class="text-sm font-semibold text-gray-800 min-w-0 wrap-break-word whitespace-normal"
            >
              {{ formattedMoveName(move.name) }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
