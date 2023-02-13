import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";





export const useTaskStore = defineStore('task', {

    state: () => {
        return {
            tasks: []
        }
    },
    getters: {
        allTasks(state) {
            return state.tasks
        }
    },
    actions: {
        async fetchTasks() {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
                this.tasks = res.data;
            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "We have a problem here!!",
                    icon: "error",
                    confirmButtonText: "OK-_-",
                })
            }
        },

        async filterTasks(limit) {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
                this.tasks = res.data;
            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "We have a problem here!!",
                    icon: "error",
                    confirmButtonText: "OK-_-",
                })
            }
        },

        async storeTask(title) {
            try {
                const res = await axios.post(`https://jsonplaceholder.typicode.com/todos`, {
                    title: title,
                    completed: false,
                });

                this.tasks.unshift(res.data);

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

        async updateTask(task) {
            try {
                const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                    title: task.title,
                    id: task.id,
                    completed: !task.completed,
                });

                const index = this.tasks.findIndex(task => task.id === res.data.id);

                if (index != -1) {
                    this.tasks.splice(index, 1, res.data);
                }

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
        },

        async deleteTask(id) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

                this.tasks = this.tasks.filter(task => task.id != id)

                Swal.fire({
                    title: "Task deleted :) ",
                    icon: "warning",
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
