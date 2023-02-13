<template>
    <div class="row">
        <div class="col-md-12 mb-4">
            <h4>Create Tasks :</h4>
            <form @submit.prevent="storeTask" class="row">
                <div class="col-md-6">
                    <input v-model="title" type="text" class="form-control">
                    <div class="form-text text-danger">
                        {{ titleErrorText }}
                    </div>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-dark">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
    setup() {
        const store = useStore();
        const title = ref("");
        const titleErrorText = ref("");

        function storeTask() {
            if (title.value === "") {
                titleErrorText.value = "Title is Requried.";
            } else {
                titleErrorText.value = "";

            }
        }

        return { storeTask, title, titleErrorText }
    }
}
</script>