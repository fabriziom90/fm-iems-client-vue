<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Loader from "../../components/Loader.vue";
import SummaryTable from "../../components/SummaryTable.vue";
import LineChart from "../../components/LineChart.vue";
import PieChart from "../../components/PieChart.vue";
import { store } from "../../../store.js";

let visible = ref(true);
let loaded = ref(false);
let year = ref("");
let yearMonths = ref([]);

const route = useRoute();

onMounted(() => {
  getYear();
});

const getYear = () => {
  axios
    .get("http://localhost:4000/years/summary", {
      params: { data: route.params.year, id: store.user.userId },
    })
    .then((res) => {
      year.value = res.data.values[0].year;
      yearMonths = res.data.values[0].months;

      setTimeout(() => {
        loaded.value = true;
      }, 1500);
    });
};
</script>
<template lang="">
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="my-2">Dettaglio anno {{ year != 0 ? year : "" }}</h2>
          <router-link
            :to="{ name: 'dashboard' }"
            class="rounded-0 btn btn-sm btn-main"
          >
            Visualizza anni
          </router-link>
        </div>
      </div>
      <div class="col-12 mb-3">
        <button class="btn btn-main" @click="visible = !visible">
          <span v-if="visible">
            Tasse visibili <i class="fas fa-eye"></i>
          </span>
          <span v-else> Tasse nascoste <i class="fas fa-eye-slash"></i> </span>
        </button>
      </div>
      <div class="row" v-if="!loaded">
        <div class="col-12">
          <Loader />
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12">
          <div class="row" v-if="yearMonths.length > 0">
            <div class="col-6">
              <LineChart :months="yearMonths" :type="3" />
              <PieChart :months="yearMonths" :visible="visible" />
            </div>
            <div class="col-6">
              <SummaryTable
                :months="yearMonths"
                :taxesVisible="visible"
                :type="0"
              />
            </div>
          </div>
          <div v-else>
            <h2 class="text-center">
              Non sono state inserite entrate e/o uscite per l'anno selezionato
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
