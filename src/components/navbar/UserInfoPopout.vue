<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">

import { reactive } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { authAPI } from '@/api/auth/AuthAPI'
import { message } from 'ant-design-vue'
import { useTokenStore } from '@/stores/token'

const user = useUserStore()
const userInfo = reactive(user.userInfo)
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

function handleLogout() {
  const username = useTokenStore().tokenInfo?.username || ''
  authAPI.logout(username)
    .then(({ code, msg }) => {
      if (code === 200) {
        user.clearUserInfo()
        useTokenStore().clearTokenInfo()
        message.success('logout success')
      } else {
        message.error(msg)
      }
    })
}

</script>

<template>
  <a-popover placement="bottom">
    <template #content>
      <p>uid: {{ userInfo.uid }}</p>
      <p>username: {{ userInfo.username }}</p>
      <p>spaceUrl: {{ userInfo.spaceUrl }}</p>
      <p>desc: {{ userInfo.desc }}</p>
      <a-button danger ghost @click="handleLogout">退出登录</a-button>
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
        <UserOutlined />
      </template>
    </a-avatar>
  </a-popover>
</template>

<style scoped>

</style>
