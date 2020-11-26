<template>
  <div id="app">
    <!-- Search Secion -->
    <search-section></search-section>
    <!-- Image Grid -->
    <image-grid></image-grid>
    <!-- Image Modal -->
    <image-modal
      v-if="isModalVisible"
      @close="setIsModalVisible(false)"
      :imageData="selectedImage"
    >
    </image-modal>
  </div>
</template>

<script>
// Imports
import { mapActions, mapGetters, mapMutations } from "vuex";
import SearchSection from "@/components/SearchSection.vue";
import ImageGrid from "@/components/ImageGrid.vue";
import ImageModal from "@/components/Modal/ImageModal.vue";

// Config
export default {
  name: "app",
  components: {
    SearchSection,
    ImageGrid,
    ImageModal,
  },
  computed: {
    ...mapGetters(["selectedImage", "isModalVisible"]),
  },
  methods: {
    ...mapActions(["setIsModalVisible"]),
    ...mapMutations(["setIsModalVisible"]),
  },
};
</script>
