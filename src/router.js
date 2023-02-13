import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/HomeComp.vue';
import TaskComp from './pages/TaskComp.vue';


const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'tasks', path: '/tasks', component: TaskComp }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;