<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { RightOutlined, UserOutlined } from '@ant-design/icons-vue'
import { reactive } from 'vue'

defineProps({
  href: {
    type: String,
    default: '#',
  },
  title: {
    type: String,
    default: 'Title',
  },
})

const linkItemStyle = reactive({
  backgroundColor: '#fff',
})
const linkItemMouseEnter = () => {
  linkItemStyle.backgroundColor = '#e4e4e4'
}
const linkItemMouseLeave = () => {
  linkItemStyle.backgroundColor = '#fff'
}
</script>

<template>
  <a
    :href="href"
    target="_blank"
    class="single-link-item"
    @mouseenter="linkItemMouseEnter"
    @mouseleave="linkItemMouseLeave"
    :style="linkItemStyle"
  >
    <div class="link-title">
      <slot name="icon">
        <UserOutlined />
      </slot>
      <span class="link-title__text">{{ title }}</span>
    </div>
    <RightOutlined />
  </a>
</template>

<style scoped>
.single-link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 0 14px;
  height: 38px;
  border-radius: 8px;
  color: grey;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.link-title {
  display: flex;
  align-items: center;
}

.link-title__text {
  margin-left: 10px;
}
</style>
