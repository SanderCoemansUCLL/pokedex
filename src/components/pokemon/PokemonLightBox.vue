<script setup lang="ts">
import { ref } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
const props = defineProps(['sprites']);

const visible = ref(false);

const openLightbox = () => {
  visible.value = true;
};

const onHide = () => {
  visible.value = false;
};

const imageLinks = [
    props.sprites.front_default,
    props.sprites.back_default,
    props.sprites.front_shiny,
    props.sprites.back_shiny,
    props.sprites.front_female,
    props.sprites.back_female,
    props.sprites.front_shiny_female,
    props.sprites.back_shiny_female
]
</script>

<template>
    <div class="flex justify-center">
    <img
      :src="props.sprites.front_default"
      alt="pokemon"
      class="w-48 h-48 object-cover transform overflow-visible cursor-pointer"
      @click="openLightbox"
    />

    <VueEasyLightbox
      :visible="visible"
      :imgs="imageLinks"
      :index="0"
      @hide="onHide"
    />
  </div>
</template>