<script setup>
import axios from "axios";
import { store } from "../../store.js";

import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
</script>
<template lang="">
  <div className="d-flex full-height">
    <Sidebar title="FM-IEMS" subtitle="FM Income Exits Management System" />
    <main>
      <Header :user="store.user" />
      <router-view></router-view>
    </main>
  </div>
</template>
<style lang=""></style>
