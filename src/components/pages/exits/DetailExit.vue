<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toast-notification";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import LineChart from "../../components/LineChart.vue";
import Loader from "../../components/Loader.vue";

import { store } from "../../../store.js";

const exits = ref([]);
let showEdit = ref(false);
let thisExit = ref(null);
let total = ref(0);
let isModalVisible = ref(false);
let exitValue = ref(null);
let exitCustomer = ref("");
let exitDelete = ref(null);
let loaded = ref(false);

const route = useRoute();
const $toast = useToast();

const getYearexits = () => {
  axios
    .get("http://localhost:4000/exits/get_distinct_exits", {
      params: { year: route.params.year, id: store.user.userId },
    })
    .then((resp) => {
      exits.value = resp.data.exits[0];
      totalExits(exits.value);
      setTimeout(() => {
        loaded.value = true;
      }, 1500);
    });
};

onMounted(() => {
  getYearexits();
});

const totalExits = (exits) => {
  exits.months.forEach((month) => {
    total.value += month.exits.reduce((prev, curr) => {
      return (prev = prev + parseFloat(curr.value, 2));
    }, 0);
  });

  return total.value.toFixed(2);
};

function setExit(exit) {
  thisExit.value = exit;
  showEdit.value = !showEdit.value;

  if (!showEdit.value) {
    updateExit();
    exitValue.value = null;
    exitCustomer.value = "";
  }
}

const updateExit = () => {
  let data = {
    exit_id: thisExit.value.exit_id,
    value: exitValue.value,
    customer: exitCustomer.value,
  };

  if (exitValue.value !== null) {
    data.value = exitValue.value;
  }

  if (exitCustomer.value != "") {
    data.customer = exitCustomer.value;
  }

  if (thisExit.value != data.value || thisExit.customer != data.customer) {
    axios.put("http://localhost:4000/exits/update", data).then((resp) => {
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
      getYearexits();
      thisExit.value = null;
    });
  }
};

const confirmDelete = () => {
  let params = {
    exit_id: exitDelete.value,
  };

  axios
    .delete("http://localhost:4000/exits/delete", { data: params })
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
      getYearexits();
    });
};

function closeModal() {
  isModalVisible.value = false;
}

watch(thisExit, (newValue) => {
  if (newValue != null) {
    exitValue.value = newValue.value;
    exitCustomer.value = newValue.customer;
  }
});
</script>
<template lang="">
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center my-3">
          <h2>Dettaglio uscite anno {{ exits.year }}</h2>
          <div>
            <router-link
              :to="{ name: 'index-exits' }"
              class="btn btn-sm btn-main border-0"
            >
              Uscite
            </router-link>
            <router-link
              :to="{ name: 'add-exit' }"
              class="rounded-0 btn btn-sm btn-danger ms-2"
            >
              Aggiungi uscita
            </router-link>
          </div>
        </div>
      </div>
      <div class="row" v-if="!loaded">
        <div class="col-12"><Loader /></div>
      </div>
      <div class="row" v-else>
        <div class="col-12" v-if="exits.months.length > 0">
          <div class="row">
            <div class="col-6">
              <LineChart :months="exits.months" :type="2" />
            </div>
            <div class="col-6">
              <table class="table table-striped" id="detail">
                <tbody>
                  <tr
                    :key="`detail-exit-${index}`"
                    v-for="(month, index) in exits.months"
                  >
                    <td class="p-0">
                      <div class="head-cell">Mese</div>
                      <div class="p-2">{{ month.month }}</div>
                    </td>
                    <td class="p-0">
                      <div class="head-cell height-30px"></div>
                      <div
                        class="p-2"
                        v-for="exit in month.exits"
                        :key="`exit-${exit}`"
                      >
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <div
                              class="d-flex"
                              v-if="
                                showEdit && thisExit.exit_id === exit.exit_id
                              "
                            >
                              <input
                                type="text"
                                class="form-control form-control-sm me-1"
                                v-model="exitValue"
                                placeholder="Importo"
                              />
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                v-model="exitCustomer"
                                placeholder="Cliente"
                              />
                            </div>

                            <span v-else>
                              <strong>{{ exit.customer }} </strong>
                              - {{ exit.value.toFixed(2) }}€
                            </span>
                          </div>
                          <div>
                            <button
                              class="btn btn-sm btn-warning me-1"
                              @click="
                                {
                                  setExit(exit);
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
                                  exitDelete = exit.exit_id;
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
                          month.exits
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
                :title="'Sei sicuro di voler cancellare questa uscita?'"
                :description="'Una volta cancellata questa uscita, non potrà più essere recuperata. Vuoi procedere?'"
              />
            </div>
          </div>
        </div>
        <div class="col-12">
          <h2 class="text-center">
            Non sono state inserite uscite per l'anno selezionato
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
