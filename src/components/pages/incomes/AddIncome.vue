<template lang="">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mt-3">
        <h2>Aggiungi Entrata</h2>
      </div>
      <div class="col-12">
        <form class="background-main p-4">
          <Form
            :years="years"
            :months="months"
            v-model="formData"
            @handleFormData="submitForm"
          />
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { store } from "../../../store.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import Form from "../../components/Form.vue";
import { useToast } from "vue-toast-notification";

const years = ref([]);
const months = ref([]);
const formData = ref({});

const $toast = useToast();
const router = useRouter();

onMounted(() => {
  axios.get("http://localhost:4000/years").then((resp) => {
    years.value = resp.data.years;
  });

  axios.get("http://localhost:4000/months").then((resp) => {
    months.value = resp.data.months;
  });
});

const submitForm = (data) => {
  data.user = store.user;

  axios.post("http://localhost:4000/incomes/store", data).then((res) => {
    const { result, message } = res.data;
    if (result) {
      $toast.success(message, {
        position: "top-right",
        duration: 3000,
      });

      setTimeout(function () {
        router.push({ name: "index-incomes" });
      }, 3400);
    } else {
      $toast.error(message, {
        position: "top-right",
        duration: 3000,
      });
    }
  });
};
</script>
<style lang=""></style>
