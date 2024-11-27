<script setup>
import axios from "axios";

import ConfirmationModal from "./ConfirmationModal.vue";
import { useToast } from "vue-toast-notification";
import { ref, defineEmits } from "vue";

const props = defineProps({
  months: Array,
  data: Array,
  type: Number,
});

let isModalVisible = ref(false);
let year_id = ref(null);
const $toast = useToast();

const emit = defineEmits(["handleReloadTable"]);

function rowTotal(values) {
  let total = 0;
  values.forEach((elem) => {
    if (elem != null) {
      total += elem;
    }
  });

  return total.toFixed(2);
}

function setBgColor(type, value) {
  if (type === 0) {
    if (value > 0) {
      return `head-cell bg-success`;
    } else {
      return `head-cell bg-danger`;
    }
  } else if (type === 1) {
    return `head-cell bg-success`;
  } else if (type === 2) {
    return `head-cell bg-danger`;
  } else {
    return `head-cell bg-warning`;
  }
}

function setClassResults(type, value) {
  if (type === 0) {
    if (value > 0) {
      return `text-success`;
    } else {
      return `text-danger`;
    }
  } else {
    return "";
  }
}

function confirmDelete() {
  let params = {
    year_id: year_id.value,
  };

  axios
    .delete("http://localhost:4000/years/delete", { data: params })
    .then((resp) => {
      const { result, message } = resp.data;
      if (result) {
        $toast.success(message, {
          position: "top-right",
          duration: 3000,
        });
        closeModal();
        emit("handleReloadTable");
      } else {
        $toast.error(message, {
          position: "top-right",
          duration: 3000,
        });
      }
    });
}

function closeModal() {
  isModalVisible.value = false;
}
</script>
<template lang="">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Anno</th>
        <th v-for="(month, index) in months" :key="`month-${index}`">
          {{ month }}
        </th>

        <th class="head-cell">Totale</th>
        <th>Tools</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(year, index) in data">
        <td>{{ year.year }}</td>
        <td v-for="(month, i) in year.months" :key="`month-value-${i}`">
          <div v-if="month != null" :class="setClassResults(type, month)">
            {{ month.toFixed(2) }}€
          </div>
          <div v-else>-</div>
        </td>
        <td :class="setBgColor(type, rowTotal(year.months))">
          {{ rowTotal(year.months) }}
        </td>
        <td>
          <div v-if="type === 0">
            <router-link
              class="btn btn-sm btn-main"
              :to="{ name: 'detail-year', params: { year: year.year } }"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <button
              class="btn btn-sm btn-square btn-danger ms-2"
              @click="
                () => {
                  isModalVisible = true;
                  year_id = year.year_id;
                }
              "
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div v-else-if="type === 1">
            <router-link
              :to="{ name: 'detail-incomes', params: { year: year.year } }"
              class="btn btn-sm btn-main"
            >
              <i class="fas fa-eye"></i>
            </router-link>
          </div>
          <div v-else-if="type === 2">
            <router-link
              :to="{ name: 'detail-exits', params: { year: year.year } }"
              class="btn btn-sm btn-main"
            >
              <i class="fas fa-eye"></i>
            </router-link>
          </div>
          <div v-else>
            <router-link
              :to="{ name: 'detail-taxes', params: { year: year.year } }"
              class="btn btn-sm btn-main"
            >
              <i class="fas fa-eye"></i>
            </router-link>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ConfirmationModal
    v-if="isModalVisible"
    @close="closeModal"
    @handleConfirmDelete="confirmDelete"
    :title="'Sei sicuro di voler cancellare questo anno?'"
    :text="'Una volta cancellato questo anno, verranno eliminate anche le relative entrate ed uscite e non sarà più possibile recuperarle. Vuoi procedere?'"
    :type="type"
  />
</template>

<style lang=""></style>
