<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import { ASSETS_BASE_URL } from '@/utils/imgUtil'

interface CommentUserInfoProps {
  uid: number
  nickname: string
  level: number
}
defineProps<{
  userInfo: CommentUserInfoProps
}>()
</script>

<template>
  <div class="info">
    <div class="user-name">
      <a :href="`/space/${userInfo.uid}`" target="_blank">
        {{ userInfo.nickname }}
      </a>
    </div>
    <div class="user-level">
      <img
        :src="`${ASSETS_BASE_URL}/icons/user_level_${userInfo.level}.svg`"
        alt=""
        width="25" height="25"
      >
    </div>
  </div>
</template>

<style scoped>
.info {
  display: inline-flex;
  align-items: center;
}
.info {
  --bili-comment-user-info-name-color: var(--text2);
}
.info .user-name {
  color: var(--bili-comment-user-info-name-color);
  font-size: var(--bili-comments-font-size-name, 13px);
  font-weight: 500;
}
.info .user-level {
  margin-left: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
}
</style>
