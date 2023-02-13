<template>

  <div>
    <div v-if="loading" class="container mt-5">
      <div class="row justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div v-else class="container mt-5">
      <CreateTaskComp />
      <hr>
      <FilterTaskComp />
      <div class="row g-3">
        <div v-for="task in tasks" :key="task.id" class="col-md-4">
          <div class="card" :class="{ 'bg-light': task.completed }">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <del v-if="task.completed"> {{ task.title }} </del>
                <div v-else> {{ task.title }} </div>
              </div>

              <div class="d-flex align-items-center">
                <UpdateTaskComp :task="task" />


                <DeleteTaskComp :id="task.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useTaskStore } from '../store/task';
import FilterTaskComp from '../components/tasks/FilterTaskComp.vue';
import CreateTaskComp from '../components/tasks/CreateTaskComp.vue';
import UpdateTaskComp from '../components/tasks/UpdateTaskComp.vue';
import DeleteTaskComp from '../components/tasks/DeleteTaskComp.vue';

export default {
  components: {
    FilterTaskComp,
    CreateTaskComp,
    UpdateTaskComp,
    DeleteTaskComp
  },
  setup() {

    const store = useTaskStore();
    const tasks = computed(() => store.allTasks)
    const loading = ref(false);

    async function fetchTasks() {
      loading.value = true;
      await store.fetchTasks();
      loading.value = false;
    }

    fetchTasks()

    return { tasks, loading }

  }

}
</script>

