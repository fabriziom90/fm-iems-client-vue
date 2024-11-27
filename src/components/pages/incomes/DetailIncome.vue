<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toast-notification";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import LineChart from "../../components/LineChart.vue";
import Loader from "../../components/Loader.vue";

import { store } from "../../../store.js";

const incomes = ref([]);
let showEdit = ref(false);
let thisIncome = ref(null);
let total = ref(0);
let isModalVisible = ref(false);
let incomeValue = ref(null);
let incomeCustomer = ref("");
let incomeDelete = ref(null);
let loaded = ref(false);

const route = useRoute();
const $toast = useToast();

const getYearIncomes = () => {
  axios
    .get("http://localhost:4000/incomes/get_distinct_incomes", {
      params: { year: route.params.year, id: store.user.userId },
    })
    .then((resp) => {
      incomes.value = resp.data.incomes[0];
      totalIncomes(incomes.value);
      setTimeout(() => {
        loaded.value = true;
      }, 1500);
    });
};

onMounted(() => {
  getYearIncomes();
});

const totalIncomes = (incomes) => {
  incomes.months.forEach((month) => {
    total.value += month.incomes.reduce((prev, curr) => {
      return (prev = prev + parseFloat(curr.value, 2));
    }, 0);
  });

  return total.value.toFixed(2);
};

function setIncome(income) {
  thisIncome.value = income;
  showEdit.value = !showEdit.value;

  if (!showEdit.value) {
    updateIncome();
    incomeValue.value = null;
    incomeCustomer.value = "";
  }
}

const updateIncome = () => {
  let data = {
    income_id: thisIncome.value.income_id,
    value: incomeValue.value,
    customer: incomeCustomer.value,
  };

  if (incomeValue.value !== null) {
    data.value = incomeValue.value;
  }

  if (incomeCustomer.value != "") {
    data.customer = incomeCustomer.value;
  }

  if (thisIncome.value != data.value || thisIncome.customer != data.customer) {
    axios.put("http://localhost:4000/incomes/update", data).then((resp) => {
      const { result, message } = resp.data;
      if (result) {
        $toast.success(message, {
          position: "top-right",
          duration: 3000,
        });
      } else {
        $toast.success(message, {
          position: "top-right",
          duration: 3000,
        });
      }
      getYearIncomes();
      thisIncome.value = null;
    });
  }
};

const confirmDelete = () => {
  let params = {
    income_id: incomeDelete.value,
  };

  axios
    .delete("http://localhost:4000/incomes/delete", { data: params })
    .then((resp) => {
      const { result, message } = resp.data;
      if (result) {
        $toast.success(message, {
          position: "top-right",
          duration: 3000,
        });

        closeModal();
      } else {
        $toast.success(message, {
          position: "top-right",
          duration: 3000,
        });
      }
      getYearIncomes();
    });
};

function closeModal() {
  isModalVisible.value = false;
}

watch(thisIncome, (newValue) => {
  if (newValue != null) {
    incomeValue.value = newValue.value;
    incomeCustomer.value = newValue.customer;
  }
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
              :to="{ name: 'index-incomes' }"
              class="btn btn-sm btn-main border-0"
            >
              Entrate
            </router-link>
            <router-link
              :to="{ name: 'add-income' }"
              class="rounded-0 btn btn-sm btn-success ms-2"
            >
              Aggiungi entrata
            </router-link>
          </div>
        </div>
      </div>
      <div class="row" v-if="!loaded">
        <div class="col-12">
          <Loader />
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-6">
          <LineChart :months="incomes.months" :type="1" />
        </div>
        <div class="col-6">
          <table class="table table-striped" id="detail">
            <tbody>
              <tr
                :key="`detail-income-${index}`"
                v-for="(month, index) in incomes.months"
              >
                <td class="p-0">
                  <div class="head-cell">Mese</div>
                  <div class="p-2">{{ month.month }}</div>
                </td>
                <td class="p-0">
                  <div class="head-cell height-30px"></div>
                  <div
                    class="p-2"
                    v-for="income in month.incomes"
                    :key="`income-${income}`"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div
                          class="d-flex"
                          v-if="
                            showEdit &&
                            thisIncome.income_id === income.income_id
                          "
                        >
                          <input
                            type="text"
                            class="form-control form-control-sm me-1"
                            v-model="incomeValue"
                            placeholder="Importo"
                          />
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            v-model="incomeCustomer"
                            placeholder="Cliente"
                          />
                        </div>

                        <span v-else>
                          <strong>{{ income.customer }} </strong>
                          - {{ income.value.toFixed(2) }}€
                        </span>
                      </div>
                      <div>
                        <button
                          class="btn btn-sm btn-warning me-1"
                          @click="
                            {
                              setIncome(income);
                            }
                          "
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-square btn-danger me-2"
                          @click="
                            () => {
                              isModalVisible = true;
                              incomeDelete = income.income_id;
                            }
                          "
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="head-cell mt-2 border-bottom border-dark">
                    {{
                      month.incomes
                        .reduce((prev, curr) => {
                          return (prev = prev + curr.value);
                        }, 0)
                        .toFixed(2)
                    }}€
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p-0 head-cell">Totale</td>
                <td class="p-0 full-total text-white bg-success">
                  <div>{{ total }}€</div>
                </td>
              </tr>
            </tbody>
          </table>
          <ConfirmationModal
            v-if="isModalVisible"
            @close="closeModal"
            @handleConfirmDelete="confirmDelete"
            :title="'Sei sicuro di voler cancellare questa entrata?'"
            :description="'Una volta cancellata questa entrata, non potrà più essere recuperata. Vuoi procedere?'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
