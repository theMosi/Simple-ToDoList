<template>
    <div class="row">
        <div class="col-md-2 mb-4">
            <h4>Create Tasks :</h4>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
    setup() {
        const store = useStore();
        const number = ref();

        function filterTasks() {
            store.dispatch("filterTasks", number.value);
        }

        return { filterTasks, number }
    }
}
</script>