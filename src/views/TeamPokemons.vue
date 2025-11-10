<script setup lang="ts">
import PokemonList from '../components/pokemon/PokemonList.vue';
import { useTeamStore } from '../stores/team';
const teamStore = useTeamStore();

const teamIds = teamStore.getMembers();
</script>
<template>
    <div class="max-w-screen min-h-screen min-w-screen mx-auto p-4 bg-linear-to-br from-[#A127E7] to-[#651DAD]">
    <div class="max-w-3xl mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4 text-left">My Team</h1>
        <div v-if="teamIds.length === 0" class="flex justify-center items-center py-12">
            <span class="text-white text-3xl font-semibold">No team members yet.</span>
        </div>
        <PokemonList :onlyIds="teamIds"/>
    </div>
    </div>
</template>