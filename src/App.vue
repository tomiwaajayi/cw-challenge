<template>
  <div id="app">
    <search-section></search-section>
    <image-grid></image-grid>
  </div>
</template>

<script>
// Imports
import SearchSection from "@/components/SearchSection.vue";
import ImageGrid from "@/components/ImageGrid.vue";

// Config
export default {
  name: "app",
  components: {
    SearchSection,
    ImageGrid,
  },
};
</script>
