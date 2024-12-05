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
  <!--  <div class="modal-container" v-if="visible">-->
  <!--    <div class="modal-body">-->
  <!--      <a-button @click="$emit('close')">关闭</a-button>-->
  <!--    </div>-->
  <!--  </div>-->

  <div>
    <a-modal v-model:open="visible" title="Title">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
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
    </a-modal>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
