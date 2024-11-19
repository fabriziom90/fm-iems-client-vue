<template lang="">
  <header>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="content-header">
            <div className="float-end my-2">
              <div class="dropdown">
                <button
                  className="btn btn-sm btn-transparent btn-circle border-white text-white"
                  id="dropdown-user"
                  @click="showDropdown = !showDropdown"
                >
                  <i class="fas fa-user"></i>
                </button>
                <div class="dropdown-container" v-if="showDropdown">
                  <ul class="list-unstyled">
                    <li>Ciao {{ store.user.user_name }}</li>
                    <li role="button" @click="logout">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { router } from "../../router.js";
import { store } from "../../store.js";

defineProps({
  user: Object,
});

const showDropdown = ref(false);

const logout = () => {
  localStorage.removeItem("token");
  router.push({ name: "login" });
};
</script>
<style lang="scss" scoped>
.dropdown-container {
  position: fixed;
  top: 50px;
  right: 20px;
  box-shadow: 0px 0px 8px 0px #000000;
  color: #000;
  width: 250px;
  padding: 20px;
  background-color: #fff;
  ul {
    margin: 0px;
  }
}
</style>
