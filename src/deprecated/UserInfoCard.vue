<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'

const userStore = useUserStore()
const userInfo = reactive(userStore.userInfo)
</script>

<template>
  <div class="container">
    <div class="top-container">
      <a-avatar :size="64" style="background-color: #66ccff">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="username-item">
        <b>{{ userInfo.nickname }}</b>
      </div>
    </div>
    <div class="info-container">
      <div class="info-item">
        <span class="info-label">uid: </span>{{ userInfo.uid }}
      </div>
      <div class="info-item">
        <span class="info-label">个人介绍: </span>{{ userInfo.description }}
      </div>
      <div class="info-item">
        <span class="info-label">空间URL: </span>{{ userInfo.spaceUrl }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 5px 30px;
}

.top-container {
  display: flex;
  align-items: flex-end;
  padding: 10px;
}

.username-item {
  padding: 2px 20px;
  font-family: 'Harmony Font', sans-serif;
  font-size: 1.3em;
}

.info-container {
  margin-block: 10px;
}

.info-item {
  block-size: 30px;
}

.info-label {
  margin-inline-end: 10px;
  color: grey;
  user-select: none;
}
</style>
