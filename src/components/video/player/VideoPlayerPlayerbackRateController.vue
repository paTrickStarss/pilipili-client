<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import VideoPlayerPlaybackRateItem from '@/components/video/player/VideoPlayerPlaybackRateItem.vue'
import { computed, ref } from 'vue'
import type { VideoPlayerPlaybackRateItemProps } from '@/types/PropsType'


const resultText = computed(() => {
  if (currentPlaybackRate.value === 3) {
    return '倍速'
  }
  return playbackRateList.value
    .filter(item => item.id === currentPlaybackRate.value)
    ?.[0]
    .text
})
const currentPlaybackRate = defineModel('value',
  { type: Number, required: true })
const playbackRateList = ref<VideoPlayerPlaybackRateItemProps[]>([
  {
    id: 0,
    text: '2.0x'
  },
  {
    id: 1,
    text: '1.5x'
  },
  {
    id: 2,
    text: '1.25x'
  },
  {
    id: 3,
    text: '1.0x'
  },
  {
    id: 4,
    text: '0.75x'
  },
  {
    id: 5,
    text: '0.5x'
  },
])
</script>

<template>
  <div
    class="bpx-player-ctrl-btn bpx-player-ctrl-playbackrate"
    aria-label="倍速" tabindex="0"
  >
    <div class="bpx-player-ctrl-playbackrate-result">
      {{ resultText }}
    </div>
    <ul class="bpx-player-ctrl-playbackrate-menu">
      <video-player-playback-rate-item
        v-for="item in playbackRateList"
        :key="item.id"
        :info="item"
        v-model:value="currentPlaybackRate"
      />
    </ul>
  </div>
</template>

<style scoped>
.bpx-player-ctrl-playbackrate {
  font-size: 14px;
  width: 50px;
}
.bpx-player-ctrl-playbackrate-result {
  cursor: pointer;
  font-weight: 600;
  width: 100%;
}
.bpx-player-ctrl-playbackrate-menu {
  background-color: hsla(0,0%,8%,.9);
  border-radius: 2px;
  bottom: 41px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: none;
  left: 50%;
  margin: 0;
  padding: 0;
  position: absolute;
  text-align: center;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 70px;
}
</style>
