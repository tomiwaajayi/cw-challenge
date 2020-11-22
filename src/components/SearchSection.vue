<template>
  <section class="search-component">
    <!-- Search Form  -->
    <form class="form" @submit.prevent="getPhotos">
      <!-- Search Icon -->
      <span class="fa fa-search"></span>
      <!-- Search Bar -->
      <input
        ref="search"
        type="text"
        placeholder="Search for Photo"
        class="search-bar"
        :disabled="loading"
        @input="searchOnInput"
      />
    </form>
    <!-- You are searching for "search-parameter" -->
    <div class="result-text" v-if="searchingFor">
      <p>
        Searching for
        <span class="search-key">"{{ searchingFor }}"</span>
      </p>
    </div>

    <!-- You searched for "Search-parameter" -->
    <div class="result-text" v-if="searchedFor">
      <p>
        Search Results for
        <span class="search-key">"{{ searchedFor }}"</span>
      </p>
    </div>
  </section>
</template>

<script>
// IMPORTS
import { searchPhotos, getRandomPhotos } from "@/services/unsplash.js";
import { eventBus } from "@/services/EventBus.js";
// Import loadash (to debounce the searchoninput function to prevent the function from being called on every click)
import { debounce } from "lodash";
export default {
  data: () => ({
    loading: false,
    searchingFor: "",
    searchedFor: "",
    unsplashData: null,
  }),

  methods: {
    // Method called from the input event
    searchOnInput: debounce(function () {
      this.getPhotos();
    }, 1500),

    // Method called when images are searched
    getPhotos() {
      let query = this.$refs.search.value;
      // Search parameter for making the api call
      const param = {
        query,
      };
      // Reset searched parameters
      this.searchingFor = "";
      this.searchedFor = "";
      // Set loading state when making API call
      this.loading = true;
      eventBus.$emit("loading", true);
      this.searchingFor = this.$refs.search.value;

      //For this to be scoped in the function below
      let that = this;

      // Search photos
      searchPhotos(param)
        .then((res) => {
          that.unsplashData = res.results;
          eventBus.$emit("unsplashData", that.unsplashData);
          that.loading = false;
          eventBus.$emit("loading", false);
          that.searchingFor = "";
          that.searchedFor = query;
          that.$refs.search.value = "";
        })
        .catch(() => {
          that.searchingFor = "";
          that.searchedFor = "";
          that.$refs.search.value = "";
          that.loading = false;
          that.unsplashData = null;
          eventBus.$emit("unsplashData", that.unsplashData);
          eventBus.$emit("loading", false);
        });
    },
  },

  mounted() {
    // Get random images on page load
    getRandomPhotos()
      .then((res) => {
        this.unsplashData = res;
        eventBus.$emit("unsplashData", this.unsplashData);
        eventBus.$emit("loading", false);
      })
      .catch(() => {
        this.unsplashData = null;
        eventBus.$emit("unsplashData", this.unsplashData);
        eventBus.$emit("loading", false);
      });
  },
};
</script>

<style lang="scss" scoped>
.search-component {
  width: 100%;
  height: 35vh;
  background: #dde2e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form {
    width: 80%;
    position: relative;
    color: $primary-color;

    .search-bar {
      width: 100%;
      padding: 1.75rem;
      border: none;
      outline: none;
      border-radius: 10px;
      font-family: "Quicksand", sans-serif;
      font-size: 1.2rem;
      text-indent: 30px;
      color: inherit;
    }

    .search-bar::placeholder {
      color: $primary-color;
    }

    .fa-search {
      position: absolute;
      top: 30px;
      left: 25px;
      font-size: 1.2rem;
      color: inherit;
    }
  }
  .result-text {
    margin-top: 0.5rem;
    font-size: 2rem;
    color: $primary-color;
  }

  .search-key {
    color: $secondary-color;
  }

  @media (max-width: 960px) {
    height: 200px;

    .form {
      .search-bar {
        padding: 1rem;
        font-size: 1rem;
        text-indent: 45px;
      }

      .fa-search {
        position: absolute;
        top: 18px;
        left: 25px;
        font-size: 1rem;
        color: inherit;
      }
    }

    .result-text {
      margin-top: 0.5rem;
      font-size: 1rem;
      padding: 0 1rem;
      text-align: center;
    }
  }
}
</style>
