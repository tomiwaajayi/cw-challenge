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


// Styles
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Quicksand", sans-serif;
}
</style>
