<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import GlobalPopover from '@/components/global/GlobalPopover.vue'
import LoginModal from '@/components/navbar/user/LoginModal.vue'
import { ref } from 'vue'

const loginModalVisible = ref<boolean>(false)
</script>

<template>
  <div>
    <GlobalPopover>
      <template #trigger>
        <div class="right-entry__outside go-login-btn">
          <div class="header-login-entry" @click="loginModalVisible = true">
            <span>登录</span>
          </div>
        </div>
      </template>

      <div class="login-popover">
        <span>请登录或注册</span>
      </div>
    </GlobalPopover>
    <LoginModal v-model:visible="loginModalVisible" />
  </div>
</template>

<style scoped>
.header-login-entry {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  background: #00aeec;
  text-align: center;
  letter-spacing: 0;
  font-size: 14px;
  line-height: 36px;
}

.header-login-entry span {
  user-select: none;
  cursor: pointer;
}

.login-popover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 50px;
}
</style>
