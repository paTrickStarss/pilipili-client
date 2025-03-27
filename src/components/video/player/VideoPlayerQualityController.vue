<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import VideoPlayerQualityItem from '@/components/video/player/VideoPlayerQualityItem.vue'
import { computed, ref } from 'vue'
import type { VideoPlayerQualityItemProps } from '@/types/PropsType'

// 清晰度
const showQualityMenu = ref<boolean>(false)
const currentQualityText = computed<string>(() =>
  qualityList.value
    .filter(quality => quality.id === currentQuality.value )
    ?.[0].text
)
const currentQuality = defineModel('value',
  { type: Number, required: true })
const qualityList = ref<VideoPlayerQualityItemProps[]>([
  {
    id: 0,
    text: '4K 超清',
    vip: true
  },
  {
    id: 1,
    text: '1080P 高码率',
    vip: true
  },
  {
    id: 2,
    text: '1080P 高清',
    vip: false
  },
  {
    id: 3,
    text: '720P 高清',
    vip: true
  },
  {
    id: 4,
    text: '480P 清晰',
    vip: true
  },
  {
    id: 5,
    text: '360P 流畅',
    vip: true
  },
])

</script>

<template>
  <div
    class="bpx-player-ctrl-btn bpx-player-ctrl-quality"
    aria-label="清晰度" tabindex="0"
  >
    <div class="bpx-player-ctrl-quality-result">{{ currentQualityText }}</div>
    <div class="bpx-player-ctrl-quality-menu-wrap" v-show="showQualityMenu">
      <ul class="bpx-player-ctrl-quality-menu">
        <video-player-quality-item
          v-for="item in qualityList"
          :key="item.id"
          :info="item"
          v-model:value="currentQuality"
        />
      </ul>
    </div>
    <div class="bpx-player-ctrl-quality-bubble" v-show="false"></div>
  </div>
</template>

<style scoped>

.bpx-player-ctrl-quality {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  font-size: 12px;
  margin-right: 10px;
  width: auto;
}
.bpx-player-ctrl-quality-result {
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}
.bpx-player-ctrl-quality-menu-wrap {
  background-color: hsla(0,0%,8%,.9);
  border-radius: 2px;
  bottom: 41px;
  cursor: pointer;
  left: 50%;
  margin: 0;
  max-height: 580px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.bpx-player-ctrl-quality-menu {
  display: none;
  margin: 0;
  padding: 0;
}
.bpx-player-ctrl-quality-bubble {
  bottom: 50px;
  position: absolute;
}
</style>
