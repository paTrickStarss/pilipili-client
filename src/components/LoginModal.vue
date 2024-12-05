<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'

const visible = defineModel('visible', { required: true })
defineEmits({
  /**
   * modal关闭事件
   */
  close: () => true,
  /**
   * 登录提交事件
   */
  commit: () => true,
})
const loading = ref<boolean>(false)
</script>

<template>
  <div>
    <a-modal v-model:open="visible" title="Title">
      <template #footer>
        <a-button key="back" @click="$emit('close')">Return</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="$emit('commit')"
          >Submit
        </a-button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<style scoped></style>
