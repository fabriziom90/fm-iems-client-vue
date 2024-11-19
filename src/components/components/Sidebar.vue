<template lang="">
  <div id="sidebar">
    <div class="top-sidebar px-2">
      <router-link
        :to="{ name: 'dashboard' }"
        class="d-flex align-items-center text-decoration-none text-white"
      >
        <img src="/mylogo.png" alt="FM-IEMS" />
        <h2 class="ms-3">FM-IEMS</h2>
      </router-link>
    </div>
    <div class="bottom-sidebar">
      <ul class="list-unstyled">
        <li class="link">
          <div class="d-flex">
            <div class="p-icon">
              <i class="fa-solid fa-arrow-trend-up"></i>
            </div>
            <router-link to="/admin/incomes">Entrate</router-link>
          </div>
        </li>
        <li class="link">
          <div class="d-flex">
            <div class="p-icon">
              <i class="fa-solid fa-arrow-trend-down"></i>
            </div>
            <router-link to="/admin/exits">Uscite</router-link>
          </div>
        </li>
        <li class="link">
          <div class="d-flex">
            <div class="p-icon">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <router-link to="/admin/taxes">Tasse</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
