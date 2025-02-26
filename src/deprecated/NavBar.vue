<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import SearchBar from '@/components/navbar/search/SearchBar.vue'
import MenuBar from '@/deprecated/MenuBar.vue'
import { onMounted, ref } from 'vue'
import type { MenuItemType } from '@/types/PropsType'
import { useUserStore } from '@/stores/user'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import UserInfoPopout from '@/components/navbar/user/UserInfoPopover.vue'
import LoginPopout from '@/deprecated/LoginPopout.vue'
import LoginModal from '@/components/navbar/user/LoginModal.vue'
import { useTokenStore } from '@/stores/token'

// Menu
const menuLeftItems = ref<MenuItemType[]>([
  {
    id: 0,
    label: '首页',
    routePath: '/',
    url: 'https://bilibili.com',
    desc: 'PiliPili',
  },
  {
    id: 1,
    label: '分区1',
    routePath: '/',
    url: '#',
    desc: '',
  },
  {
    id: 2,
    label: '分区2',
    routePath: '/',
    url: '#',
    desc: '',
  },
  {
    id: 3,
    label: '分区3',
    routePath: '/',
    url: '#',
    desc: '',
  },
])
const menuRightItems = ref<MenuItemType[]>([
  {
    id: 100,
    label: '会员',
    routePath: '/',
    url: 'https://space.bilibili.com/472980323',
    desc: 'PiliPili',
  },
  {
    id: 101,
    label: '功能1',
    routePath: '/',
    url: 'https://bing.com',
    desc: '',
  },
  {
    id: 102,
    label: '功能2',
    routePath: '/',
    url: 'https://ifconfig.me',
    desc: '',
  },
  {
    id: 103,
    label: '功能3',
    routePath: '/',
    url: 'https://www.gov.cn',
    desc: '',
  },
])

// Avatar
const user = useUserStore()
const token = useTokenStore()

// 登录弹窗
const loginModalVisible = ref<boolean>(false)

function openLoginModal() {
  loginModalVisible.value = true

}

function handleCancel() {
  // message.info('handleCancel')
  // user.clearUserInfo()
  loginModalVisible.value = false
}

function handleOk() {
  // message.info('handleOk')
  // user.fetchDemoUserInfo()
  loginModalVisible.value = false
}

onMounted(() => {
  user.fetchCurrentUserInfo()
})

</script>

<template>
  <div class="header">
    <a-row>
      <a-col :span="8" class="flex-col">
        <div class="header-col">
          <div class="logo">
            <img
              width="100%"
              height="100%"
              :src="`${ASSETS_BASE_URL}/logo.svg`"
              alt="logo"
            />
          </div>
          <MenuBar :menu-items="menuLeftItems" />
        </div>
      </a-col>
      <a-col :span="8" class="flex-col">
        <div class="header-col">
          <SearchBar />
        </div>
      </a-col>
      <a-col :span="8" class="flex-col">
        <div class="header-col">
          <div class="user-info">
            <UserInfoPopout v-if="token.isLogin" />
            <LoginPopout v-else @openLoginModal="openLoginModal" />
          </div>
          <MenuBar :menu-items="menuRightItems" />
        </div>
      </a-col>
    </a-row>

    <!--    登录弹窗-->
    <LoginModal
      ref="loginModalRef"
      v-model:visible="loginModalVisible"
      @close="handleCancel"
      @commit="handleOk"
    />
  </div>
</template>

<style scoped>
.header {
  padding: 0 8px;
  display: flex;
  justify-content: center;
}

.header-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-col {
  display: flex;
  justify-content: center;
}

.logo {
  width: 40px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 10px 12px;
}

.user-info {
  margin: 10px 12px;
  cursor: pointer;
}
</style>
