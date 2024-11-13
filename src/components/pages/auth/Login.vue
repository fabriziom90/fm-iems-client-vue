<template lang="">
    <div class="background-main vh-100 vw-100">
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="form-card">
            <div class="text-end">
              <!-- {loginStatus ? (
                <NavLink to="/admin" class="me-3">
                  Vai alla tua Dashboard
                </NavLink>
              ) : (
                ""
            )} -->
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
                <label htmlFor="" class="control-label">
                  Email
                </label>
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
                <label htmlFor="" class="control-label">
                  Password
                </label>
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
                <button class="btn-main" onClick={login}>
                  Accedi
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
</template>

<script setup>
import {ref} from 'vue';

const email = ref('');
const password = ref('');

</script>


<style lang="">
    
</style>