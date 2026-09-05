<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import GlobalPopover from '@/components/global/GlobalPopover.vue'
const LoginModal = defineAsyncComponent(() => import('@/components/navbar/user/LoginModal.vue'))
import { defineAsyncComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const loginModalVisible = ref(false)
const route = useRoute()
watch(() => route.query.login, value => { loginModalVisible.value = value === '1' }, { immediate: true })
</script>

<template>
  <div>
    <GlobalPopover>
      <template #trigger>
        <div class="right-entry__outside go-login-btn">
          <button type="button" class="header-login-entry" @click="loginModalVisible = true">
            <span>登录</span>
          </button>
        </div>
      </template>

      <div class="login-popover">
        <span>请登录或注册</span>
      </div>
    </GlobalPopover>
    <LoginModal v-if="loginModalVisible" v-model:visible="loginModalVisible" />
  </div>
</template>

<style scoped>
.header-login-entry {
  border: 0;
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
