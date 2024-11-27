<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toast-notification";

import { store } from "../../../store.js";

const incomes = ref([]);
let totIncomes = ref(0);
let totTaxes = ref(0);
let totNet = ref(0);

const route = useRoute();

const getYearTaxes = () => {
  axios
    .get("http://localhost:4000/taxes/detail", {
      params: { data: route.params.year, id: store.user.userId },
    })
    .then((resp) => {
      incomes.value = resp.data.net_amounts[0];
      sumTotals(incomes.value);
    });
};

const sumTotals = (incomes) => {
  incomes.months.forEach((month) => {
    totIncomes.value += month.incomes.reduce((prev, curr) => {
      return (prev = prev + curr.income);
    }, 0);

    totTaxes.value += month.incomes.reduce((prev, curr) => {
      return (prev = prev + curr.taxes);
    }, 0);

    totNet.value += month.incomes.reduce((prev, curr) => {
      return (prev = prev + curr.net);
    }, 0);
  });
};

onMounted(() => {
  getYearTaxes();
});
</script>
<template lang="">
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center my-3">
          <h2>Dettaglio entrate anno {{ incomes.year }}</h2>
          <div>
            <router-link
              :to="{ name: 'index-taxes' }"
              class="btn btn-sm btn-main border-0"
            >
              Tasse
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-12">
        <table class="table table-striped" id="detail">
          <tbody>
            <tr
              :key="`month-${index}`"
              v-for="(month, index) in incomes.months"
            >
              <td class="p-0">
                <div class="head-cell">Mese</div>
                <div class="p-3">{{ month.month }}</div>
              </td>
              <td class="p-0">
                <div class="head-cell bg-success">Entrate</div>
                <div class="p-3">
                  <div class="pb-3" v-for="income in month.incomes">
                    <strong>{{ income.customer }} </strong> -
                    {{ income.income.toFixed(2) }}€
                  </div>
                  <div class="border-top py-3 border-dark">
                    <strong>Totale: </strong>
                    {{
                      month.incomes
                        .reduce((prev, curr) => {
                          return (prev = prev + curr.income);
                        }, 0)
                        .toFixed(2)
                    }}€
                  </div>
                </div>
              </td>
              <td class="p-0">
                <div class="head-cell bg-danger">Tasse</div>
                <div class="p-3">
                  <div class="pb-3" v-for="income in month.incomes">
                    {{ income.taxes.toFixed(2) }}€
                  </div>
                  <div class="border-top py-3 border-dark">
                    <strong>Totale: </strong>
                    {{
                      month.incomes
                        .reduce((prev, curr) => {
                          return (prev = prev + curr.taxes);
                        }, 0)
                        .toFixed(2)
                    }}€
                  </div>
                </div>
              </td>
              <td class="p-0">
                <div class="head-cell bg-dark">Netto</div>
                <div class="p-3">
                  <div class="pb-3" v-for="income in month.incomes">
                    {{ income.net.toFixed(2) }}€
                  </div>
                  <div class="border-top py-3 border-dark">
                    <strong>Totale: </strong>
                    {{
                      month.incomes
                        .reduce((prev, curr) => {
                          return (prev = prev + curr.net);
                        }, 0)
                        .toFixed(2)
                    }}€
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <strong>Totale: </strong>
                <span class="text-success">{{ totIncomes.toFixed(2) }}€</span>
              </td>
              <td>
                <strong>Totale: </strong>
                <span class="text-danger">{{ totTaxes.toFixed(2) }}€</span>
              </td>
              <td>
                <span> <strong>Totale:</strong> {{ totNet.toFixed(2) }}€ </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
