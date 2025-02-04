<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">

import { reactive, ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { authAPI } from '@/api/auth/AuthAPI'
import { message } from 'ant-design-vue'
import { useTokenStore } from '@/stores/token'
import { jumpRoute } from '@/utils/RouterUtil'
import { useRouter } from 'vue-router'
import GlobalPopover from '@/components/global/GlobalPopover.vue'

const router = useRouter()

const showPop = ref<boolean>(false)
const user = useUserStore()
const userInfo = reactive(user.userInfo)
const avatarStyle = reactive({
  transform: 'translate(0, 0) scale(1)',
  transition: 'transform 0.3s',
})
const avatarMouseEnter = () => {
  avatarStyle.transform = 'translate(0, 30px) scale(1.5)'
  showPop.value = true
}
const avatarMouseLeave = () => {
  avatarStyle.transform = 'translate(0, 0) scale(1)'
  showPop.value = false
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
  <GlobalPopover
    @mouseenter="avatarMouseEnter" @mouseleave="avatarMouseLeave">
    <template #trigger>
      <a-avatar
        class="avatar-item"
        :style="avatarStyle"
        @click="jumpRoute(router, `/space/${userInfo.uid}`)"
      >
        <template #icon>
          <div style="padding-top: 0.5rem">
            <UserOutlined />
          </div>
        </template>
      </a-avatar>
    </template>

    <div class="user-info">
      <div class="nickname-item">
        NickName
      </div>
      <div class="vip-status-item">
        vip
      </div>
      <div class="coin-item">
        coin
      </div>

    </div>

  </GlobalPopover>
</template>

<style scoped>
/*.avatar-wrapper {
  position: relative;
  box-sizing: content-box;
  padding-right: 10px;
  width: 50%;
  height: 50px;
  cursor: pointer;
}*/
.avatar-item {
  background-color: #66ccff;
  width: 50px;
  height: 50px;
  z-index: 1002;
}

.user-info {
  width: 260px;
  height: 400px;
}
</style>
