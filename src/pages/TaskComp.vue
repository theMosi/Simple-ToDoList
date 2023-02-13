<template>
  <h2>Task Comp</h2>

  {{ tasks }}
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {

  setup() {

    const store = useStore();
    const tasks = computed(() => store.getters.allTasks)

    function fetchTasks() {
      store.dispatch('fetchTasks');
    }

    fetchTasks()

    return { tasks }

  }

}
</script>

