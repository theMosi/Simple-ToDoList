import axios from "axios";
import { createStore } from "vuex";
import Swal from "sweetalert2";

const store = createStore({
    state: {
        task: []
    },
    getters: {
        allTasks(state) {
            return state.task
        }
    },
    mutations: {
        setTasks(state, tasks) {
            state.task = tasks;
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
        }
    }
})

export default store;