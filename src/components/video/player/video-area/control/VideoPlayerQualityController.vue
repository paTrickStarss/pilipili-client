<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { computed, ref } from 'vue'
import VideoPlayerQualityItem from '@/components/video/player/video-area/control/VideoPlayerQualityItem.vue'
import type { VideoPlayerQualityItemProps } from '@/types/PropsType'
const props = defineProps<{ qualities: VideoPlayerQualityItemProps[] }>()
const currentQuality = defineModel<number>('value', { required: true })
const qualityList = computed(() => [{ id: -1, text: '自动', value: 'auto', vip: false, show: true }, ...props.qualities])
const currentQualityText = computed(() => qualityList.value.find(item => item.id === currentQuality.value)?.text || '自动')
const showQualityMenu = ref(false)
function btnMouseEnter() { showQualityMenu.value = true }
function btnMouseLeave() { showQualityMenu.value = false }
function menuMouseEnter() { showQualityMenu.value = true }
function menuMouseLeave() { showQualityMenu.value = false }
</script>

<template>
  <div
    class="bpx-player-ctrl-btn bpx-player-ctrl-quality"
    aria-label="清晰度"
    tabindex="0"
    @click="showQualityMenu = !showQualityMenu"
    @keydown.enter.prevent="showQualityMenu = !showQualityMenu"
    @keydown.esc="showQualityMenu = false"
    @mouseenter="btnMouseEnter"
    @mouseleave="btnMouseLeave"
  >
    <div class="bpx-player-ctrl-quality-result">{{ currentQualityText }}</div>
    <div
      class="bpx-player-ctrl-quality-menu-wrap"
      v-show="showQualityMenu"
      @mouseenter="menuMouseEnter"
      @mouseleave="menuMouseLeave"
    >
      <ul class="bpx-player-ctrl-quality-menu">
        <video-player-quality-item
          v-for="item in qualityList.filter(q => q.show)"
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
  width: auto !important;
}
/*.bpx-player-ctrl-quality:hover {
  margin-top: -10px;
  padding-top: -10px;
}*/
.bpx-player-ctrl-quality-result {
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}
.bpx-player-ctrl-quality-menu-wrap {
  background-color: hsla(0, 0%, 8%, 0.9);
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
  /*  display: none;*/
  margin: 0;
  padding: 0;
}
.bpx-player-ctrl-quality-bubble {
  bottom: 50px;
  position: absolute;
}
</style>
