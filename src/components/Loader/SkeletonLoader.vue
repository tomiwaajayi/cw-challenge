<template>
  <div class="card-skeleton">
    <div class="animated-skeleton-background">
      <div class="skeleton-mask-container">
        <div class="skeleton-mask skeleton-mask-1"></div>
        <div class="skeleton-mask skeleton-mask-2"></div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-skeleton {
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: #fff;
  border-radius: 10px;
}

.animated-skeleton-background {
  animation: skeleton-ani 1s linear infinite forwards;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: #f5f5f5;
  background: linear-gradient(90deg, #eee 8%, rgb(227, 227, 227) 18%, #eee 33%);
  background-size: 800px 104px;
  height: 100%;
  position: relative;
  border-radius: 10px;
}

.skeleton-mask-container {
  position: relative;
}

.skeleton-mask {
  background: #e6e6e6;
  position: absolute;
  z-index: 5;
}

.skeleton-mask-1 {
  width: 30%;
  height: 15px;
  left: 15px;
  top: 55px;
}

.skeleton-mask-2 {
  width: 50%;
  height: 15px;
  top: 30px;
  left: 15px;
}

@keyframes skeleton-ani {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    background-position: -468px 0;
  }
  to {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    background-position: 468px 0;
  }
}
</style>