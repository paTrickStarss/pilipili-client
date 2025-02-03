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
      <h3>请登录或注册</h3>
    </template>
    <template #title>
<!--      <span>Title</span>-->
    </template>
    <a-avatar
      :style="avatarStyle"
      @mouseenter="avatarMouseEnter"
      @mouseleave="avatarMouseLeave"
      @click="$emit('openLoginModal')"
      style="background-color: #66ccff; width: 50px; height: 50px;"
    >
      <template #icon>
        <div style="padding-top: 0.5rem; font-size: .85em">
          登录
        </div>
      </template>
    </a-avatar>
  </a-popover>
</template>

<style scoped>

</style>
