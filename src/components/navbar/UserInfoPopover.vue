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
        <div class="header-avatar-wrap--container" :class="`mini-avatar--${showPop? 'large':'small'}`">
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
/*.avatar-item {
  background-color: #66ccff;
  width: 50px;
  height: 50px;
  z-index: 1002;
}

.user-info-popover {
  width: 300px;
  min-height: 300px;
  padding: 0 24px 18px;
}*/
.avatar-panel-popover {
  padding: 0 24px 18px;
  width: 300px;
  border-radius: 8px;
  background-color: var(--bg1_float);
}
.big-avatar {
  width: 50px;
  height: 80px;
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
.v-img {
  position: relative;
  display: inline-block;
  line-height: 1;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background-color: var(--graph_bg_regular);
}
.header-entry-mini .v-img {
  border-radius: 50%;
  background-color: transparent;
}
.v-img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: inherit;
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
.mini-avatar--small .header-entry-avatar {
  animation: avatarFadeSmall .35s both;
}
.mini-avatar--large .header-entry-avatar {
  animation: avatarFadeLarge .35s both;
}
.pili-avatar {
  display: block;
  position: relative;
  background-image: url(data:image/gif;base64,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);
  background-size: cover;
  border-radius: 50%;
  margin: 0;
  padding: 0;
}
.header-avatar-wrap .header-avatar-wrap--container .pili-avatar {
  box-sizing: content-box;
  border: 2px solid #fff;
}
.pili-avatar * {
  margin: 0;
  padding: 0;
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
