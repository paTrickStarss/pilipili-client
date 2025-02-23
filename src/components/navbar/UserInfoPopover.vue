<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
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

const showPop = ref<number>(-1)
const user = useUserStore()
const userInfo = reactive(user.userInfo)
const avatarMouseEnter = () => {
  showPop.value = 1
}
const avatarMouseLeave = () => {
  showPop.value = 0
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

onMounted(() => {
  user.fetchCurrentUserInfo()
})

</script>

<template>
  <GlobalPopover @mouseenter="avatarMouseEnter" @mouseleave="avatarMouseLeave"
                 wrap-class="header-avatar-wrap"
                 :content-style="{ marginTop: '0px', marginLeft: '-28px' }"
                 content-class="avatar-popover"
  >
      <template #trigger>
        <div class="header-avatar-wrap--container" :class="`mini-avatar--${showPop == 1? 'large': showPop == 0? 'small':'init'}`">
<!--          小头像-->
          <a
            href="//space.bilibili.com/472980323"
            target="_blank"
            class="header-entry-mini"
          >
            <picture class="v-img">
              <source :srcset="`${ASSETS_BASE_URL}/avatar/avatar-1.jpg@128w_128h_1c_1s.webp`" type="image/webp" />
              <img src="//i0.hdslb.com/bfs/face/5738c58cb8a8d3717f6cd8545bd5e1eda37e17c1.jpg@120w_120h_1c" alt="" loading="lazy" />
            </picture>
          </a>
<!--          大头像-->
          <a
            href="//space.bilibili.com/472980323"
            target="_blank"
            class="header-entry-avatar"
          >
            <div
              class="pili-avatar"
              style="width: 82px; height: 82px; transform: translate(0px, 0px)"
            >
              <img class="pili-avatar-img pili-avatar-face pili-avatar-img-radius"
                   :src="`${ASSETS_BASE_URL}/avatar/avatar-1.jpg@128w_128h_1c_1s.webp`"
                   alt=""
              />
              <span class="pili-avatar-icon pili-avatar-right-icon pili-avatar-icon-big-vip pili-avatar-size-82" ></span>
            </div>
          </a>
        </div>
      </template>

      <div class="avatar-panel-popover">
        <!--      头像占位-->
        <div class="big-avatar"></div>
        <!--      昵称-->
        <a
          class="nickname-item"
          :class="`${userInfo.vipStatus !== 0? 'vip-nickname':''}`"
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
          <a class="level" target="_blank" href="#">
            <i class="vui_icon level-icon" :class="`sic-BDC_svg-user_level_${userInfo.level}`" style="font-size: 28px;"></i>
          </a>
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
.avatar-panel-popover {
  padding: 0 24px 18px;
  width: 300px;
  border-radius: 8px;
  background-color: var(--bg1_float);
}
.big-avatar {
  width: 50px;
  height: 60px;
  opacity: 0;
}
.nickname-item {
  display: block;
  text-align: center;
  font-size: 18px;
  margin-top: -15px;
}
.nickname-item.vip-nickname {
  color: rgb(251, 114, 153);
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
  margin: 12px;
  padding: 0 20px;
}
.single-count-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: color .2s;
}
.single-count-item * {
  margin-bottom: 5px;
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

@keyframes fadeOut {
  0% {
    opacity: 1
  }
  to {
    opacity: 0
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0
  }
  to {
    opacity: 1
  }
}
@keyframes avatarFadeLarge {
  0% {
    opacity: 0;
    transform: scale(.4) translateY(-2px) translate(3px)
  }
  30% {
    opacity: 1
  }
  to {
    opacity: 1;
    transform: scale(1) translate(-36px,10px)
  }
}
@keyframes avatarFadeSmall {
  0% {
    transform: scale(1) translate(-36px,10px)
  }
  60% {
    opacity: 1
  }
  to {
    opacity: 0;
    transform: scale(.4) translateY(-2px) translate(3px)
  }
}
.header-entry-mini {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 2;
  display: block;
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
.mini-avatar--small .header-entry-mini {
  animation: fadeIn .6s both;
}
.mini-avatar--large .header-entry-mini {
  animation: fadeOut .6s both;
}
.header-entry-mini .v-img {
  border-radius: 50%;
  background-color: transparent;
}
.header-entry-mini .v-img>img {
  border: 2px solid #fff;
  border-radius: 50%;
  image-rendering: -webkit-optimize-contrast;
}
.header-entry-avatar {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 2;
  display: block;
  border-radius: 50%;
  transform-origin: top left;
}
.mini-avatar--init .header-entry-avatar {
  display: none;
}
.mini-avatar--small .header-entry-avatar {
  animation: avatarFadeSmall .35s both;
}
.mini-avatar--large .header-entry-avatar {
  animation: avatarFadeLarge .35s both;
}

.header-avatar-wrap .header-avatar-wrap--container .pili-avatar {
  box-sizing: content-box;
  border: 2px solid #fff;
}

.pili-avatar-face {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
}
.pili-avatar-img {
  border: none;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
}
.pili-avatar-img-radius {
  border-radius: 50%;
}
.pili-avatar-img {
  transform: translateZ(0);
  will-change: transform;
}
.pili-avatar-face {
  top: 0;
  left: 0;
}
.pili-avatar-icon-big-vip {
  background-image: url("@/assets/icons/big-vip.svg");
}
.pili-avatar-right-icon {
  width: 27.5%;
  height: 27.5%;
  position: absolute;
  right: 0;
  bottom: -1px;
  background-size: cover;
  image-rendering: -webkit-optimize-contrast;
}
</style>
