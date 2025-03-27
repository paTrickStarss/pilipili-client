<!--
  - Copyright (c) 2024-2025.  Bubble
  -->

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import HeaderBar from '@/components/navbar/HeaderBar.vue'
import HeaderChannel from '@/components/navbar/HeaderChannel.vue'
import { useWindowStore } from '@/stores/window'

const props = defineProps({
  type: {
    type: String,
    default: '',
    validator: (value: string) =>
      ['', 'main', 'space', 'body'].includes(value),
  },
  main: Boolean,
  fixed: {
    type: Boolean,
    default: true,
  },
  transparent: {
    type: Boolean,
    default: true,
  }
})

const windowStore = useWindowStore()
const controller = new AbortController()
const slideDown = ref<boolean>(false)
onMounted(() => {
  const scrollEventHandler = () => {
    const scrollTop = document.documentElement.scrollTop

    // 触发navbar背景切换事件
    if (!slideDown.value && scrollTop >= 10) {
      slideDown.value = true
      windowStore.setSlideDown(true)
    } else if (slideDown.value && scrollTop <= 5) {
      slideDown.value = false
      windowStore.setSlideDown(false)
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
    <!--    主页模式 显示banner、channel-->
    <div class="pili-wrap" v-if="type === 'main'">
      <div class="pili-header large-header">
        <HeaderBar :slide-down="slideDown" />
        <div class="pili-header__banner">
          <picture class="v-img banner-img" id="pili-header-banner-img">
            <source
              :srcset="`${ASSETS_BASE_URL}/image/banner.png@3840w_360h_1c.avif`"
              type="image/avif"
            />
            <img src="" alt="" />
          </picture>
          <div class="taper-line"></div>
        </div>
        <HeaderChannel />
      </div>

      <main class="pili-wrap-layout">
        <div class="fixed-channel-shim"></div>
        <slot>Main Content...</slot>
      </main>
    </div>

    <!--    不固定navBar模式-->
    <div v-else-if="type === 'space'">
      <header>
        <div class="pili-header">
          <HeaderBar class="transparent-header" />
        </div>
      </header>
      <div id="app" style="margin-top: -64px">
        <slot>Main Content...</slot>
      </div>
    </div>

    <!--    固定navBar模式-->
    <div v-else-if="type === 'body'">
      <header>
        <div class="pili-header">
          <HeaderBar
            class="transparent-header"
            :slide-down="true"
          />
        </div>
      </header>
      <div id="app" style="margin-top: -64px">
        <slot>Main Content...</slot>
      </div>
    </div>
    <!--    固定navBar模式-->
    <div v-else>
      <header>
        <div class="pili-header">
          <HeaderBar
            class="transparent-header"
            :slide-down="true"
          />
        </div>
      </header>
      <slot>Main Content...</slot>
    </div>

  </div>
</template>

<style>
#app {
  position: relative;
  margin: 0 auto;
  min-width: 1100px;
  max-width: 2560px;
}

#app::before {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--bg1);
  z-index: -10;
}

.pili-wrap {
  position: relative;
}

.pili-wrap-layout,
.pili-wrap .pili-header .pili-header__channel {
  margin: 0 auto;
  padding: 0 var(--layout-padding);
}

.pili-wrap-layout,
.pili-wrap .pili-header .pili-header__channel {
  max-width: calc(1980px + 2 * var(--layout-padding));
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
  background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
  pointer-events: none;
}
</style>
