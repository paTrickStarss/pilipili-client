<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, reactive, ref } from 'vue'
import VideoPlayerVideoArea from '@/components/video/player/video-area/VideoPlayerVideoArea.vue'
import VideoPlayerSendingArea from '@/components/video/player/sending-area/VideoPlayerSendingArea.vue'

defineProps<{ src: string; vid: number }>()
const screenMode = ref('normal')
const controlHidden = ref(false)
const playerContainerRef = ref<HTMLDivElement>()
const danmakuSwitchOn = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
function playerMouseEnter() { controlHidden.value = false }
function playerMouseLeave() { if (screenMode.value !== 'full') controlHidden.value = true }
function fullscreenMouseMoveHandler() {
  clearTimeout(timer)
  controlHidden.value = false
  timer = setTimeout(() => { controlHidden.value = true }, 2000)
}
function fullscreenChange() {
  const full = document.fullscreenElement === playerContainerRef.value
  screenMode.value = full ? 'full' : 'normal'
  window.removeEventListener('mousemove', fullscreenMouseMoveHandler)
  clearTimeout(timer)
  controlHidden.value = false
  if (full) window.addEventListener('mousemove', fullscreenMouseMoveHandler)
}
provide('fullscreenHandler', reactive({ handleFullscreen: () => playerContainerRef.value?.requestFullscreen() }))
onMounted(() => document.addEventListener('fullscreenchange', fullscreenChange))
onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', fullscreenChange)
  window.removeEventListener('mousemove', fullscreenMouseMoveHandler)
  clearTimeout(timer)
})
</script>

<template>
  <div id="bilibili-player">
    <div class="bpx-docker bpx-docker-major">
<!--      要全屏播放视频，则使bpx-player-container全屏，不要直接让video全屏，否则其他组件看不到-->
      <div
        ref="playerContainerRef"
        class="bpx-player-container bpx-state-no-cursor"
        :data-ctrl-hidden="controlHidden"
        data-revision="1"
        :data-screen="screenMode"
      >
        <div
          class="bpx-player-primary-area"
          aria-label="播放器"
          @mouseenter="playerMouseEnter"
          @mouseleave="playerMouseLeave"
        >
          <video-player-video-area
            :src="src"
            :data-shadow-show="controlHidden"
            :danmaku-switch-on="danmakuSwitchOn"
          />
<!--          <div ref="nplayerRef"></div>-->
          <video-player-sending-area v-model:switch="danmakuSwitchOn" />
        </div>
      </div>
    </div>
  </div>
</template>

<style >
#bilibili-player {
  width: 100%;
  min-width: 0;
  position: static;
}
.bpx-docker {
  /*  -webkit-box-sizing: content-box;
  box-sizing: content-box;*/
  -webkit-box-sizing: initial;
  box-sizing: initial;
  font-size: 12px;
  font-style: normal;
  line-height: 1;
}

.bpx-docker-major {
  height: 100%;
  position: relative;
  width: 100%;
}
.bpx-player-container {
  /*  -webkit-box-shadow: 0 0 8px #e5e9ef;
  box-shadow: 0 0 8px #e5e9ef;*/
  -webkit-box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
  box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
  height: 100%;
  position: relative;
  width: 100%;
}
.bpx-player-container[data-screen=full],
.bpx-player-container[data-screen=mini],
.bpx-player-container[data-screen=web] {
  z-index: 100000!important;
}
.bpx-player-primary-area {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
}

.quantity {
  position: relative;
  padding: 0 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0.8;
}
.quantity:hover {
  opacity: 1;
}
.quantity_item {
  padding: 5px 20px;
  font-weight: normal;
}
.quantity_item:hover {
  background: rgba(255, 255, 255, 0.3);
}
.quantity_item-active {
  color: var(--theme-color);
}

.bpx-player-video-area { aspect-ratio: 16 / 9; flex: auto; min-height: 0; }
.bpx-player-container:fullscreen { width: 100%; height: 100%; }
.bpx-player-container:fullscreen .bpx-player-video-area { flex: 1; aspect-ratio: auto; }
.bpx-player-primary-area { container-type: inline-size; }

</style>
