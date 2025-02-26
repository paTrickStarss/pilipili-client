<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">

import { LogoutOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Title'
  }
})

const linkItemStyle = reactive({
  backgroundColor: '#fff',
})
const linkItemMouseEnter = () => {
  linkItemStyle.backgroundColor = '#d5d5d5'
}
const linkItemMouseLeave = () => {
  linkItemStyle.backgroundColor = '#fff'
}
</script>

<template>
  <div class="click-item"
       @mouseenter="linkItemMouseEnter" @mouseleave="linkItemMouseLeave"
       :style="linkItemStyle"
  >
    <slot name="icon">
      <LogoutOutlined />
    </slot>
    <span class="link-title__text">{{ title }}</span>
  </div>
</template>

<style scoped>
.link-title__text {
  margin-left: 10px;
}
.click-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  color: grey;
  font-size: 14px;
  cursor: pointer;
  transition: background-color .3s;
}
</style>
