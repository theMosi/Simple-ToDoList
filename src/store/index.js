import axios from "axios";
import { createStore } from "vuex";

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
                console.log(err);
            }
        }
    }
})

export default store;