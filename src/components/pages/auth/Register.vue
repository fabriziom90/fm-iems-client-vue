<template lang="">
  <div class="background-main vh-100 vw-100">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="form-card">
        <div class="text-end">
          <router-link to="/login">Accedi</router-link>
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
            <label class="control-label"> Nome e cognome </label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              placeholder="Nome e cognome"
              v-model="name"
            />
          </div>
          <div class="my-3">
            <label class="control-label"> Email </label>
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
            <label class="control-label"> Password </label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="my-3">
            <label class="control-label"> Conferma password </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              class="form-control"
              placeholder="Conferma password"
              v-model="confirmPassword"
            />
          </div>
          <div class="my-4">
            <button class="btn-main" @click="register()">Registrati</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import bcrypt from "bcryptjs";
import { useRouter } from "vue-router";

import { useToast } from "vue-toast-notification";

import { ref } from "vue";

let name = ref("");
let email = ref("");
let password = ref("");
let confirmPassword = ref("");

axios.defaults.withCredentials = true;

const $toast = useToast();
const salt = bcrypt.genSaltSync(10);
const router = useRouter();

const register = () => {
  const hashedPassword = bcrypt.hashSync(password.value, salt);
  const hashedConfirmPassword = bcrypt.hashSync(confirmPassword.value, salt);

  const data = {
    name: name.value,
    email: email.value,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  };

  axios
    .post("http://localhost:4000/users/register", data)
    .then((resp, data) => {
      const { result, message, auth, token } = resp.data;

      if (result === true && auth === true) {
        localStorage.setItem("token", token);

        $toast.success(message, {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          router.push({ name: "dashboard" });
        }, 3100);
      } else {
        $toast.error(message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    });
};
</script>
<style lang=""></style>
