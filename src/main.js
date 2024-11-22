import { createApp } from 'vue'
import App from './App.vue'

import {router} from './router.js'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

createApp(App).use(router).use(ToastPlugin).mount('#app')
