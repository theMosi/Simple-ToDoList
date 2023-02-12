<template>
  <h2>Home</h2>

  {{ count }}
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {

  setup() {
    const store = useStore();
    const count = computed(() => store.state.count)

    return { count }

  }

}
</script>

