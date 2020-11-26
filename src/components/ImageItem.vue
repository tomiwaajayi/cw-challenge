<template>
  <figure v-lazyload class="image__wrapper">
    <image-spinner class="image__spinner" />
    <img class="image__item" :data-url="imageUrl" :alt="imageAlt" />
  </figure>
</template>

<script>
// Lazyload animation
import ImageSpinner from "./Loader/ImageSpinner";

export default {
  name: "ImageItem",
  components: {
    ImageSpinner,
  },
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.image {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &.loaded {
      .image {
        &__item {
          visibility: visible;
          opacity: 1;
          border: 0;
        }

        &__spinner {
          display: none;
          width: 100%;
        }
      }
    }
  }

  &__item {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
}
</style>