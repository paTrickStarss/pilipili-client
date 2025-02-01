<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">

import { reactive } from 'vue'

const avatarStyle = reactive({
  transform: 'translate(0, 0) scale(1)',
  transition: 'transform 0.3s',
})
const avatarMouseEnter = () => {
  avatarStyle.transform = 'translate(0, 13px) scale(1.5)'
}
const avatarMouseLeave = () => {
  avatarStyle.transform = 'translate(0, 0) scale(1)'
}

</script>

<template>
  <a-popover placement="bottom">
    <template #content>
      <p>请登录或注册</p>
    </template>
    <template #title>
      <span>Title</span>
    </template>
    <a-avatar
      :style="avatarStyle"
      @mouseenter="avatarMouseEnter"
      @mouseleave="avatarMouseLeave"
      @click="$emit('openLoginModal')"
      style="background-color: #66ccff"
    >
      <template #icon>
        登录
      </template>
    </a-avatar>
  </a-popover>
</template>

<style scoped>

</style>
