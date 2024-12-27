<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import SearchBar from '@/components/navbar/SearchBar.vue'
import MenuBar from '@/components/navbar/MenuBar.vue'
import { reactive, ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import type { MenuItemType } from '@/types/PropsType'
import { useUserStore } from '@/stores/user'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'

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
    routePath: '/space/472980323',
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
</script>

<template>
  <div class="header">
    <a-row>
      <a-col :span="8" class="flex-col">
        <a-flex class="header-col">
          <div class="logo">
            <img
              width="100%"
              height="100%"
              :src="`${ASSETS_BASE_URL}/logo.svg`"
              alt="logo"
            />
          </div>
          <MenuBar :menu-items="menuLeftItems" />
        </a-flex>
      </a-col>
      <a-col :span="8" class="flex-col">
        <a-flex class="header-col">
          <SearchBar />
        </a-flex>
      </a-col>
      <a-col :span="8" class="flex-col">
        <a-flex class="header-col">
          <div class="user-info">
            <a-popover placement="bottom">
              <template #content>
                <p>uid: {{ userInfo.uid }}</p>
                <p>username: {{ userInfo.username }}</p>
                <p>spaceUrl: {{ userInfo.spaceUrl }}</p>
                <p>desc: {{ userInfo.desc }}</p>
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
          </div>
          <MenuBar :menu-items="menuRightItems" />
        </a-flex>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.header {
  padding: 0 8px;
  display: flex;
  justify-content: center;
}

.header-col {
  justify-content: center;
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
