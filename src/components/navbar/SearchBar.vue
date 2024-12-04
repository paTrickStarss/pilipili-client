<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const contentValue = ref<string>()

const onSearch = (value: string) => {
  message.info(`onSearch: ${value}`)
}
</script>

<template>
  <div>
    <a-input-search
      placeholder="Enter something"
      class="search-input"
      v-model="contentValue"
      @search="onSearch"
    />
  </div>
</template>

<style scoped>
.search-input {
  width: 300px;
  padding: 12px 16px;
}
</style>
