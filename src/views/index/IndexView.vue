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
import SearchBar from '@/components/navbar/SearchBar.vue'
import IconTV from '@/components/icons/IconTV.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
import HeaderBar from '@/components/navbar/HeaderBar.vue'
import HeaderChannel from '@/components/navbar/HeaderChannel.vue'

defineProps({
  fixed: {
    type: Boolean,
    default: true,
  },
})

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
    <div class="pili-wrap">
      <div class="pili-header large-header">
        <HeaderBar/>
        <div class="pili-header__banner" v-if="fixed">
          <picture class="v-img banner-img" id="pili-header-banner-img">
            <source :srcset="`${ASSETS_BASE_URL}/image/banner.png@3840w_360h_1c.avif`" type="image/avif">
            <img src="" alt="">
          </picture>
          <div class="taper-line"></div>
        </div>
        <HeaderChannel v-if="fixed"/>
      </div>
    </div>
  </div>
</template>

<style>
.pili-wrap {
  position: relative;
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
.pili-header {
  position: relative;
  color: var(--text1);
  min-height: 64px;
  max-width: 2560px;
  width: 100%;
  margin: 0 auto;
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
</style>
