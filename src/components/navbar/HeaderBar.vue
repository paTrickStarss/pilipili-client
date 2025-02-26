<script setup lang="ts">
import IconTV from '@/components/icons/IconTV.vue'
import CollectionPopover from '@/components/navbar/collection/CollectionPopover.vue'
import HistoryPopover from '@/components/navbar/history/HistoryPopover.vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import GlobalPopover from '@/components/global/GlobalPopover.vue'
import SearchBar from '@/components/navbar/search/SearchBar.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import VipPopover from '@/components/navbar/vip/VipPopover.vue'
import UserLoginPopver from '@/components/navbar/user/UserLoginPopver.vue'
import DynamicPopover from '@/components/navbar/dynamic/DynamicPopover.vue'
import IconBulb from '@/components/icons/IconBulb.vue'
import MessagePopover from '@/components/navbar/message/MessagePopover.vue'
import UserInfoPopover from '@/components/navbar/user/UserInfoPopover.vue'
import { useTokenStore } from '@/stores/token'

defineProps({
  slideDown: {
    type: Boolean,
    default: false,
  }
})

const tokenStore = useTokenStore()
</script>

<template>
  <div class="pili-header__bar" :class="{'slide-down': slideDown}">
    <!--          左侧菜单-->
    <ul class="left-entry">
      <li>
        <a href="#" class="entry-title">
          <IconTV/>
          <span>首页</span>
        </a>
      </li>
      <li class="v-popover-wrap">
        <a href="#" class="default-entry">
          <span>番剧</span>
        </a>
      </li>
      <li class="v-popover-wrap">
        <a href="#" class="default-entry">
          <span>直播</span>
        </a>
      </li>
      <li class="v-popover-wrap">
        <a href="#" class="default-entry">
          <span>游戏中心</span>
        </a>
      </li>
      <li class="v-popover-wrap">
        <a href="#" class="default-entry">
          <span>会员购</span>
        </a>
      </li>
      <li class="v-popover-wrap">
        <a href="#" class="default-entry">
          <span>漫画</span>
        </a>
      </li>
      <li class="v-popover-wrap">
        <a href="#" class="default-entry">
          <span>赛事</span>
        </a>
      </li>
      <li class="v-popover-wrap">
        <a href="#" class="download-entry download-client-trigger">
          <IconDownload/>
          <span>下载客户端</span>
        </a>
      </li>
    </ul>
    <!--          搜索栏-->
    <div class="center-search-container offset-center-search">
      <SearchBar/>
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
</template>

<style scoped>
.pili-header .pili-header__bar.slide-down {
  position: fixed;
  top: 0;
  animation: headerSlideDown .3s linear forwards;
  background: var(--bg1);
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  background: var(--bg1_float);
}
.pili-wrap .pili-header .slide-down {
  animation: none!important;
  box-shadow: inset 0 -1px 0 var(--line_regular)!important;
}
.pili-header .slide-down .left-entry .entry-title .tv-icon {
  color: var(--brand_blue);
}
@keyframes headerSlideDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
.transparent-header {
  background: linear-gradient(rgba(14,14,14, .3),rgba(0,0,0,0));
}
.pili-header .left-entry {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 30px;
}
.pili-header .left-entry .download-client-trigger {
  display: flex;
  align-items: center;
  color: var(--text_white);
  cursor: pointer;
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
  display: flex;
}
.pili-header .slide-down .left-entry .entry-title,
.pili-header .slide-down .left-entry .download-entry,
.pili-header .slide-down .left-entry .default-entry,
.pili-header .slide-down .left-entry .loc-entry {
  color: var(--text1);
}
.pili-header .left-entry .entry-title span,
.pili-header .left-entry .download-entry span,
.pili-header .left-entry .default-entry span {
  transition: all .3s;
}
.pili-header .left-entry .entry-title:hover span,
.pili-header .left-entry .download-entry:hover span,
.pili-header .left-entry .default-entry:hover span {
  transform: translate(0, -5px);
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
