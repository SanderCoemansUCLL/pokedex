<script setup lang="ts">
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
const props = defineProps(["sprites"]);
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
};

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
  props.sprites.back_shiny_female,
];

const existingImageLinks = imageLinks.filter(
  (link) => link !== null && link !== undefined
);
</script>

<template>
  <div class="flex justify-center">
    <Carousel v-bind="carouselConfig" class="w-full max-w-md">
      <Slide v-for="(src, index) in existingImageLinks" :key="index">
        <div class="flex items-center justify-center p-4">
          <img
            :src="src"
            alt="sprite"
            class="w-full h-48 object-contain cursor-pointer"
            @click="openLightbox"
          />
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <VueEasyLightbox
      :visible="visible"
      :imgs="imageLinks"
      :index="0"
      @hide="onHide"
    />
  </div>
</template>
