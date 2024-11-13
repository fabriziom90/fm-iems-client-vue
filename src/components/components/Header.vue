<template lang="">
    <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="content-header">
                <div className="float-end my-2">
                    <div class="dropdown">
                        
                        <button className="btn btn-sm btn-transparent btn-circle border-white text-white"
                        id="dropdown-user" @click="showDropdown = !showDropdown">
                          <i class="fas fa-user"></i>
                        </button>
                        <div class="dropdown-container" v-if="showDropdown">
                            <ul class="list-unstyled">
                              <li>Ciao</li>
                              <li><router-link class="dropdown-item" to="/logout">Logout</router-link></li>
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
    import { ref } from 'vue';
    
    const showDropdown = ref(false);


</script>
<style lang="scss" scoped>
    .dropdown-container{
        position: fixed;
        top: 50px;
        right: 20px;
        box-shadow: 0px 0px 8px 0px #000000;
        color: #000;
        width: 175px;
        padding: 20px;
        background-color: #fff;
        ul{
            margin: 0px;
        }
    }
</style>