<script setup lang="ts">
import { ref } from 'vue'

// const props = defineProps({
//   content: {
//     type: String,
//     default: '',
//     required: true
//   }
// })

const contentValue = ref<string>()
</script>

<template>
  <div>
    <a-input-search
      placeholder="Enter something"
      class="search-input"
      v-model="contentValue"
    />
  </div>
</template>

<style scoped>
.search-input {
  width: 300px;
  padding: 12px 16px;
}
</style>
