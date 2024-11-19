<template lang="">
  <div
    class="text-center d-flex justify-content-center align-items-center mt-5"
  >
    <div>
      <i
        class="fa-solid fa-triangle-exclamation text-warning display-1 mb-4"
      ></i>

      <h2>404 Not found</h2>
      <p>Pagina non trovata</p>
      <router-link
        :to="{ name: 'dashboard' }"
        class="rounded-0 btn btn-sm btn-main"
      >
        Torna alla dashboard
      </router-link>
    </div>
  </div>
</template>
<script setup></script>
<style lang=""></style>
