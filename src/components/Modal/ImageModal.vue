
<template>
  <!-- modal-transition component -->
  <transition name="modal-fade">
    <!-- Modal backfrop -->
    <div class="modal-backdrop" @click.stop="close" v-if="imgData">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <!-- Closr Modal Button -->
        <button
          type="button"
          class="btn-close"
          @click="close"
          aria-label="Close modal"
        >
          x
        </button>

        <!-- Modal Body (Image) -->
        <section class="modal-body" id="modalDescription">
          <img :src="imgData.urls.full" :alt="imgData.alt_description" />
          <skeleton-loader></skeleton-loader>
        </section>

        <!-- Modal Footer -->
        <footer class="modal-footer">
          <h3 class="img-author">
            {{ imgData.user.first_name }}
            {{ imgData.user.last_name }}
          </h3>
          <p class="img-location">
            {{
              imgData.user.location
                ? imgData.user.location
                : "Somewhere on earth"
            }}
          </p>
        </footer>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  name: "image-modal",
  props: ["imgData"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>




<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.531);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;

  .modal {
    background: #ffffff;
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 85%;
    border-radius: 10px;
    position: relative;
    z-index: 100;

    // Modal Body
    .modal-body {
      position: relative;
      height: 80%;
      overflow: hidden;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .modal-body img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .modal-footer {
      padding: 1rem 3rem;
      display: flex;
      flex-direction: column;
      height: 20%;
      border-top: 1px solid #eeeeee;
      justify-content: center;
    }
    .img-author {
      font-size: 1.3rem;
      line-height: 120%;
      color: $primary-color;
    }

    .img-location {
      margin-top: 0.5rem;
      color: $secondary-color;
    }

    .btn-close {
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #fff;
      background: transparent;
      position: absolute;
      right: -15px;
      top: -10px;
      outline: none;
    }

    @media (max-width: 760px) {
      width: 95%;
      height: 70%;
    }

    @media (max-width: 480px) {
      width: 85%;
      height: 50%;

      .img-author {
        font-size: 1rem;
      }

      .img-location {
        margin-top: 0.25rem;
        font-size: 0.7rem;
        color: $primary-color;
        line-height: 100%;
      }

      .modal-footer {
        padding: 1.6rem;
      }
    }
    @media only screen and (max-device-width: 768px) and (orientation: landscape) {
      width: 60%;
      height: 85%;

      .img-author {
        font-size: 1rem;
      }

      .img-location {
        margin-top: 0.25rem;
        font-size: 0.7rem;
        color: $primary-color;
        line-height: 100%;
      }
      //enter code here
    }
  }
}

/* Modal transition */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>