<template>
  <section class="image-grid">
    <!-- Skeleton loader if data is being fetched (loading = true) -->
    <div
      class="grid-wrapper"
      v-if="loading"
    >
      <div
        class="image"
        v-for="num in 8"
        :key="num"
      >
        <skeleton-loader></skeleton-loader>
      </div>
    </div>

    <!-- Show this div as soon as loading = false and there is no request erro -->
    <div v-if="!loading && unsplashData">
      <!-- If the returned data array > 0 i.e if at least one image is returned -->
      <div
        class="grid-wrapper"
        v-if="unsplashData.length"
      >
        <div
          class="image animate-grid"
          v-for="data in unsplashData"
          :key="data.id"
          @click="toggleModal(data.id)"
        >
          <!-- Image Overlay to show good "image to text" contrast -->
          <div class="img-overlay"></div>
          <!-- Image Component with lazy load directive to lazy load the images -->
          <image-item
            :imageUrl="data.urls.small"
            :imageAlt="
              data.alt_description ? data.alt_description : 'Somewhere on earth'
            "
          ></image-item>
          <!--  -->
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

      <!-- Else, if the returned data arrar is empty, i.e "no images found", display this text -->
      <div
        v-else-if="!unsplashData.length"
        class="no-result"
      >
        <p>
          <!-- With face-palm emoji -->
          <span> Ooops ! &#129318;&#127998;</span><br />
          No Image Found
        </p>
      </div>
    </div>

    <!-- Else, if an error is encountered -->
    <div
      v-if="errorMessage"
      class="no-result"
    >
      <div>
        <span> Error {{ errorMessage.status }} &#128543; </span><br />

        <div v-if="errorMessage.data.errors.length">
          <div
            v-for="error in errorMessage.data.errors"
            :key="error"
          >
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import SkeletonLoader from "@/components/Loader//SkeletonLoader.vue";
import ImageItem from "@/components/ImageItem.vue";

// Config
export default {
  components: {
    SkeletonLoader,
    ImageItem,
  },
  computed: {
    ...mapGetters(["loading", "unsplashData", "errorMessage"]),
  },
  methods: {
    ...mapActions(["toggleModal"]),
  },
};
</script>


// Styles
<style lang="scss">
.image-grid {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: -2.8rem;
  margin-bottom: 3rem;

  .image {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    // Image overlay css
    .img-overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 80px;
      transition: all 2s;
      background: rgb(0, 0, 0);
      background: linear-gradient(
        360deg,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.75) 25%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.25) 75%,
        rgba(0, 0, 0, 0) 100%
      );
      opacity: 0.8;
      z-index: 5;
    }

    // Styling passed into the ImageItem-Component
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: all 0.6s;
    }

    // Animate image scale on hover
    img:hover {
      transform: scale(1.05);
    }
  }

  // Animate the grid
  .animate-grid {
    animation: ani-grid 1.5s ease forwards;
  }

  // Css for image text
  .bottom-left {
    position: absolute;
    bottom: 20px;
    left: 16px;
    color: #fff;
    font-size: 1rem;
    z-index: 10;
  }

  .bottom-left p {
    font-size: 0.8rem;
  }

  // Css for text displayed when no result is found
  .no-result {
    margin: auto;
    text-align: center;
    padding-top: 10rem;
    font-size: 1.5rem;
    color: $primary-color;
  }
  .no-result span {
    display: inline-block;
    color: $secondary-color;
    padding-bottom: 1rem;
  }

  // Grid display on screens larger than md
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

  @keyframes ani-grid {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
