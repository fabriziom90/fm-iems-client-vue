<template lang="">
  <div class="content mt-3 mx-4">
    <div class="container-full">
      <div class="row gy-3">
        <div class="col-12">
          <h2>Riepilogo tasse</h2>
          <Loader v-if="!loaded" />
          <Table :data="data" :months="months" :type="3" v-else />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";

import Table from "../../components/Table.vue";
import Loader from "../../components/Loader.vue";

import { ref, onMounted, watch } from "vue";
import { store } from "../../../store.js";

const months = [
  "Gen",
  "Feb",
  "Mar",
  "Apr",
  "Mag",
  "Giu",
  "Lug",
  "Ago",
  "Set",
  "Ott",
  "Nov",
  "Dic",
];

let data = ref([]);
let loaded = ref(false);

onMounted(async () => {
  await axios
    .get("http://localhost:4000/incomes/net_amount", {
      params: { id: store.user.userId },
    })
    .then((resp) => {
      data.value = resp.data.net_amounts;
      setTimeout(() => {
        loaded.value = true;
      }, 1800);
    });
});
</script>
<style lang=""></style>
