<script setup>
import axios from "axios";
import { router } from "../../../router.js";

import { useToast } from "vue-toast-notification";

import { ref, onMounted } from "vue";

const $toast = useToast();
const email = ref("");
const password = ref("");
let loginStatus = ref(false);

axios.defaults.withCredentials = true;

onMounted(() => {
  checkLogin();
});

const checkLogin = () => {
  axios.get("http://localhost:4000/users/login").then((resp) => {
    if (resp.data.loggedIn) {
      loginStatus.value = true;
    }
  });
};

const login = () => {
  const data = {
    email: email.value,
    password: password.value,
  };

  axios.post("http://localhost:4000/users/login", data).then((resp) => {
    const { auth, message, token } = resp.data;

    if (auth) {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      $toast.success(message, {
        position: "top-right",
        duration: 3000,
      });

      setTimeout(() => {
        router.push({ name: "dashboard" });
      }, 3100);
    } else {
      $toast.error(message, {
        position: "top-right",
        duration: 3000,
      });
    }
  });
};
</script>
<template lang="">
  <div class="background-main vh-100 vw-100">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="form-card">
        <div class="text-end">
          <router-link
            :to="{ name: 'dashboard' }"
            class="me-3"
            v-if="loginStatus"
          >
            Vai alla tua Dashboard
          </router-link>
          <router-link to="/register">Registrati</router-link>
        </div>
        <div class="logo justify-content-center">
          <img src="/mylogo.png" alt="FM-IEMS" />
          <h2>FM-IEMS</h2>
        </div>
        <div class="text-center my-3">
          <h2>Fabrizio Mastrobattista - Income Exits Management System</h2>
        </div>
        <div class="form">
          <div class="my-3">
            <label for="" class="control-label"> Email </label>
            <input
              type="text"
              name="email"
              id="email"
              class="form-control"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="my-3">
            <label for="" class="control-label"> Password </label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="my-4">
            <button class="btn-main" @click="login">Accedi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
