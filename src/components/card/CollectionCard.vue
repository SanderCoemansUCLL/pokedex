<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFavouritesStore } from "../../stores/favourites";
import { useTeamStore } from "../../stores/team";

const props = defineProps<{ for: "favourites" | "team" }>();

const favouritesStore = useFavouritesStore();
const teamStore = useTeamStore();

const router = useRouter();
function go() {
  if (props.for) router.push(props.for);
}

const count = computed(() => {
  if (props.for === "favourites") {
    return favouritesStore.getFavourites().length;
  } else if (props.for === "team") {
    return teamStore.getMembers().length;
  }
  return 0;
});
const backgroundImage = computed(() => {
  return props.for === "favourites"
    ? "/favouritesBackground.png"
    : "/teamBackground.png";
});
</script>

<template>
  <div class="relative overflow-hidden" @click="go">
    <img :src="backgroundImage" alt="" class="w-full h-auto object-cover" />
    <div class="absolute inset-0 p-4 flex items-end justify-between">
      <div class="text-left text-white">
        <h2 class="text-sm font-semibold leading-tight">
          {{ props.for === "favourites" ? "Favourites" : "My Team" }}
        </h2>
        <p class="text-sm opacity-90 mt-1">
          <span v-if="props.for === 'favourites'">{{
            count == 1 ? "1 pokemon" : count + " pokemons"
          }}</span>
          <span v-else>{{ count }}/6 pokemons</span>
        </p>
      </div>
    </div>
  </div>
</template>
