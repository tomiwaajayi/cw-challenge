<template>
  <section class="search-component">
    <!-- Search Form  -->
    <form class="form" @submit.prevent="getPhotos">
      <!-- Search Icon -->
      <img class="search-icon" src="@/assets/svg/search.svg" alt="" />
      <!-- Search Bar -->
      <input
        type="text"
        placeholder="Search for Photo"
        class="search-bar"
        v-model="query"
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
import { mapActions, mapGetters } from "vuex";
import { debounce } from "lodash";
export default {
  data: () => ({
    //search query
    query: "",
  }),

  mounted() {
    // Get latest African images on page load
    this.$store.dispatch("getPhotosOnLoad");
  },
  methods: {
    ...mapActions(["getPhotos", "getPhotosOnLoad"]),
    getPhotos: debounce(
      function () {
        this.$store.dispatch("getPhotos", this.query);
      },
      1500,
      { leading: true, trailing: false }
    ),
    // Method called from the input event
    searchOnInput: debounce(function () {
      if (this.query.trim()) {
        this.getPhotos();
      }
    }, 1500),
  },
  computed: {
    ...mapGetters(["searchingFor", "searchedFor"]),
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
      text-indent: 45px;
      color: inherit;
    }

    .search-bar::placeholder {
      color: $primary-color;
    }

    .search-icon {
      width: 1.2rem;
      position: absolute;
      top: 30px;
      left: 35px;
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
        text-indent: 40px;
      }

      .search-icon {
        width: 1rem;
        position: absolute;
        top: 18px;
        left: 25px;
        font-size: 1rem;
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
