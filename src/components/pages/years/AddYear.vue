<template lang="">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mt-3">
        <h2>Aggiungi Anno</h2>
      </div>
      <div class="col-12">
        <form class="background-main p-4">
          <div class="row gy-3">
            <div class="col-6">
              <label for="" class="control-label"> Anno </label>
              <select
                name="year"
                id="year"
                v-model="yearSelect"
                class="form-select form-select-sm"
                required
              >
                <option value="">Seleziona l&apos;anno</option>
                <option
                  :key="`year-${index}`"
                  v-for="(year, index) in years"
                  :value="year"
                >
                  {{ year }}
                </option>
              </select>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-sm btn-success mt-4"
                @click="saveYear"
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

import { ref, onMounted } from "vue";

const $toast = useToast();
const router = useRouter();

const years = ref([]);
let yearSelect = ref("");

onMounted(() => {
  let currentYear = new Date().getFullYear();
  years.value = Array.from(new Array(35), (val, index) => currentYear - index);
});

function saveYear() {
  let year = yearSelect.value;

  axios.post("http://localhost:4000/years/store", { year }).then((res) => {
    const { result, message } = res.data;

    if (result === true) {
      $toast.success(message, {
        position: "top-right",
        duration: 3000,
      });

      setTimeout(function () {
        router.push({ name: "dashboard" });
      }, 3100);
    } else {
      $toast.error(message, {
        position: "top-right",
        duration: 3000,
      });
    }
  });
}
</script>
<style lang=""></style>
