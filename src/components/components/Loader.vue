<template lang="">
    <div className="loader-container w-100">
        <div className="h-100 d-flex align-items-center justify-content-center">
            <span className="loader"></span>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>

.loader {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: block;
    margin:15px auto;
    position: relative;
    background: #FFF;
    box-shadow: -24px 0 #FFF, 24px 0 #FFF;
    box-sizing: border-box;
    animation: shadowPulse 2s linear infinite;
  }
  
  @keyframes shadowPulse {
    33% {
      background: #FFF;
      box-shadow: -24px 0 #001060, 24px 0 #FFF;
    }
    66% {
      background: #001060;
      box-shadow: -24px 0 #FFF, 24px 0 #FFF;
    }
    100% {
      background: #FFF;
      box-shadow: -24px 0 #FFF, 24px 0 #001060;
    }
  }
  
  @media screen and (min-width: 991px){
    .form-card{
        min-width: 900px;
    }
  }
</style>