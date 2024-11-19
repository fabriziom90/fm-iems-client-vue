import { createRouter, createWebHistory } from 'vue-router';

import Login from './components/pages/auth/Login.vue';
import Register from './components/pages/auth/Register.vue';
import MainLayout from './components/layouts/MainLayout.vue';
import Dashboard from './components/pages/Dashboard.vue';
import AddYear from './components/pages/years/AddYear.vue';
import DetailYear from './components/pages/years/DetailYear.vue';
import Incomes from './components/pages/incomes/Incomes.vue';
import AddIncome from './components/pages/incomes/AddIncome.vue';
import DetailIncome from './components/pages/incomes/DetailIncome.vue';
import Exits from './components/pages/exits/Exits.vue';
import AddExit from './components/pages/exits/AddExit.vue';
import DetailExit from './components/pages/exits/DetailExit.vue';
import Taxes from './components/pages/taxes/Taxes.vue';
import DetailTaxes from './components/pages/taxes/DetailTaxes.vue';
import NotFound from './components/pages/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            redirect: { name: 'login'}
        },
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
                            path: 'add-year',
                            name: 'add-year',
                            component: AddYear
                            
                        },
                        {
                            path: ':year/detail-year',
                            name: 'detail-year',
                            component: DetailYear
                        }
                    ]
                },
                {
                    path: 'incomes',
                    children: [
                        {
                            path: '',
                            name: 'index-incomes',
                            component: Incomes
                        },
                        {
                            path: 'add-income',
                            name: 'add-income',
                            component: AddIncome
                        },
                        {
                            path:  ':year/detail-incomes',
                            name: 'detail-incomes',
                            component: DetailIncome
                        }
                    ]
                },
                {
                    path: 'exits',
                    children: [
                        {
                            path: '',
                            name: 'index-exits',
                            component: Exits
                        },
                        {
                            path: 'add-exit',
                            name: 'add-exit',
                            component: AddExit
                        },
                        {
                            path:  ':year/detail-exits',
                            name: 'detail-exits',
                            component: DetailExit
                        }
                    ]
                },
                {
                    path: 'taxes',
                    children: [
                        {
                            path: '',
                            name: 'index-taxes',
                            component: Taxes
                        },
                        {
                            path: ':year/detail-taxes',
                            name: 'detail-taxes',
                            component: DetailTaxes
                        }
                        
                    ]
                },
                {
                    path: '*',
                    name: 'not-found',
                    component: NotFound
                }
            ]
        }
    ]
})

export { router }