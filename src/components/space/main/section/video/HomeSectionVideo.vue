<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import HomeSection from '@/components/space/main/HomeSection.vue'
import RadioGroup from '@/components/space/main/section/RadioGroup.vue'
import { ref } from 'vue'
import type { RadioListType, VideoCardInfoType } from '@/types/PropsType'
import { message } from 'ant-design-vue'
import HomeSectionVideoCard from '@/components/space/main/section/video/HomeSectionVideoCard.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'

const radioList = ref<RadioListType[]>([
  {
    id: 0,
    label: '最新发布',
  },
  {
    id: 1,
    label: '最多播放',
  },
  {
    id: 2,
    label: '最多收藏',
  },
])
const selectRadio = ref<number>(0)
const videoList = ref<VideoCardInfoType[]>([
  {
    id: 0,
    coverUrl: `${ASSETS_BASE_URL}/image/video-cover-2.jpg@672w_378h_1c.webp`,
    linkUrl: '#',
    title: '【Cover】X JAPAN - Say Anything (Solo)',
    duration: '1:13',
    date: '2-20',
    playCount: 125,
    danmakuCount: 12,
    progress: 66,
  },
  {
    id: 1,
    coverUrl: `${ASSETS_BASE_URL}/image/video-cover-2.jpg@672w_378h_1c.webp`,
    linkUrl: '#',
    title: '【Cover】X JAPAN - Say Anything (Solo)',
    duration: '1:13',
    date: '2-20',
    playCount: 125,
    danmakuCount: 12,
    progress: 66,
  },
  {
    id: 2,
    coverUrl: `${ASSETS_BASE_URL}/image/video-cover-2.jpg@672w_378h_1c.webp`,
    linkUrl: '#',
    title: '【Cover】X JAPAN - Say Anything (Solo)',
    duration: '1:13',
    date: '2-20',
    playCount: 125,
    danmakuCount: 12,
    progress: 66,
  },
  {
    id: 3,
    coverUrl: `${ASSETS_BASE_URL}/image/video-cover-2.jpg@672w_378h_1c.webp`,
    linkUrl: '#',
    title: '【Cover】X JAPAN - Say Anything (Solo)',
    duration: '1:13',
    date: '2-20',
    playCount: 125,
    danmakuCount: 12,
    progress: 66,
  },
  {
    id: 4,
    coverUrl: `${ASSETS_BASE_URL}/image/video-cover-2.jpg@672w_378h_1c.webp`,
    linkUrl: '#',
    title: '【Cover】X JAPAN - Say Anything (Solo)',
    duration: '1:13',
    date: '2-20',
    playCount: 125,
    danmakuCount: 12,
    progress: 66,
  },
])

function playAll() {
  message.info('playAll')
}

function showMore() {
  message.info('showMore')
}
</script>

<template>
  <HomeSection
    wrap-class="video-section"
    title="视频"
    :desc="`${videoList.length}`"
  >
    <template #radioGroup>
      <RadioGroup :radio-list="radioList" v-model:select-radio="selectRadio" />
    </template>
    <template #button>
      <button class="vui_button action-btn" @click="playAll">
        <i class="vui_icon sic-fsp-play_fill icon" style="font-size: 16px" />
        <span>播放全部</span>
      </button>
      <button class="vui_button" @click="showMore">
        <span>查看更多</span>
        <i
          class="vui_icon sic-BDC-arrow_forward_right_line icon"
          style="font-size: 12px; font-variation-settings: 'strk' 2"
        />
      </button>
    </template>

    <div class="wrap">
      <div class="items full">
        <div class="items__item" v-for="item in videoList" :key="item.id">
          <HomeSectionVideoCard :info="item" />
        </div>
      </div>
    </div>
  </HomeSection>
</template>

<style scoped>
.section-wrap .radio-filter:not(:first-child) {
  margin-left: 36px;
}

.video-section .items {
  column-gap: 16px;
  row-gap: 20px;
}

.video-section .items.full {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (min-width: 1340px) {
  .video-section .items.full {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}

.video-section .items.full > *:nth-child(1) {
  display: block !important;
}

@media (min-width: 1340px) {
  .video-section .items.full > *:nth-child(1) {
    display: block !important;
  }
}
</style>
