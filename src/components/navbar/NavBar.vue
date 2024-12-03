<script setup lang="ts">
import SearchBar from '@/components/navbar/SearchBar.vue'
import MenuBar from '@/components/navbar/MenuBar.vue'
import { h, reactive, ref } from 'vue'
import { AppstoreOutlined, MailOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { MenuItemType } from '@/utils/PropsType'


// Menu
const menuLeftItems = ref<MenuItemType[]>([
  {
    id: 0,
    label: '首页',
    url: 'https://bilibili.com',
    desc: 'PiliPili'
  },
  {
    id: 1,
    label: '分区1',
    url: '#',
    desc: ''
  },
  {
    id: 2,
    label: '分区2',
    url: '#',
    desc: ''
  },
  {
    id: 3,
    label: '分区3',
    url: '#',
    desc: ''
  },
])
const menuRightItems = ref<MenuItemType[]>([
  {
    id: 100,
    label: '会员',
    url: 'https://space.bilibili.com/472980323',
    desc: 'PiliPili'
  },
  {
    id: 101,
    label: '功能1',
    url: 'https://bing.com',
    desc: ''
  },
  {
    id: 102,
    label: '功能2',
    url: 'https://ifconfig.me',
    desc: ''
  },
  {
    id: 103,
    label: '功能3',
    url: 'https://www.gov.cn',
    desc: ''
  },
])


// Avatar
const avatarStyle = reactive({
  transform: 'translate(0, 0) scale(1)',
  transition: 'transform 0.3s',
})
const avatarMouseEnter = () => {
  console.log('avatarMouseEnter', avatarStyle)
  avatarStyle.transform = 'translate(0, 13px) scale(1.5)'
}
const avatarMouseLeave = () => {
  console.log('avatarMouseLeave', avatarStyle)
  avatarStyle.transform = 'translate(0, 0) scale(1)'
}

</script>

<template>
  <div class="header">
    <a-row>
      <a-col :span="8" class="flex-col">
        <a-flex class="header-col">
          <div class="logo" >
            <a-image
              width="100%" height="100%"
              src="src/assets/logo.svg" :preview="false"
            />
          </div>
          <MenuBar :menu-items="menuLeftItems" />
        </a-flex>
      </a-col>
      <a-col :span="8" class="flex-col">
        <a-flex class="header-col">
          <SearchBar/>
        </a-flex>
      </a-col>
      <a-col :span="8" class="flex-col">
        <a-flex class="header-col">
          <div class="user-info">
            <a-popover placement="bottom">
              <template #content>
                <p>Content</p>
                <p>Content</p>
              </template>
              <template #title>
                <span>Title</span>
              </template>
              <a-avatar
                :style="avatarStyle"
                @mouseenter="avatarMouseEnter"
                @mouseleave="avatarMouseLeave"
                style="background-color: #87d068"
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
  background: rgb(255, 255, 255, .8) !important;
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
.menu-bar {
  line-height: 32px;
  width: 450px;
  align-items: center;
  background: rgb(255, 255, 255, .8) !important;
}

.user-info {
  margin: 10px 12px;
}
/*
.user-info-popover:hover {
  transform: translate(0, 13px) scale(1.5);
  transition: transform .3s;
}*/
</style>
