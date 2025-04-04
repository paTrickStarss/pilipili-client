<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IconVolume from '@/components/icons/IconVolume.vue'
import IconMuted from '@/components/icons/IconMuted.vue'
import { ref } from 'vue'
import SliderBar from '@/components/global/SliderBar.vue'

const value = defineModel('value', {
  type: Number,
  required: true,
  validator: (value: number) => value >= 0 && value <= 100,
})
defineExpose({
  switchMuted
})

const valueCache = ref<number>(value.value)
const muted = ref<boolean>(false)

function switchMuted() {
  muted.value = !muted.value
  if (muted.value) {
    valueCache.value = value.value
    value.value = 0
  } else {
    value.value = valueCache.value
  }
}


const showVolumeBar = ref<boolean>(false)
const btnEnter = ref<boolean>(false)
const menuEnter = ref<boolean>(false)
function btnMouseEnter() {
  btnEnter.value = true
  setTimeout(() => {
    if (btnEnter.value) {
      showVolumeBar.value = true
    }
  }, 100)
}
function btnMouseLeave() {
  btnEnter.value = false
  setTimeout(() => {
    if (!menuEnter.value) {
      showVolumeBar.value = false
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
      showVolumeBar.value = false
    }
  }, 100)
}
</script>

<template>
  <div
    class="bpx-player-ctrl-btn bpx-player-ctrl-volume"
    aria-label="音量" tabindex="0"
    @mouseenter="btnMouseEnter"
    @mouseleave="btnMouseLeave"
  >
    <div
      class="bpx-player-ctrl-btn-icon"
      @click="switchMuted"
    >
      <span class="bpx-common-svg-icon">
        <IconMuted
          style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
          v-if="muted"
        />
        <IconVolume
          style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
          v-else
        />
      </span>
    </div>

    <div
      class="bpx-player-ctrl-volume-box"
      v-show="showVolumeBar"
      @mouseenter="menuMouseEnter"
      @mouseleave="menuMouseLeave"
    >
      <div class="bpx-player-ctrl-volume-number">{{ value.toFixed(0) }}</div>
      <slider-bar
        class="bpx-player-ctrl-volume-progress"
        v-model:value="value"
      />
    </div>
  </div>
</template>

<style>
.bpx-player-ctrl-volume-box {
  background: hsla(0,0%,8%,.9);
  border-radius: 2px;
  bottom: 41px;
/*  display: none;*/
  height: 100px;
  left: 50%;
  margin-left: -16px;
  position: absolute;
  width: 32px;
}
.bpx-player-ctrl-volume-number {
  color: #e5e9ef;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  margin-bottom: 2px;
  text-align: center;
  width: 100%;
}
.bpx-player-ctrl-volume-progress {
  height: 60px!important;
  margin: 0 auto;
}
.bpx-player-ctrl-volume-progress .bui-area {
  -webkit-box-pack: center!important;
  -ms-flex-pack: center!important;
  justify-content: center!important;
}
</style>
