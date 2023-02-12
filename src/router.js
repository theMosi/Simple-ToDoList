import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/HomeComp.vue';


const routes = [
    { name: 'home', path: '/', component: Home }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;