<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import NavBar from '@/components/navbar/NavBar.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import UserInfoPopover from '@/components/navbar/UserInfoPopover.vue'
import VipPopover from '@/components/navbar/VipPopover.vue'
import MessagePopover from '@/components/navbar/MessagePopover.vue'
import DynamicPopover from '@/components/navbar/DynamicPopover.vue'
import CollectionPopover from '@/components/navbar/CollectionPopover.vue'
import HistoryPopover from '@/components/navbar/HistoryPopover.vue'
import GlobalPopover from '@/components/global/GlobalPopover.vue'
import IconBulb from '@/components/icons/IconBulb.vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import { useTokenStore } from '@/stores/token'
import UserLoginPopver from '@/components/navbar/UserLoginPopver.vue'

defineProps({
  fixed: {
    type: Boolean,
    default: true,
  },
})

const tokenStore = useTokenStore()

const searchFormFocus = ref<boolean>(false)

// 切换navbar背景
const isNavBarTransparent = ref<boolean>(true)
const headerStyle = reactive({
  backgroundColor: 'transparent',
  boxShadow: 'none',
})

function switchNavBarBackground(isTransparent: boolean) {
  isNavBarTransparent.value = isTransparent
  headerStyle.backgroundColor = isNavBarTransparent.value
    ? 'transparent'
    : '#ffffff'
  headerStyle.boxShadow = isNavBarTransparent.value
    ? 'none'
    : '0 5px 8px rgba(255, 255, 255, 0.5)'
}

const controller = new AbortController()
onMounted(() => {
  const scrollEventHandler = () => {
    const scrollTop = document.documentElement.scrollTop

    // 触发navbar背景切换事件
    if (isNavBarTransparent.value && scrollTop >= 150) {
      switchNavBarBackground(false)
    } else if (!isNavBarTransparent.value && scrollTop <= 130) {
      switchNavBarBackground(true)
    }
  }
  window.addEventListener('scroll', scrollEventHandler, {
    signal: controller.signal,
  })
})
onUnmounted(() => {
  // window.removeEventListener('scroll', scrollEventHandler)
  controller.abort()
})
</script>

<template>
  <div>
    <!--    <div class="pili-wrap">-->
    <!--      &lt;!&ndash;      顶栏&ndash;&gt;-->
    <!--      <div ref="headerRef" class="header" :style="{ position: fixed? 'fixed': 'inherit'}">-->
    <!--        <NavBar :style="headerStyle" />-->
    <!--      </div>-->

    <!--      &lt;!&ndash;      内容主体&ndash;&gt;-->
    <!--      <slot>Waiting for slot content...</slot>-->

    <!--      &lt;!&ndash;      页脚&ndash;&gt;-->
    <!--      <div class="footer">footer</div>-->
    <!--    </div>-->
    <div class="pili-wrap">
      <div class="pili-header large-header">
        <div class="pili-header__bar">
          <!--          左侧菜单-->
          <ul class="left-entry">
            <li>
              <a href="#" class="entry-title">
                <span>首页</span>
              </a>
            </li>
            <li class="v-popover-wrap">
              <a href="#" class="default-entry">
                <span>分区</span>
              </a>
            </li>
            <li class="v-popover-wrap">
              <a href="#" class="default-entry">
                <span>分区</span>
              </a>
            </li>
            <li class="v-popover-wrap">
              <a href="#" class="default-entry">
                <span>分区</span>
              </a>
            </li>
            <li class="v-popover-wrap">
              <a href="#" class="default-entry">
                <span>分区</span>
              </a>
            </li>
            <li class="v-popover-wrap">
              <a href="#" class="default-entry">
                <span>分区</span>
              </a>
            </li>
            <li class="v-popover-wrap">
              <a href="#" class="default-entry">
                <span>分区</span>
              </a>
            </li>
            <li class="v-popover-wrap">
              <a href="#" class="default-entry">
                <span>分区</span>
              </a>
            </li>
          </ul>
          <!--          搜索栏-->
          <div class="center-search-container offset-center-search">
            <div class="center-search__bar">
              <form
                id="nav-searchform"
                :class="`${searchFormFocus ? 'is-focus' : ''}`"
                style="border-radius: 8px"
              >
                <div class="nav-search-content">
                  <input
                    class="nav-search-input"
                    type="text"
                    autocomplete="off"
                    accesskey="s"
                    maxlength="100"
                    x-webkit-speech=""
                    x-webkit-grammar="builtin:translate"
                    value=""
                    placeholder="青木阳菜上海见面会"
                    title="青木阳菜上海见面会"
                    @focus="
                      () => {
                        searchFormFocus = true
                      }
                    "
                    @blur="
                      () => {
                        searchFormFocus = false
                      }
                    "
                  />
                  <div class="nav-search-clean">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 14.75C11.7279 14.75 14.75 11.7279 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75ZM9.64999 5.64303C9.84525 5.44777 10.1618 5.44777 10.3571 5.64303C10.5524 5.83829 10.5524 6.15487 10.3571 6.35014L8.70718 8.00005L10.3571 9.64997C10.5524 9.84523 10.5524 10.1618 10.3571 10.3571C10.1618 10.5523 9.84525 10.5523 9.64999 10.3571L8.00007 8.70716L6.35016 10.3571C6.15489 10.5523 5.83831 10.5523 5.64305 10.3571C5.44779 10.1618 5.44779 9.84523 5.64305 9.64997L7.29296 8.00005L5.64305 6.35014C5.44779 6.15487 5.44779 5.83829 5.64305 5.64303C5.83831 5.44777 6.15489 5.44777 6.35016 5.64303L8.00007 7.29294L9.64999 5.64303Z"
                        fill="#C9CCD0"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="nav-search-btn">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </form>
              <div class="search-panel" v-show="searchFormFocus">
                <div class="trending" style="max-width: 498px">
                  <div class="header">
                    <div class="title">pilipili热搜</div>
                  </div>
                  <div class="trendings-double">
                    <div class="trendings-col" style="max-width: 244px">
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank search-rank-top">1</div>
                        <div class="trending-text">
                          美国人为何每年吃千万吨罐头
                        </div>
                        <img
                          class="trending-mark"
                          src="//i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png@28h"
                          alt=""/>
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank search-rank-top">3</div>
                        <div class="trending-text">嗵嗵混剪哪吒宇宙</div>
                        <!---->
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank">5</div>
                        <div class="trending-text">美国让乌克兰还五千亿</div>
                        <img
                          class="trending-mark"
                          src="//i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png@28h"
                        />
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank">7</div>
                        <div class="trending-text">
                          袭击岸田文雄嫌犯被判10年
                        </div>
                        <img
                          class="trending-mark"
                          src="//i0.hdslb.com/bfs/activity-plat/static/20221118/eaf2dd702d7cc14d8d9511190245d057/UF7B1wVKT2.png@28h"
                        />
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank">9</div>
                        <div class="trending-text">天国拯救2亨利神级借口</div>
                        <!---->
                      </div>
                    </div>
                    <div class="trendings-col" style="max-width: 244px">
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank search-rank-top">2</div>
                        <div class="trending-text">后羿为什么不射工作日</div>
                        <img
                          class="trending-mark"
                          src="//i0.hdslb.com/bfs/activity-plat/static/20221213/eaf2dd702d7cc14d8d9511190245d057/lrx9rnKo24.png@28h"
                        />
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank">4</div>
                        <div class="trending-text">iPhone16e是否值得购买</div>
                        <img
                          class="trending-mark"
                          src="//i0.hdslb.com/bfs/activity-plat/static/20221118/eaf2dd702d7cc14d8d9511190245d057/UF7B1wVKT2.png@28h"
                        />
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank">6</div>
                        <div class="trending-text">LOL铁男圣堂皮肤预览</div>
                        <!---->
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank">8</div>
                        <div class="trending-text">起底特大招聘诈骗案</div>
                        <img
                          class="trending-mark"
                          src="//i0.hdslb.com/bfs/activity-plat/static/20221118/eaf2dd702d7cc14d8d9511190245d057/UF7B1wVKT2.png@28h"
                        />
                      </div>
                      <div class="trending-item" tabindex="0">
                        <div class="trendings-rank">10</div>
                        <div class="trending-text">
                          招聘软件在赚失业者的钱吗
                        </div>
                        <!---->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          右侧菜单-->
          <ul class="right-entry">
            <UserLoginPopver v-if="!tokenStore.isLogin"/>
            <UserInfoPopover v-else/>
            <VipPopover/>
            <MessagePopover/>
            <DynamicPopover/>
            <CollectionPopover/>
            <HistoryPopover/>

            <GlobalPopover
              wrap-class="right-entry-item"
              :pop-prohibit="true">
              <template #trigger>
                <a href="#" target="_blank" class="right-entry__outside">
                  <IconBulb/>
                  <span class="right-entry-text">创作中心</span>
                </a>
              </template>
            </GlobalPopover>
            <GlobalPopover
              wrap-class="right-entry-item right-entry-item--upload"
              :pop-prohibit="true">
              <template #trigger>
                <a href="#" target="_blank">
                  <div class="header-upload-entry">
                    <IconUpload/>
                    <span class="header-upload-entry__text">投稿</span>
                  </div>
                </a>
              </template>
            </GlobalPopover>
          </ul>
        </div>
        <div class="pili-header__banner">
          <picture class="v-img banner-img" id="pili-header-banner-img">
            <source :srcset="`${ASSETS_BASE_URL}/image/banner.png@3840w_360h_1c.avif`" type="image/avif">
            <img src="" alt="">
          </picture>
          <div class="taper-line"></div>
        </div>
        <div class="pili-header__channel"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pili-wrap {
  position: relative;
}
.pili-header {
  position: relative;
  color: var(--text1);
  min-height: 64px;
  max-width: 2560px;
  width: 100%;
  margin: 0 auto;
}
.large-header {
  background-color: var(--bg1);
}
.pili-header .pili-header__bar {
  position: absolute;
  top: 0;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  max-width: 2560px;
  width: 100%;
  height: 64px;
}
.pili-header .left-entry {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 30px;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .left-entry .default-entry,
  .pili-header .left-entry .entry-title {
    margin-right: 15px;
  }
}
.pili-header .left-entry .entry-title {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.pili-header .left-entry .entry-title,
.pili-header .left-entry .download-entry,
.pili-header .left-entry .default-entry,
.pili-header .left-entry .loc-entry {
  height: 64px;
  line-height: 64px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.pili-header .left-entry .default-entry {
  display: inline-block;
}
.pili-header .right-entry {
  display: flex;
  align-items: center;
  margin-left: 50px;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .right-entry {
    margin-left: 10px;
  }
}

.pili-header .center-search-container {
  flex: 1 auto;
  height: 38px;
}
.pili-header .center-search-container .center-search__bar {
  position: relative;
  margin: 0 auto;
  min-width: 181px;
  max-width: 500px;
}
.pili-header .center-search-container .center-search__bar #nav-searchform {
  display: flex;
  align-items: center;
  padding: 0 48px 0 4px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  line-height: 38px;
  border: 1px solid var(--line_regular);
  height: 40px;
  background-color: var(--graph_bg_regular);
  opacity: 0.9;
  transition: background-color 0.3s;
}
.pili-header .center-search-container .center-search__bar #nav-searchform.is-focus {
  border: 1px solid var(--line_regular);
  border-bottom: none;
  background: var(--bg1);
}

.pili-header .center-search-container .center-search__bar #nav-searchform:hover {
  background: var(--bg1);
}
.pili-header .center-search-container .center-search__bar .nav-search-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 8px;
  width: 100%;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 6px;
}
.pili-header .center-search-container .center-search__bar .nav-search-content .nav-search-input {
  flex: 1;
  overflow: hidden;
  padding-right: 8px;
  border: none;
  background-color: transparent;
  box-shadow: none;
  color: var(--text2);
  font-size: 14px;
  line-height: 20px;
}
.pili-header .center-search-container .center-search__bar .nav-search-content .nav-search-clean {
  width: 16px;
  height: 16px;
  right: 10px;
  cursor: pointer;
  visibility: hidden;
}
.pili-header .center-search-container .center-search__bar .nav-search-content .nav-search-clean svg {
  position: absolute;
  color: var(--graph_weak);
}
.pili-header .search-panel {
  width: 100%;
  max-height: 612px;
  overflow-y: auto;
  background: var(--bg1);
  border: 1px solid var(--line_regular);
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 13px 0 16px;
  -webkit-font-smoothing: antialiased;
}

.pili-header .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
.pili-header .trending-item .trendings-rank,
.pili-header .header .title {
  font-family:
    PingFang SC,
    HarmonyOS_Medium,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
  font-weight: 500;
}
.pili-header .header .title {
  height: 24px;
  font-size: 16px;
  line-height: 24px;
}

.pili-header .trendings-double {
  display: flex;
}
.pili-header .trendings-double .trendings-col {
  flex: 1;
}
.pili-header .trendings-double .trendings-col:first-child {
  margin-right: 10px;
}
.pili-header .trending-item {
  box-sizing: border-box;
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 16px;
}
.pili-header .trending-item .trendings-rank,
.pili-header .header .title {
  font-family:
    PingFang SC,
    HarmonyOS_Medium,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
  font-weight: 500;
}
.pili-header .trending-item .trendings-rank {
  width: 15px;
  min-width: 15px;
  height: 17px;
  line-height: 17px;
  text-align: center;
  font-size: 14px;
  margin-right: 7px;
  color: var(--text3);
}
.pili-header .trending-item .trendings-rank.search-rank-top {
  color: var(--text1);
}
.pili-header .trending-item .trending-text {
  font-size: 14px;
  line-height: 17px;
  height: 17px;
  margin-right: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0;
}
.pili-header .trending-item .trending-mark {
  height: 14px;
  margin-right: 16px;
}

.pili-header .pili-header__banner {
  position: relative;
  z-index: 0;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  min-width: 1000px;
  min-height: 155px;
  height: 9.375vw;
  max-height: 240px;
  background-color: #e3e5e7;
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
}
.pili-header .pili-header__banner .banner-img {
  position: absolute;
  object-fit: cover;
}
.pili-header .pili-header__channel {
  display: flex;
  align-items: center;
  background: var(--bg1);
  position: relative;
  width: 100%;
  max-width: 2078px;
  margin: 0 auto;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .pili-header__channel {
    padding: 0 64px;
    height: 110px;
  }
}
.pili-wrap-layout,
.pili-wrap .pili-header .pili-header__channel {
  margin: 0 auto;
  padding: 0 64px;
}
.pili-wrap-layout,
.pili-wrap .pili-header .pili-header__channel {
  max-width: calc(1980px + 2 * 64px);
}

.pili-header .pili-header__banner .taper-line {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(rgba(0,0,0,.4),transparent);
  pointer-events: none;
}
.pili-header .header-upload-entry {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  width: 90px;
  height: 34px;
  border-radius: 8px;
  background: #fb7299;
  color: #fff;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color .3s;
}
.pili-header .header-upload-entry:hover {
  background-color: #ff92ae;
}
</style>
