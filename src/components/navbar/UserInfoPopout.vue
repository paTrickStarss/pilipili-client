<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { UserOutlined, FileSearchOutlined, DeploymentUnitOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { authAPI } from '@/api/auth/AuthAPI'
import { message } from 'ant-design-vue'
import { useTokenStore } from '@/stores/token'
import { openLink } from '@/utils/RouterUtil'
import { useRouter } from 'vue-router'
import GlobalPopover from '@/components/global/GlobalPopover.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import LinkItem from '@/components/userInfoPopout/LinkItem.vue'
import ClickItem from '@/components/userInfoPopout/ClickItem.vue'

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

const nickNameStyle = reactive({
  color: 'rgb(0,0,0)',
})
watch(userInfo, () => init())

function init() {
  nickNameStyle.color =
    userInfo.vipStatus === 0 ? 'rgb(0,0,0)' : 'rgb(251, 114, 153)'
}

function handleLogout() {
  const username = useTokenStore().tokenInfo?.username || ''
  authAPI.logout(username).then(({ code, msg }) => {
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
  <GlobalPopover @mouseenter="avatarMouseEnter" @mouseleave="avatarMouseLeave">
    <template #trigger>
      <a-avatar
        class="avatar-item"
        :style="avatarStyle"
        @click="openLink(`/space/${userInfo.uid}`)"
      >
        <template #icon>
          <div style="padding-top: 0.5rem">
            <UserOutlined />
          </div>
        </template>
      </a-avatar>
    </template>

    <div class="user-info-popover">
<!--      头像占位-->
      <div class="big-avatar"></div>
<!--      昵称-->
      <a
        class="nickname-item"
        :style="nickNameStyle"
        :href="`/space/${userInfo.uid}`"
        target="_blank"
      >
        {{ userInfo.nickname }}
      </a>
<!--      vip状态 等级状态-->
      <div class="vip-item">
        <a href="#" target="_blank" class="vip-item-label" style="width: 78px; height: 20px">
          <img
            :src="`${ASSETS_BASE_URL}/icons/vip_${userInfo.vipStatus}.png`"
            alt="vip item label image."
          />
        </a>
        <a href="#" target="_blank">level: {{ userInfo.exp }}(exp)</a>
      </div>
<!--      硬币 P币-->
      <div class="coin-item">
        <a href="#" target="_blank">
          <span class="coin-item__text">硬币：</span>
          <span class="coin-item__num">{{ userInfo.hcoin }}</span>
        </a>
        <a href="#" target="_blank">
          <span class="coin-item__text">P币：</span>
          <span class="coin-item__num">{{ userInfo.pcoin }}</span>
        </a>
      </div>
<!--      统计数据-->
      <div class="count-item">
        <a href="" target="_blank" class="single-count-item">
          <div class="count-item__num">0</div>
          <div class="count-item__text">关注</div>
        </a>
        <a href="" target="_blank" class="single-count-item">
          <div class="count-item__num">0</div>
          <div class="count-item__text">粉丝</div>
        </a>
        <a href="" target="_blank" class="single-count-item">
          <div class="count-item__num">0</div>
          <div class="count-item__text">动态</div>
        </a>
      </div>
<!--      快捷链接-->
      <div class="links-item">
        <LinkItem href="#" title="个人中心">
          <template #icon>
            <UserOutlined/>
          </template>
        </LinkItem>
        <LinkItem href="#" title="投稿管理">
          <template #icon>
            <FileSearchOutlined/>
          </template>
        </LinkItem>
        <LinkItem href="#" title="推荐服务">
          <template #icon>
            <DeploymentUnitOutlined/>
          </template>
        </LinkItem>
      </div>
      <div class="split-line"></div>
      <ClickItem @click="handleLogout" title="退出登录">
        <template #icon>
          <LogoutOutlined />
        </template>
      </ClickItem>
    </div>
  </GlobalPopover>
</template>

<style scoped>
.avatar-item {
  background-color: #66ccff;
  width: 50px;
  height: 50px;
  z-index: 1002;
}

.user-info-popover {
  width: 300px;
  min-height: 300px;
  padding: 0 24px 18px;
}
.big-avatar {
  width: 50px;
  height: 50px;
  opacity: 0;
}
.nickname-item {
  display: block;
  text-align: center;
  font-size: 18px;
  margin-top: -15px;
}
.vip-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
}
.vip-item-label {
  display: flex;
}
.vip-item-img {
  position: relative;
  display: inline-block;
  line-height: 1;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background-color: transparent;
  object-fit: contain;
}
.coin-item {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 6px;
  font-size: 12px;
}
.coin-item__text {
  display: inline-block;
  margin-right: 5px;
  color: gray;
}
.coin-item__num {
  display: inline-block;
  margin-right: 10px;
  color: #18191c;
}
.count-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 20px;
}
.single-count-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: color .2s;
}
.count-item__text {
  color: grey;
  font-weight: 400;
  font-size: 12px;
  transition: color .2s;
}
.count-item__num {
  color: #18191c;
  font-size: 18px;
  transition: color .2s;
}
.split-line {
  margin: 10px 0;
  width: 100%;
  height: 1px;
  background-color: #c5c5c5;
}
</style>
