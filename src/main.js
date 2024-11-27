import { createApp } from 'vue'
import App from './App.vue'

import {router} from './router.js'
import ToastPlugin from 'vue-toast-notification';
import VueApexCharts from 'vue3-apexcharts';
import 'vue-toast-notification/dist/theme-bootstrap.css';

createApp(App).use(VueApexCharts).use(router).use(ToastPlugin).mount('#app')
