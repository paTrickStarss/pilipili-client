<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import VideoPlayerPlaybackRateItem from '@/components/video/player/video-area/control/VideoPlayerPlaybackRateItem.vue'
import { computed, ref, watch } from 'vue'
import type { VideoPlayerPlaybackRateItemProps } from '@/types/PropsType'

const emits = defineEmits({
  /**
   * 更新播放速度
   * @param rate
   */
  updatePlaybackRate: (rate: number) => true
})

const resultText = computed(() => {
  if (currentPlaybackRateId.value === 3) {
    return '倍速'
  }
  return playbackRateList.value
    .filter(item => item.id === currentPlaybackRateId.value)
    ?.[0]
    .text
})
const currentPlaybackRateId = ref<number>(3)
watch(currentPlaybackRateId, () => {
  const value = playbackRateList.value[currentPlaybackRateId.value].value
  emits('updatePlaybackRate', value)
})
const playbackRateList = ref<VideoPlayerPlaybackRateItemProps[]>([
  {
    id: 0,
    text: '2.0x',
    value: 2.0
  },
  {
    id: 1,
    text: '1.5x',
    value: 1.5
  },
  {
    id: 2,
    text: '1.25x',
    value: 1.25
  },
  {
    id: 3,
    text: '1.0x',
    value: 1.0
  },
  {
    id: 4,
    text: '0.75x',
    value: 0.75
  },
  {
    id: 5,
    text: '0.5x',
    value: 0.5
  },
])


const showPlaybackRateMenu = ref<boolean>(false)
const btnEnter = ref<boolean>(false)
const menuEnter = ref<boolean>(false)
function btnMouseEnter() {
  btnEnter.value = true
  setTimeout(() => {
    if (btnEnter.value) {
      showPlaybackRateMenu.value = true
    }
  }, 100)
}
function btnMouseLeave() {
  btnEnter.value = false
  setTimeout(() => {
    if (!menuEnter.value) {
      showPlaybackRateMenu.value = false
    }
  }, 100)
}
function menuMouseEnter() {
  menuEnter.value = true
}
function menuMouseLeave() {
  menuEnter.value = false
  setTimeout(() => {
    if (!btnEnter.value) {
      showPlaybackRateMenu.value = false
    }
  }, 100)
}
</script>

<template>
  <div
    class="bpx-player-ctrl-btn bpx-player-ctrl-playbackrate"
    aria-label="倍速" tabindex="0"
    @mouseenter="btnMouseEnter"
    @mouseleave="btnMouseLeave"
  >
    <div class="bpx-player-ctrl-playbackrate-result">
      {{ resultText }}
    </div>
    <ul
      class="bpx-player-ctrl-playbackrate-menu"
      v-show="showPlaybackRateMenu"
      @mouseenter="menuMouseEnter"
      @mouseleave="menuMouseLeave"
    >
      <video-player-playback-rate-item
        v-for="item in playbackRateList"
        :key="item.id"
        :info="item"
        v-model:value="currentPlaybackRateId"
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
/*  -webkit-box-sizing: border-box;*/
  box-sizing: border-box;
/*  display: none;*/
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
