<template lang="">
  <div class="content mt-3 mx-4">
    <div class="container-full">
      <div class="row gy-3">
        <div class="col-12">
          <router-link
            :to="{ name: 'add-year' }"
            class="rounded-0 btn btn-sm btn-main"
          >
            Aggiungi anno
          </router-link>
          <router-link
            :to="{ name: 'add-income' }"
            class="rounded-0 btn btn-sm btn-success ms-2"
          >
            Aggiungi entrata
          </router-link>
        </div>
        <div class="col-12">
          <h2>Riepilogo</h2>
          <Loader v-if="!loaded" />
          <Table
            :data="data"
            :months="months"
            :type="1"
            @handleReloadTable="reloadTable"
            v-else
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";

import Table from "../../components/Table.vue";
import Loader from "../../components/Loader.vue";
import { store } from "../../../store.js";

import { ref, onMounted } from "vue";

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
    .get("http://localhost:4000/incomes/", {
      params: { id: store.user.userId },
    })
    .then((resp) => {
      data.value = resp.data.incomes;

      setTimeout(() => {
        loaded.value = true;
      }, 1800);
    });
});

const reloadTable = async () => {
  // loaded.value = false
  await axios
    .get("http://localhost:4000/incomes/", {
      params: { id: store.user.userId },
    })
    .then((resp) => {
      data.value = resp.data.incomes;
    });
};
</script>
<style lang=""></style>
