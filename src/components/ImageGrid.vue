<template>
  <div class="image-grid container">
    <!-- Skeleton loader if data is being fetched -->
    <div class="grid-wrapper" v-if="loading">
      <div class="image" v-for="num in 8" :key="num">
        <skeleton-loader></skeleton-loader>
      </div>
    </div>

    <div v-if="!loading">
      <div class="grid-wrapper" v-if="unsplashData.length > 0">
        <div
          class="image"
          v-for="data in unsplashData"
          :key="data.id"
          @click="toggleModal(data.id)"
        >
          <img
            :src="data.urls.regular"
            :alt="data.alt_description"
            class="data-image"
          />
          <div class="bottom-left">
            <h3>{{ data.user.first_name }} {{ data.user.last_name }}</h3>
            <p>
              {{
                data.user.location ? data.user.location : "Somewhere on earth"
              }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="no-result">
        <p>
          Ooops ! <br />
          No Image Found
        </p>
      </div>
    </div>
    <!--  -->
    <image-modal v-show="isModalVisible" @close="closeModal" :imgData="imgData">
    </image-modal>
  </div>
</template>


// Script
<script>
// Imports
import SkeletonLoader from "@/components/Loader//SkeletonLoader.vue";
import ImageModal from "@/components/Modal/ImageModal.vue";
import { eventBus } from "@/services/EventBus.js";

// Config
export default {
  components: {
    SkeletonLoader,
    ImageModal,
  },
  data: () => ({
    loading: true,
    unsplashData: null,
    isModalVisible: false,
    imgData: {
      imgSrc: "",
      imgAuthor: "",
      imgLocation: "",
    },
  }),

  created() {
    eventBus.$on("loading", (status) => {
      this.loading = status;
    });
    eventBus.$on("unsplashData", (data) => {
      this.unsplashData = data;
    });
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },

    toggleModal(id) {
      const selectedImg = this.unsplashData.find((el) => el.id === id);
      console.log(selectedImg);
      this.imgData.imgSrc = selectedImg.urls.full;
      this.imgData.imgAuthor =
        selectedImg.user.first_name + " " + selectedImg.user.last_name;
      this.imgData.imgLocation = selectedImg.user.location;
      this.showModal();
    },
  },
};
</script>


// Styles
<style lang="scss">
.container {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: -2.8rem;
  margin-bottom: 3rem;

  .image {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .bottom-left {
    position: absolute;
    bottom: 20px;
    left: 16px;
    z-index: 5;
    color: #fff;
    font-size: 1rem;
  }

  .bottom-left p {
    font-size: 0.8rem;
  }

  .no-result {
    margin: auto;
    text-align: center;
    padding-top: 10rem;
    font-size: 1.5rem;
    color: #263959;
  }

  @media (min-width: 961px) {
    .grid-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-auto-rows: 15px;
      grid-gap: 3.5rem;
      margin: 0 1rem;

      .image:first-child {
        grid-row: 1 / span 5;
      }
      .image:nth-child(2) {
        grid-row: 1 / span 7;
      }
      .image:nth-child(3) {
        grid-row: 1 / span 6;
      }
      .image:nth-child(4) {
        grid-row: 6 / span 6;
      }
      .image:nth-child(5) {
        grid-row: 8 / span 6;
      }
      .image:nth-child(6) {
        grid-row: 7 / span 8;
      }
      .image:nth-child(7) {
        grid-row: 12 / span 7;
      }
      .image:nth-child(8) {
        grid-row: 14 / span 6;
        grid-column: 2 / span 1;
      }
    }
  }

  @media (max-width: 960px) {
    margin-top: 0;
    .grid-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 2rem;
      margin: 2rem 2rem;

      .image {
        border-radius: 10px;
        height: 300px;
      }
    }
  }
}
</style>
