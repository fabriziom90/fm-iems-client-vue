<script setup></script>
<template lang="">
  <div className="loader-container w-100">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <span className="loader"></span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  background: #fff;
  box-shadow: -24px 0 #fff, 24px 0 #fff;
  box-sizing: border-box;
  animation: shadowPulse 2s linear infinite;
}

@keyframes shadowPulse {
  33% {
    background: #fff;
    box-shadow: -24px 0 #001060, 24px 0 #fff;
  }
  66% {
    background: #001060;
    box-shadow: -24px 0 #fff, 24px 0 #fff;
  }
  100% {
    background: #fff;
    box-shadow: -24px 0 #fff, 24px 0 #001060;
  }
}

@media screen and (min-width: 991px) {
  .form-card {
    min-width: 900px;
  }
}
</style>
