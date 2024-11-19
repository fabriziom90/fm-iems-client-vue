import { reactive } from 'vue';

export const store = reactive({
    baseUrl: "http://localhost:4000",
    user: null
});