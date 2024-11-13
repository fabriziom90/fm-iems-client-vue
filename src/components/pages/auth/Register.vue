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
                <label htmlFor="" class="control-label">
                  Nome e cognome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  placeholder="Nome e cognome"
                  
                />
              </div>
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
                  
                />
              </div>
              <div class="my-3">
                <label htmlFor="" class="control-label">
                  Conferma password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  class="form-control"
                  placeholder="Conferma password"
                  
                />
              </div>
              <div class="my-4">
                <button class="btn-main" onClick={register}>
                  Accedi
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
</template>
<script setup>

</script>
<style lang="">
    
</style>