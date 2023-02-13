import axios from "axios";
import { createStore } from "vuex";
import Swal from "sweetalert2";

const store = createStore({
    state: {
        tasks: []
    },
    getters: {
        allTasks(state) {
            return state.tasks
        }
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },

        newTask(state, task) {
            state.tasks.unshift(task)
        }
    },
    actions: {
        async fetchTasks({ commit }) {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
                commit('setTasks', res.data);
            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "We have a problem here!!",
                    icon: "error",
                    confirmButtonText: "OK-_-",
                })
            }
        },

        async filterTasks({ commit }, limit) {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
                commit('setTasks', res.data);
            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "We have a problem here!!",
                    icon: "error",
                    confirmButtonText: "OK-_-",
                })
            }
        },

        async storeTask({ commit }, title) {
            try {
                const res = await axios.post(`https://jsonplaceholder.typicode.com/todos`, {
                    title: title,
                    completed: false,
                });

                commit('newTask', res.data);

                Swal.fire({
                    title: "Task added :) ",
                    icon: "success",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 3000,
                    toast: true,
                    position: 'top',
                })

            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "We have a problem here!!",
                    icon: "error",
                    confirmButtonText: "OK-_-",
                })
            }
        }
    }
})

export default store;