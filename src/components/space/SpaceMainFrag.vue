<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import HomeSectionTop from '@/components/space/main/section/top/HomeSectionTop.vue'
import HomeSectionVideo from '@/components/space/main/section/video/HomeSectionVideo.vue'
import HomeAsideSectionAuth from '@/components/space/main/section/aside/HomeAsideSectionAuth.vue'
import HomeAsideSectionInfo from '@/components/space/main/section/aside/HomeAsideSectionInfo.vue'
import { useWindowStore } from '@/stores/window'
import { ref } from 'vue'
import HomeAsideSectionUpload from '@/components/space/main/section/aside/HomeAsideSectionUpload.vue'
import HomeSectionCollection from '@/components/space/main/section/collection/HomeSectionCollection.vue'

const windowStore = useWindowStore()
const slideDown = ref(windowStore.slideDownComputed)

function goTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <main class="space-main">
    <div class="space-home">
      <div class="content">
        <HomeSectionTop />
        <HomeSectionVideo />
        <HomeSectionCollection />
      </div>

      <div class="aside">
        <HomeAsideSectionAuth />
        <HomeAsideSectionInfo />
        <HomeAsideSectionUpload />
      </div>
    </div>

    <div class="space-float">
      <div
        class="float-button"
        v-show="windowStore.slideDownComputed"
        @click="goTop"
      >
        <div class="float-button__icon">
          <i
            class="vui_icon sic-BDC-arrow_up_triangle_fill"
            style="font-size: 12px"
          />
        </div>
        <div class="float-button__text">顶部</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#app .space-main {
  --side-padding: 60px;
  max-width: 2260px;
  margin: 0 auto;
  padding: 0 var(--side-padding);
  min-height: calc(100vh - 294px);
}

@media (min-width: 0) {
  #app .space-main {
    min-width: 1100px;
  }
}

@media (min-width: 1100px) {
  #app .space-main {
    min-width: 1100px;
  }
}

.space-home {
  margin-top: 30px;
  display: flex;
}

.space-home .content {
  flex: 1;
}

.space-home .aside {
  flex-shrink: 0;
  width: var(--aside-width);
  --aside-width: 240px;
  margin-left: 36px;
}

#app .space-float {
  z-index: 1;
  position: fixed;
  right: 10px;
  left: calc(100% - 52px);
  bottom: 20px;
  width: 42px;
  height: 150px;
  font-size: 12px;
}

.float-button {
  color: var(--text1);
  box-sizing: border-box;
  background-color: var(--bg1_float);
  border-radius: 6px;
  margin-top: 6px;
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
}

.float-button__icon {
  display: flex;
}
</style>
