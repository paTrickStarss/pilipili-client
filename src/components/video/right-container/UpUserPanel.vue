<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import IconMenu from '@/components/icons/IconMenu.vue'
import { userInfoAPI } from '@/api/user/UserInfoAPI'
import type { UserInfoType, UserRelaInfoType } from '@/types/ApiRespType'
import { useTokenStore } from '@/stores/token'
import IconFollow from '@/components/icons/IconFollow.vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  uid: {
    type: Number,
    required: true,
  },
})

const token = useTokenStore()
const loading = ref<boolean>(false)
const userInfo = ref<UserInfoType>()
const relaInfo = ref<UserRelaInfoType>()
// 获取用户信息
async function fetchData() {
  if (!props.uid || props.uid === 0) return
  loading.value = true

  const promiseArr: Promise<void>[] = []
  // 获取目标用户信息
  const promise1 = userInfoAPI.getUserInfo(props.uid.toString())
    .then(({ data }) => {
      userInfo.value = data as UserInfoType
      console.log('UpUserPanel getUserInfo', data)
    })
  promiseArr.push(promise1)
  if (token.isLogin) {
    // 获取当前登录用户与目标用户的关系信息
    const promise2 = userInfoAPI.queryRela(token.uid, props.uid)
      .then(({ data }) => {
        relaInfo.value = data as UserRelaInfoType
        console.log('UpUserPanel queryRela', data)
      })
    promiseArr.push(promise2)
  }
  // test
  // relaInfo.value = {
  //   fromUid: token.uid,
  //   toUid: props.uid,
  //   isFollow: true,
  //   isSpecial: false,
  //   isMutual: false,
  // }
  await Promise.all(promiseArr)
  loading.value = false
}

const avatarEnter = ref<boolean>(false)
const avatarMouseEnter = () => {
  avatarEnter.value = true
  setTimeout(() => {
    if (avatarEnter.value) {
      showPopover()
    }
  }, 300)
}
const avatarMouseLeave = () => {
  avatarEnter.value = false
  setTimeout(() => {
    if (!getPopoverEnter()) {
      hidePopover()
    }
  }, 300)
}

const refHandler = inject('refHandler') as { userInfoPopRef: any }
function getPopoverEnter() {
  return refHandler.userInfoPopRef.getPopoverEnter()
}
function showPopover() {
  console.log('showPopover')
  refHandler.userInfoPopRef.loadData(userInfo.value, relaInfo.value)
  refHandler.userInfoPopRef.show({ left: 920, top: 170 })
}
function hidePopover() {
  console.log('hidePopover')
  refHandler.userInfoPopRef.hide()
}

/**
 * 关注
 */
async function handleFollow() {
  if (props.uid === token.uid) {
    message.warn('不能对自己关注哦')
    return
  }
  try {
    await userInfoAPI.follow(token.uid, props.uid, 0)
    message.success('关注成功')
    if (relaInfo.value) {
      relaInfo.value.isFollow = true
    }
  } catch (e) {
    console.error('handleFollow error', e)
  }
}

const showUnFollow = ref<boolean>(false)
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


onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="up-info-container up-info-no-desc">
    <div
      class="up-info--left"
      @mouseenter="avatarMouseEnter"
      @mouseleave="avatarMouseLeave"
    >
      <div class="up-avatar-wrap">
        <a href="" target="_blank" class="up-avatar">
          <div
            class="bili-avatar"
            style="width: 48px; height: 48px; transform: translate(0, 0)"
          >
            <img
              class="bili-avatar-img bili-avatar-face bili-avatar-img-radius"
              src=""
              alt=""
            />
            <!--            认证图标-->
            <span class="bili-avatar-right-icon bili-avatar-size-48"></span>
          </div>
        </a>
      </div>
    </div>
    <div class="up-info--right">
      <div class="up-info__detail">
        <div class="up-detail">
          <div class="up-detail-top">
            <a href="" target="_blank" class="up-name" :class="{ vip: true }">
              {{ userInfo?.nickname || '--' }}
              <span class="mask"></span>
            </a>
            <a href="" target="_blank" class="send-msg">
              <i class="van-icon-videodetails_messag"></i>
              发消息
            </a>
          </div>
        </div>
      </div>

      <div class="up-info__btn-panel">
        <div class="up-info-btn-panel">
          <div class="default-btn new-charge-btn charge-btn-loaded">
            <div class="charge-btn-icon">
              <img
                :src="`${ASSETS_BASE_URL}/icons/charge.png@.webp`"
                alt="charge button"
              />
            </div>
            <span>充电</span>
          </div>

          <div
            class="default-btn follow-btn b-gz"
            :class=" relaInfo?.isFollow ? 'following':'not-follow' "
          >
            <span
              class="follow-btn-inner"
              v-if="relaInfo?.isFollow"
              @click="handleUnFollow"
              @mouseenter="showUnFollow = true"
              @mouseleave="showUnFollow = false"
            >
              <span
                class="already-btn"
                tabindex="0"
                v-show="!showUnFollow"
              >
                <IconMenu class="follow-btn-icon" />
                已关注 {{ userInfo?.fansCount }}
              </span>
              <span class="already-btn" tabindex="0" v-show="showUnFollow">
                取消关注
              </span>
            </span>
            <span class="follow-btn-inner" v-else>
              <span class="already-btn" tabindex="0" @click="handleFollow">
                <IconFollow class="follow-btn-icon" />
                关注 {{ userInfo?.fansCount }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.up-info-no-desc {
  height: 80px;
}
.up-info-container {
  box-sizing: border-box;
  height: 104px;
  display: flex;
  align-items: center;
}

.up-info-container.up-info-no-desc .up-info--left {
  align-self: center;
}
.up-avatar-wrap {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.up-avatar-wrap .up-avatar {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--graph_weak);
}

.up-info-container .up-info--right {
  margin-left: 12px;
  flex: 1;
  overflow: auto;
}
.up-info-container .up-info--right .up-info__detail {
  margin-bottom: 5px;
}
.up-detail .up-detail-top {
  display: flex;
  align-items: center;
}
.up-detail .up-detail-top .up-name {
  font-size: 15px;
  color: var(--text1);
  font-weight: 500;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 12px;
  max-width: calc(100% - 12px - 56px);
}
.up-detail .up-detail-top .up-name.vip {
  color: #fb7299;
}
.up-detail .up-detail-top .up-name .mask {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
}
.up-detail .up-detail-top .send-msg {
  color: var(--text2);
  font-size: 13px;
  transition: color 0.3s;
  flex-shrink: 0;
}
.up-detail .up-detail-top .send-msg i {
  color: var(--text2);
  transition: color 0.3s;
}

.up-info-btn-panel {
  clear: both;
  display: flex;
  margin-top: 5px;
  white-space: nowrap;
}
.up-info-btn-panel .default-btn {
  box-sizing: border-box;
  padding: 0;
  line-height: 30px;
  height: 30px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--graph_weak);
  position: relative;
  transition: 0.3s all;
}
.up-info-btn-panel .new-charge-btn {
  margin-right: 12px;
  flex-shrink: 0;
  width: 109px;
  color: var(--brand_pink);
}
.up-info-btn-panel .new-charge-btn.charge-btn-loaded {
  background-color: transparent;
  border: 1px solid var(--brand_pink);
}
.up-info-btn-panel .follow-btn {
  flex: 1 1 auto;
  max-width: 200px;
}
.up-info-btn-panel .follow-btn.not-follow {
  background: var(--brand_blue);
  color: var(--text_white);
}
.up-info-btn-panel .follow-btn.following {
  color: var(--text3);
  background-color: var(--graph_bg_thick);
}
.up-info-btn-panel .new-charge-btn .charge-btn-icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  display: flex;
}
.up-info-btn-panel .new-charge-btn .charge-btn-icon img {
  width: 100%;
  height: 100%;
}
.up-info-btn-panel .follow-btn .follow-btn-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.up-info-btn-panel .follow-btn .follow-btn-inner span {
  user-select: none;
}
.up-info-btn-panel .follow-btn .already-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.up-info-btn-panel .follow-btn .follow-btn-inner .follow-btn-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
