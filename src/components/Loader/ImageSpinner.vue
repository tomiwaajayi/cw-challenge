// Ripple animation animation component for lazy loading images
<template>
  <div class="ripple-ani">
    <div class="circle"></div>
    <div class="circle inner-circle"></div>
  </div>
</template>

<style lang="scss" scoped>
.ripple-ani {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;

  .circle {
    position: absolute;
    border: 2px solid #253858;
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .inner-circle {
    animation-delay: -0.5s;
    border: 8px solid #6d7b91;
  }
}

// Animation while loading images
@keyframes ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>

