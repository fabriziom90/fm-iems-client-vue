<template lang="">
  <div className="d-flex full-height">
    <Sidebar title="FM-IEMS" subtitle="FM Income Exits Management System" />
    <main>
      <Header :user="store.user" />
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup>
import axios from "axios";
import { store } from "../../store.js";
import { router } from "../../router.js";

import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import MainLayout from "../layouts/MainLayout.vue";

import { ref, onMounted } from "vue";

const getUserInfo = () => {
  axios.get("http://localhost:4000/users/get-user-info").then((resp) => {
    if (resp.data.result) {
      store.user = resp.data.user;
    } else {
      router.push({ name: "login" });
    }
  });
};

onMounted(() => {
  getUserInfo();
});
</script>
<style lang=""></style>
