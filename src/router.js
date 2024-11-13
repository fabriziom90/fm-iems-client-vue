import { createRouter, createWebHistory } from 'vue-router';

import Login from './components/pages/auth/Login.vue';
import Register from './components/pages/auth/Register.vue';
import Dashboard from './components/pages/Dashboard.vue';
import IndexYear from './components/pages/years/IndexYear.vue';
import MainLayout from './components/layouts/MainLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/admin',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: Dashboard
                },
                {
                    path: 'years',
                    children: [
                        {
                            path: '',
                            name: 'add-year',
                            component: IndexYear
                        }
                    ]
                }
            ]
        }
    ]
})

export { router }