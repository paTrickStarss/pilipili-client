<!--
  - Copyright (c) 2024-2025.  Bubble
  -->

<script setup lang="ts">
import IndexView from '@/views/index/IndexView.vue'
import { onMounted, ref, watch } from 'vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import type { NavTabItemType } from '@/types/PropsType'
import { useUserStore } from '@/stores/user'
import NavTabItem from '@/components/space/NavTabItem.vue'
import { message } from 'ant-design-vue'
import { useRoute } from 'vue-router'
import { DictionaryConverter } from '@/utils/DictionaryConverter'
import { getDate } from '@/utils/CommonUtil'
import { DateTimeUtil } from '@/utils/DateTimeUtil'

const route = useRoute()
const user = useUserStore()
const userInfo = ref(user.userInfo)
const spaceUrl = ref<string>('')

// tab信息
const navTabItemList = ref<NavTabItemType[]>([])

// 当前tab索引
const currentTab = ref<number>(getSpaceNavTabIndex())

//todo: 光标的对齐长度需要根据当前的tabItem元素宽度动态计算
const tabCursorLocationList = ref([
  {
    width: 56,
    left: 0,
  },
  {
    width: 56,
    left: 86,
  },
  {
    width: 67,
    left: 172,
  },
  {
    width: 56,
    left: 269,
  },
  {
    width: 70,
    left: 355,
  },
  {
    width: 88,
    left: 459,
  },
  {
    width: 56,
    left: 577,
  },
])

const searchInput = ref<string>('')

function handleSearch() {
  message.info(`search: ${searchInput.value}`)
}

const nowDate = ref(DateTimeUtil.instance.getDate())

watch(
  () => route.path,
  () => {
    init()
    currentTab.value = getSpaceNavTabIndex()
  },
)

function init() {
  user.fetchCurrentUserInfo().then(() => {
    spaceUrl.value = userInfo.value.spaceUrl
    // message.info(`spaceUrl: ${spaceUrl.value}`)
    navTabItemList.value = [
      {
        id: 0,
        label: '主页',
        linkUrl: `${spaceUrl.value}`,
        styleClass: 'sic-BDC-house_home_line',
        color: '--Gr6_u',
      },
      {
        id: 1,
        label: '动态',
        linkUrl: `${spaceUrl.value}/dynamic`,
        styleClass: 'sic-BDC-windmill_moments_line',
        color: '--Pi5_u',
      },
      {
        id: 2,
        label: '投稿',
        linkUrl: `${spaceUrl.value}/upload`,
        styleClass: 'sic-fsp-submission_line',
        color: '--Lb5_u',
        countShow: true,
        countNum: 8,
      },
      {
        id: 3,
        label: '合集',
        linkUrl: `${spaceUrl.value}/list`,
        styleClass: 'sic-BDC-video_archive_line',
        color: '--Lb4_u',
      },
      {
        id: 4,
        label: '收藏',
        linkUrl: `${spaceUrl.value}/collection`,
        styleClass: 'sic-fsp-fav_line',
        color: '--Ye5_u',
        countShow: true,
        countNum: 23,
      },
      {
        id: 5,
        label: '追番追剧',
        linkUrl: `${spaceUrl.value}/bangumi`,
        styleClass: 'sic-BDC-heart_collect_line',
        color: '--Re5_u',
      },
      {
        id: 6,
        label: '设置',
        linkUrl: `${spaceUrl.value}/settings`,
        styleClass: 'sic-BDC-nut_setting_line',
        color: '--Lb5_u',
      },
    ]
  })
}

function getSpaceNavTabIndex() {
  return route.meta.index as number
}

onMounted(() => {
  // console.log('route', route, route.meta)
  init()
})
</script>

<template>
  <IndexView type="space">
    <div class="header">
      <!--      背景-->
      <div class="bg header-bg">
        <div
          class="formal-bg"
          :style="{
            backgroundImage: `url(${ASSETS_BASE_URL}/image/user-bg-2.png@1920w_200h_1c.webp)`,
            backgroundPosition: 'center top',
          }"
        ></div>
      </div>

      <!--      背景阴影-->
      <div class="header-userinfo-bg-shadow">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>

      <!--      用户资料-->
      <div class="userinfo header-userinfo">
        <div class="userinfo__main">
          <!--          头像-->
          <div class="userinfo-avatar">
            <div class="space-avatar">
              <div class="avatar">
                <div class="b-avatar" style="width: 64px; height: 64px">
                  <div
                    class="b-avatar__canvas"
                    style="width: 64px; height: 64px"
                  >
                    <div class="b-avatar__layers">
                      <!--                      头像-->
                      <div
                        class="b-avatar__layer center"
                        style="
                          width: 64px;
                          height: 64px;
                          opacity: 1;
                          border-radius: 50%;
                        "
                      >
                        <div class="b-avatar__layer__res local-6">
                          <picture>
                            <source
                              :srcset="`${ASSETS_BASE_URL}/avatar/avatar-1.jpg@128w_128h_1c_1s.webp`"
                              type="image/webp"
                            />
                            <img src="" alt="" />
                          </picture>
                        </div>
                      </div>
                      <!--                      大会员图标-->
                      <div
                        class="b-avatar__layer"
                        style="
                          left: 75%;
                          top: 75%;
                          width: 20px;
                          height: 20px;
                          opacity: 1;
                          background-color: rgb(255, 255, 255);
                          border: 2px solid rgb(255, 255, 255);
                          border-radius: 50%;
                          box-sizing: border-box;
                        "
                      >
                        <div class="b-avatar__layer__res local-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" class="change-btn">更换头像</a>
            </div>
          </div>
          <div class="userinfo-detail">
            <div class="userinfo-detail__top">
              <div class="nickname">{{ userInfo.nickname }}</div>
              <a class="level" target="_blank" href="#">
                <i
                  class="vui_icon level-icon"
                  :class="`sic-BDC_svg-user_level_${userInfo.level}`"
                  style="font-size: 28px"
                ></i>
              </a>
              <div
                class="gender"
                :style="{
                  'background-color': `var(--brand_${userInfo.gender === 1 ? 'blue' : 'pink'})`,
                }"
              >
                <i
                  class="vui_icon"
                  :class="`sic-BDC-${userInfo.gender === 1 ? 'male' : 'female'}_line`"
                  style="font-variation-settings: 'strk' 2; font-size: 12px"
                ></i>
              </div>
              <div class="vip">
                <a href="/vip-center" target="_blank" class="img-label">
                  <img
                    class="img-label-pic"
                    :src="`${ASSETS_BASE_URL}/icons/vip_2.png`"
                    alt="vip img"
                  />
                </a>
              </div>
            </div>
            <div class="userinfo-detail__bottom">
              <div class="sign header-sign">
                <div class="editable">
                  <input
                    class="editable-input"
                    type="text"
                    placeholder="编辑个人介绍"
                    v-model="userInfo.description"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="operation"></div>
      </div>
    </div>

    <div class="nav-bar">
      <div class="nav-bar__main">
        <div class="nav-bar__main-left">
          <div class="nav-tab">
            <NavTabItem
              v-for="item in navTabItemList"
              :key="item.id"
              :current="currentTab"
              :info="item"
              :count-num="item.countNum || 0"
            />
            <div
              class="nav-tab-cursor"
              :style="{
                width: `${tabCursorLocationList[currentTab].width}px`,
                left: `${tabCursorLocationList[currentTab].left}px`,
              }"
            ></div>
          </div>
          <label class="nav-search nav-bar-search">
            <input
              class="nav-search-input"
              type="text"
              placeholder="搜索视频、动态"
              v-model="searchInput"
            />
            <div class="actions">
              <i
                class="vui_icon sic-BDC-xmark_close_circle_fill clear"
                v-show="searchInput !== ''"
                @click="searchInput = ''"
              />
              <i
                class="vui_icon sic-BDC-magnifier_search_line search"
                @click="handleSearch"
              />
            </div>
          </label>
        </div>
        <div class="nav-bar__main-right">
          <div class="nav-statistics">
            <a href="#" class="nav-statistics__item jumpable">
              <span class="nav-statistics__item-text">关注数</span>
              <span class="nav-statistics__item-num" title="200">{{ userInfo.followerCount }}</span>
            </a>
            <a href="#" class="nav-statistics__item jumpable">
              <span class="nav-statistics__item-text">粉丝数</span>
              <span class="nav-statistics__item-num" title="28">{{ userInfo.fansCount }}</span>
            </a>
            <div class="nav-statistics__item">
              <span class="nav-statistics__item-text">获赞数</span>
              <span
                class="nav-statistics__item-num"
                :title="`截至${nowDate}，视频、动态累计获赞71`"
                >71</span
              >
            </div>
            <div class="nav-statistics__item">
              <span class="nav-statistics__item-text">播放数</span>
              <span
                class="nav-statistics__item-num"
                :title="`截至${nowDate}，视频、动态累计播放1409`"
                >1409</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <RouterView />
  </IndexView>
</template>

<style scoped>
.header {
  display: flex;
  height: 200px;
  position: relative;
}

.header .header-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  pointer-events: none;
}

.bg {
  position: relative;
  width: 100%;
  height: 100%;
}

.bg .formal-bg {
  width: 100%;
  height: 100%;
  background-color: #f1f2f3;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.header .header-userinfo-bg-shadow {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
}

.header .header-userinfo-bg-shadow .top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 106px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.header .header-userinfo-bg-shadow .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 117px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.0001) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.userinfo {
  display: flex;
  justify-content: space-between;
}

.header-userinfo {
  --side-padding: 60px;
  max-width: 2260px;
  margin: 0 auto;
  padding: 0 var(--side-padding);
  width: 100%;
  height: fit-content;
  align-self: flex-end;
  padding-bottom: 22px;
}

@media (min-width: 0) {
  .header-userinfo {
    min-width: 1100px;
  }
}

@media (min-width: 1100px) {
  .header-userinfo {
    min-width: 1100px;
  }
}

.userinfo__main {
  display: flex;
  align-items: center;
  margin-right: 122px;
  flex: 1;
}

.userinfo__main .userinfo-avatar {
  flex-shrink: 0;
  height: 1px;
  margin-right: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.userinfo__main .userinfo-detail {
  flex: 1;
}

.userinfo__main .userinfo-detail__top {
  display: flex;
  align-items: center;
}

.userinfo__main .userinfo-detail__top .nickname {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-right: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.userinfo__main .userinfo-detail__top > * {
  margin-right: 4px;
}

.userinfo__main .userinfo-detail__bottom .header-sign {
  margin-top: 10px;
}

.sign {
  height: 17px;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.sign .editable {
  flex: 1;
  height: 100%;
}

.sign .editable .editable-input {
  width: 100%;
  height: 100%;
  padding: 0 4px;
  background-color: transparent;
  transition:
    background-color 0.3s,
    color 0.3s;
  color: white;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.sign .editable .editable-input:focus {
  background-color: white;
  color: #18191c;
}

.level {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
  height: 20px;
}

.level .level-img {
  height: 25px;
  /*background-color: white;*/
}

.gender {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  color: white;
}

.gender .gender-img {
  height: 16px;
}

.vip {
  display: flex;
}

.vip .img-label {
  cursor: pointer;
  display: flex;
  height: 20px;
  width: auto;
}

.vip .img-label-pic {
  height: 100%;
}

.space-avatar {
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
}

.space-avatar .avatar {
  width: 64px;
  height: 64px;
}

.space-avatar .change-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
}

.space-avatar .change-btn:hover {
  opacity: 1;
}

.b-avatar {
  position: relative;
  pointer-events: none;
}

.b-avatar__canvas {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.b-avatar__layers {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.b-avatar__layer {
  position: absolute;
  isolation: isolate;
  overflow: hidden;
}

.b-avatar__layer .center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.b-avatar__layer__res {
  width: 100%;
  height: 100%;
  isolation: isolate;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.b-avatar__layer__res.local-6 {
  background-image: url('data:image/jpeg;base64,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');
}

.b-avatar__layer__res.local-1 {
  background-image: url('data:image/png;base64,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');
}

.b-avatar__layer__res div,
.b-avatar__layer__res picture,
.b-avatar__layer__res img {
  width: 100%;
  height: 100%;
}

.nav-bar {
  --search-margin-left: 20px;
  position: sticky;
  z-index: 99;
  top: 0;
  background-color: var(--bg1);
  box-shadow: 0 0 0 1px var(--bg2_float);
}

@media (min-width: 0) {
  .nav-bar {
    --search-margin-left: 20px;
  }
}

@media (min-width: 1100px) {
  .nav-bar {
    --search-margin-left: 30px;
  }
}

@media (min-width: 1340px) {
  .nav-bar {
    --search-margin-left: 30px;
  }
}

.nav-bar__main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 2260px;
  margin: 0 auto;
  padding: 0 60px;
}

.nav-bar__main-left {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.nav-tab {
  --item-margin-left: 18px;
  --item-font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
}

@media (min-width: 0) {
  .nav-tab {
    --item-margin-left: 18px;
  }
}

@media (min-width: 1100px) {
  .nav-tab {
    --item-margin-left: 20px;
  }
}

@media (min-width: 1340px) {
  .nav-tab {
    --item-margin-left: 30px;
    --item-font-size: 16px;
  }
}

.nav-tab-cursor {
  position: absolute;
  bottom: 0;
  height: 3px;
  border-radius: 3px;
  background-color: var(--brand_blue);
  transition: all 0.3s ease-in-out;
}

.nav-bar__main-left .nav-bar-search {
  margin-left: var(--search-margin-left);
}

.nav-search {
  --search-width: 142px;
  position: relative;
}

@media (min-width: 0) {
  .nav-search {
    --search-width: 142px;
  }
}

@media (min-width: 1100px) {
  .nav-search {
    --search-width: 150px;
  }
}

@media (min-width: 1340px) {
  .nav-search {
    --search-width: 150px;
  }
}

.nav-search-input {
  width: var(--search-width);
  height: 30px;
  padding: 0 45px 0 10px;
  background-color: transparent;
  line-height: 16px;
  font-size: 12px;
  color: var(--text1);
  border-radius: 6px;
  border: 1px solid var(--line_regular);
  transition: border-color 0.3s;
}

.nav-search-input:focus {
  border-color: var(--brand_blue);
}

.nav-search .actions {
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
}

.nav-search .actions .clear {
  cursor: pointer;
  color: var(--graph_weak);
  margin-right: 7px;
  font-size: 16px;
}

.nav-search .actions .search {
  cursor: pointer;
  color: var(--graph_weak);
  font-size: 16px;
  font-variation-settings: 'strk' 1.5;
  transition: color 0.3s;
}

.nav-bar__main-right {
  flex-shrink: 0;
}

.nav-statistics {
  --item-margin-left: 8px;
  display: flex;
  align-items: center;
}

@media (min-width: 0) {
  .nav-statistics {
    --item-margin-left: 8px;
  }
}

@media (min-width: 1100px) {
  .nav-statistics {
    --item-margin-left: 16px;
  }
}

@media (min-width: 1340px) {
  .nav-statistics {
    --item-margin-left: 16px;
  }
}

.nav-statistics__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: var(--item-margin-left);
  min-width: 52px;
}

.nav-statistics__item.jumpable {
  cursor: pointer;
}

.nav-statistics__item.jumpable:hover span {
  color: var(--brand_blue);
}

.nav-statistics__item:first-child {
  margin-left: 0;
}

.nav-statistics__item.jumpable * {
  transition: color 0.3s;
}

.nav-statistics__item-text {
  font-size: 13px;
  line-height: 18px;
  color: var(--text2);
}

.nav-statistics__item-num {
  font-size: 14px;
  line-height: 20px;
  margin-top: 2px;
  font-weight: 500;
  color: var(--text1);
}
</style>
