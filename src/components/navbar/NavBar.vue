<script setup lang="ts">
import SearchBar from '@/components/navbar/SearchBar.vue'
import { h, ref } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons-vue'


// Menu
const menuLeftSelectedKey = ref<string[]>(['main'])
const menuLeftItems = ref<MenuProps['items']>([
  {
    key: 'main',
    label: '首页',  // 页面上展示的文字
    title: '首页',   // 鼠标hover上去显示的文字
    icon: () => h(AppstoreOutlined)
  },
  {
    key: 'part_1',
    label: '分区1',
    // title: '首页',
    icon: () => h(MailOutlined)
  },
  {
    key: 'part_2',
    label: '分区2',
    // title: '首页',
    icon: () => h(MailOutlined)
  },
  {
    key: 'part_3',
    label: '分区3',
    // title: '首页',
    icon: () => h(MailOutlined)
  },
])

const menuRightSelectedKey = ref<string[]>(['main'])
const menuRightItems = ref<MenuProps['items']>([
  {
    key: 'main',
    label: '会员',  // 页面上展示的文字
    title: '首页',   // 鼠标hover上去显示的文字
    icon: () => h(AppstoreOutlined)
  },
  {
    key: 'part_1',
    label: '功能1',
    // title: '首页',
    icon: () => h(MailOutlined)
  },
  {
    key: 'part_2',
    label: '功能2',
    // title: '首页',
    icon: () => h(MailOutlined)
  },
  {
    key: 'part_3',
    label: '功能3',
    // title: '首页',
    icon: () => h(MailOutlined)
  },
])

</script>

<template>
  <div class="header">
    <a-row>
      <a-col :span="8" class="flex-col">
        <a-flex class="left-part">
          <div class="logo" >

          </div>
          <a-menu
            mode="horizontal"
            class="menu-bar"
            v-model:selected-keys="menuLeftSelectedKey"
            :items="menuLeftItems"
          />
        </a-flex>
      </a-col>
      <a-col :span="8" class="flex-col">
        <a-flex class="middle-part">
          <SearchBar/>
        </a-flex>
      </a-col>
      <a-col :span="8" class="flex-col">
        <a-flex class="right-part">
          <div class="user-info">
            <a-avatar style="background-color: #87d068" icon="user" />
            <a-dropdown>
              <a class="ant-dropdown-link" href="#">
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="#">我的主页</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="#">设置</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="#">退出登录</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <a-menu
            mode="horizontal"
            class="menu-bar"
            v-model:selected-keys="menuRightSelectedKey"
            :items="menuRightItems"
          />
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
.left-part {
  justify-content: center;
}
.middle-part {
  justify-content: center;

}
.right-part {
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
}

.user-info {
  margin: 10px 12px;
}
</style>
