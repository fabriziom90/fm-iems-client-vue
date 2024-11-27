<script setup>
import axios from "axios";

import Table from "../components/Table.vue";
import Loader from "../components/Loader.vue";
import { store } from "../../store.js";
import { useRouter } from "vue-router";

import { ref, onMounted, watch } from "vue";

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

const router = useRouter();

onMounted(() => {
  axios.get("http://localhost:4000/users/get-user-info").then((resp) => {
    if (resp.data.result) {
      store.user = resp.data.user;

      axios
        .get("http://localhost:4000/summary/", {
          params: { id: store.user.userId },
        })
        .then((resp) => {
          data.value = resp.data.values;
          setTimeout(() => {
            loaded.value = true;
          }, 1800);
        });
    } else {
      router.push({ name: "login" });
    }
  });
});

const reloadTable = async () => {
  // loaded.value = false
  await axios
    .get("http://localhost:4000/summary/", {
      params: { id: store.user.userId },
    })
    .then((resp) => {
      data.value = resp.data.values;
    });
};
</script>
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
          <router-link
            :to="{ name: 'add-exit' }"
            class="rounded-0 btn btn-sm btn-danger ms-2"
          >
            Aggiungi uscita
          </router-link>
        </div>
        <div class="col-12">
          <h2>Riepilogo</h2>
          <Loader v-if="!loaded" />
          <Table
            :data="data"
            :months="months"
            :type="0"
            @handleReloadTable="reloadTable"
            v-else
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
