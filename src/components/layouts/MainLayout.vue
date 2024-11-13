<template lang="">
    <div className="d-flex full-height">
        <Sidebar title="FM-IEMS" subtitle="FM Income Exits Management System" />
        <main>
          <Header />
          <router-view></router-view>
        </main>
        
      </div>
</template>
<script setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import MainLayout from '../layouts/MainLayout.vue';

</script>
<style lang="">
    
</style>