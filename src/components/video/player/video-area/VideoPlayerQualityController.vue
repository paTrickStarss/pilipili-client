<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import VideoPlayerQualityItem from '@/components/video/player/video-area/VideoPlayerQualityItem.vue'
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import type { VideoPlayerQualityItemProps } from '@/types/PropsType'

const props = defineProps({
  level: {
    type: Number,
    default: 6
  }
})
watch(() => props.level, () => {
  doUpdateQualityList(props.level)
})

// 清晰度
const currentQualityText = computed<string>(
  () =>
    qualityList.value.filter(
      quality => quality.id === currentQuality.value,
    )?.[0].text,
)
const currentQuality = defineModel('value', { type: Number, required: true })
const qualityList = ref<VideoPlayerQualityItemProps[]>([
  {
    id: 0,
    text: '4K 超清',
    value: 'v4k',
    vip: true,
    show: true,
  },
  {
    id: 1,
    text: '1080P 高码率',
    value: 'v1080p_hbit',
    vip: true,
    show: true,
  },
  {
    id: 2,
    text: '1080P 高清',
    value: 'v1080p',
    vip: false,
    show: true,
  },
  {
    id: 3,
    text: '720P 高清',
    value: 'v720p',
    vip: false,
    show: true,
  },
  {
    id: 4,
    text: '480P 清晰',
    value: 'v480p',
    vip: false,
    show: true,
  },
  {
    id: 5,
    text: '360P 流畅',
    value: 'v360p',
    vip: false,
    show: true,
  },
])

const showQualityMenu = ref<boolean>(false)
const btnEnter = ref<boolean>(false)
const menuEnter = ref<boolean>(false)
function btnMouseEnter() {
  btnEnter.value = true
  setTimeout(() => {
    if (btnEnter.value) {
      showQualityMenu.value = true
    }
  }, 100)
}
function btnMouseLeave() {
  btnEnter.value = false
  setTimeout(() => {
    if (!menuEnter.value) {
      showQualityMenu.value = false
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
      showQualityMenu.value = false
    }
  }, 100)
}

function doUpdateQualityList(level: number) {
  // console.log('doUpdateQualityList', level)
  const unavailableLevelCount = Math.min((qualityList.value.length - level), qualityList.value.length)
  for (let i = 0; i < unavailableLevelCount; i++) {
    qualityList.value[i].show = false
  }
}

onMounted(() => {
  doUpdateQualityList(props.level)
})
</script>

<template>
  <div
    class="bpx-player-ctrl-btn bpx-player-ctrl-quality"
    aria-label="清晰度"
    tabindex="0"
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
