<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IconLevel6 from '@/components/icons/IconLevel6.vue'
import { userInfoAPI } from '@/api/user/UserInfoAPI'
import { reactive, ref } from 'vue'
import type { UserInfoType, UserRelaInfoType } from '@/types/ApiRespType'
import { isEmptyString } from '@/utils/CommonUtil'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import { useTokenStore } from '@/stores/token'
import { message } from 'ant-design-vue'

defineExpose({
  // fetchData,
  loadData, show, hide, getPopoverEnter
})

const token = useTokenStore()

interface PopoverPosition {
  left: number
  top: number
}
const pos = reactive<PopoverPosition>({
  left: 200,
  top: 200,
})
const showPopover = ref<boolean>(false)
const showUnFollow = ref<boolean>(false)
const loading = ref<boolean>(false)
const userInfo = ref<UserInfoType>()
const relaInfo = ref<UserRelaInfoType>()
const popoverEnter = ref<boolean>(false)
function getPopoverEnter() {
  return popoverEnter.value
}
function mouseEnter() {
  popoverEnter.value = true
}
function mouseLeave() {
  popoverEnter.value = false
  showPopover.value = false
}

/**
 * 获取用户信息
 */
async function fetchData(uid: string) {
  if (isEmptyString(uid)) return
  loading.value = true
  try {
    const { data } = await userInfoAPI.getUserInfo(uid)
    userInfo.value = data as UserInfoType
    loading.value = false
    console.log('UserInfoCardPopover fetchData', data)
  } catch (e) {
    console.error('UserInfoCardPopover fetchData error', e)
  }
}

/**
 * 加载用户信息
 */
function loadData(userInfoData: UserInfoType, relaInfoData: UserRelaInfoType) {
  userInfo.value = userInfoData
  relaInfo.value = relaInfoData
  console.log('UserInfoCardPopover loadData', userInfoData)
}

/**
 * 显示
 * @param newPos
 */
function show(newPos: PopoverPosition) {
  pos.left = newPos.left
  pos.top = newPos.top
  showPopover.value = true
  console.log('UserInfoCardPopover show', newPos)
}

/**
 * 隐藏
 */
function hide() {
  showPopover.value = false
}

/**
 * 关注
 */
async function handleFollow() {
  if (!userInfo.value) return
  if (userInfo.value.uid === token.uid) {
    message.warn('不能对自己关注哦')
    return
  }
  try {
    await userInfoAPI.follow(token.uid, userInfo.value.uid, 0)
    message.success('关注成功')
    if (relaInfo.value) {
      relaInfo.value.isFollow = true
    }
  } catch (e) {
    console.error('handleFollow error', e)
  }
}
async function handleUnFollow() {
  message.info('取消关注')
  // try {
  //   await userInfoAPI.unfollow(token.uid, props.uid)
  //   message.success('取消关注成功')
  //   if (relaInfo.value) {
  //     relaInfo.value.isFollow = false
  //   }
  // } catch (e) {
  //   console.error('handleUnFollow error', e)
  // }
}

</script>

<template>
  <div
    class="user-card-wrap"
    :style="{ left: `${pos.left}px`, top: `${pos.top}px` }"
    v-if="showPopover"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div class="user-card-m-exp" :class="{ 'card-loaded': !loading }">
      <div class="bg" :style="{backgroundImage: `url(${ASSETS_BASE_URL}/image/user-bg-2.png@1920w_200h_1c.webp)`}"></div>
      <div class="user-info-wrapper">
        <a href="" target="_blank" class="face">
          <div class="bili-avatar" style="width: 48px; height: 48px; transform: translate(0, 0);">
            <img src="" alt="" class="bili-avatar-img bili-avatar-face bili-avatar-img-radius">
            <span class="bili-avatar-right-icon bili-avatar-size-48"></span>
          </div>
        </a>

        <div class="info">
          <p class="user">
            <a href="/space" target="_blank" class="name" :class="{'vip': true}">
              {{ userInfo?.nickname || '--' }}
            </a>
            <a href="" target="_blank" class="level">
              <IconLevel6 class="icon" />
            </a>
            <span class="user-label" style="background-color: rgb(251, 114, 153); color: rgb(255, 255, 255)">
              <span class="label-size">年度大会员</span>
            </span>
          </p>
          <p class="social">
            <a href="/fans/follow" target="_blank">
              <span class="like">{{ userInfo?.followerCount || 0 }}</span>
              <span class="tip_text">关注</span>
            </a>
            <a href="/fans/fans" target="_blank">
              <span class="fans">{{ userInfo?.fansCount || 0 }}</span>
              <span class="tip_text">粉丝</span>
            </a>
            <span>
              <span>{{ userInfo?.favoredCount || 0 }}</span>
              <span class="tip_text">获赞</span>
            </span>
          </p>
          <div class="official-wrapper" v-show="userInfo?.authority !== 0">
            <img src="@/assets/icons/personal.svg" alt="" class="official-icon">
            {{ userInfo?.authorityDesc || '' }}
          </div>
          <p class="sign">

          </p>
          <div class="btn-box">
            <a
              v-if="relaInfo?.isFollow"
              class="like liked"
              @click.prevent="handleUnFollow"
              @mouseenter="showUnFollow = true"
              @mouseleave="showUnFollow = false"
            >
              {{ showUnFollow?  '取消关注':'已关注' }}
            </a>
            <a
              v-else
              class="like"
              @click.prevent="handleFollow"
            >
              关注
            </a>
            <a href="/whisper" target="_blank" class="message">发消息</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-card-wrap {
  position: absolute;
  z-index: 999;
  transition: left, top 0.3s;
}
.user-card-m-exp {
  font-size: 12px;
  position: absolute;
  z-index: 10099;
  border-radius: 8px;
  width: 366px;
  box-sizing: border-box;
  cursor: default;
  transition: left 0.3s, top 0.3s;
}
.card-loaded {
  cursor: default;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  background: var(--bg1_float);
  border: 0.5px solid var(--line_light);
}
.user-card-m-exp .bg {
  width: 100%;
  height: 85px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.user-card-m-exp .user-info-wrapper {
  position: relative;
  display: flex;
  padding: 0 20px 16px 10px;
}
.user-card-m-exp a {
  text-decoration: none;
}
.user-card-m-exp .user-info-wrapper .face {
  position: relative;
  top: 10px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: var(--graph_weak);
  margin-right: 12px;
}
.user-card-m-exp .user-info-wrapper .info p {
  margin: 0;
  color: var(--text1);
}
.user-card-m-exp .user-info-wrapper .info .user {
  margin-top: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.user-card-m-exp .user-info-wrapper .info .user .name {
  color: var(--text1);
  max-width: 158px;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-card-m-exp .user-info-wrapper .info .user .name.vip {
  color: #fb7299;
}
.user-card-m-exp .user-info-wrapper .info .level {
  display: inline-block;
  width: 25px;
  height: 14px;
}
.user-card-m-exp .user-info-wrapper .info .level svg {
  width: 100%;
  height: 100%;
}
.user-card-m-exp .user-info-wrapper .info .user .user-label {
  display: inline-block;
  box-sizing: border-box;
  max-width: 58px;
  height: 16px;
  color: var(--text_white);
  background: var(--brand_pink);
  border-radius: 2px;
  line-height: 16px;
  font-size: 12px;
  margin-left: 5px;
  overflow: hidden;
  white-space: nowrap;
}
.user-card-m-exp .user-info-wrapper .info .user .user-label .label-size {
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center;
  transform: scale(0.83);
}

.user-card-m-exp .user-info-wrapper .info .social {
  margin-bottom: 10px;
}
.user-card-m-exp .user-info-wrapper .info .social a {
  color: var(--text1);
  margin-right: 18px;
}
.user-card-m-exp .user-info-wrapper .info .social .tip_text {
  color: var(--text3);
  margin-left: 3px;
}

.user-card-m-exp .user-info-wrapper .info .official-wrapper {
  font-size: 12px;
  color: var(--text3);
  line-height: 17px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  line-break: anywhere;
}
.user-card-m-exp .user-info-wrapper .info .official-wrapper .official-icon {
  width: 14px;
  height: 14px;
  margin-right: 2px;
  vertical-align: sub;
}


.user-card-m-exp .user-info-wrapper .info .sign {
  line-height: 17px;
  color: var(--text3);
  color: var(--text3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  line-break: anywhere;
}

.user-card-m-exp .user-info-wrapper .info .btn-box {
  display: flex;
  margin-top: 16px;
}
.user-card-m-exp .user-info-wrapper .info .btn-box a {
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 14px;
}
.user-card-m-exp .user-info-wrapper .info .btn-box .like {
  color: var(--text_white);
  border-color: var(--brand_blue);
  background-color: var(--brand_blue);;
}
.user-card-m-exp .user-info-wrapper .info .btn-box .liked {
  background-color: var(--graph_bg_thick);
  color: var(--text3);
}
.user-card-m-exp .user-info-wrapper .info .btn-box .message {
  border: 1px solid var(--text3);
  color: var(--text2);
  background-color: transparent;
}

.user-card-m-exp .layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: -1;
  outline: none;
}
</style>
