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
        },

        updateTask(state, updatedTask) {
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);

            if (index != -1) {
                state.tasks.splice(index, 1, updatedTask);
            }
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
        },

        async updateTask({ commit }, task) {
            try {
                const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                    title: task.title,
                    id: task.id,
                    completed: !task.completed,
                });

                commit('updateTask', res.data);

                Swal.fire({
                    title: "Task updated :) ",
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