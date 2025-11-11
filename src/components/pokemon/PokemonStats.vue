<script setup lang="ts">
import type { PokemonDetails } from "../../types";

const props = defineProps<{ stats: PokemonDetails["stats"] }>();

const capitalize = (s = "") =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";

const statColorClass = (value: number) => {
  if (value >= 80) return "bg-green-500";
  if (value >= 50) return "bg-amber-400";
  return "bg-red-400";
};
</script>

<template>
  <div class="max-w-full">
    <div class="bg-white rounded-xl shadow p-4 text-left max-w-full">
      <div class="space-y-3">
        <div
          v-for="stat in props.stats"
          :key="stat.stat.name"
          class="flex items-center gap-3"
        >
          <div class="w-10 text-base text-gray-400 capitalize">
            {{ capitalize(stat.stat.name) }}
          </div>

          <div class="w-10 text-base text-gray-600 text-right font-medium">
            {{ stat.base_stat }}
          </div>

          <div class="flex-1">
            <div class="bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                :style="{ width: stat.base_stat + '%' }"
                :class="[
                  'h-3 rounded-full transition-all',
                  statColorClass(stat.base_stat),
                ]"
                role="progressbar"
                :aria-valuenow="stat.base_stat"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
