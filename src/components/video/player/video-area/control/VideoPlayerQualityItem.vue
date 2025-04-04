<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import type { VideoPlayerQualityItemProps } from '@/types/PropsType'

defineProps<{
  info: VideoPlayerQualityItemProps
}>()

const selectedIndex = defineModel('value',
  { type: Number, required: true },)

</script>

<template>
  <li
    class="bpx-player-ctrl-quality-menu-item"
    :class="{ 'bpx-state-active': selectedIndex === info.id }"
    @click="selectedIndex = info.id"
  >
    <span class="bpx-player-ctrl-quality-text">
      {{ info.text }}
    </span>
    <span
      v-show="info.vip"
      class="bpx-player-ctrl-quality-badge bpx-player-ctrl-quality-badge-bigvip"
    >
      大会员
    </span>
  </li>
</template>

<style scoped>
.bpx-player-ctrl-quality-menu-item {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 36px;
  padding: 0 12px;
  white-space: nowrap;
  width: 165px;
}
.bpx-player-ctrl-quality-menu-item.bpx-state-active {
  color: var(--bpx-primary-color,#00a1d6);
}
.bpx-player-ctrl-quality-menu-item:hover {
  background-color: hsla(0, 0%, 25%, 0.8);
}
.bpx-player-ctrl-quality-menu-item>span {
  pointer-events: none;
}
.bpx-player-ctrl-quality-badge {
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
  position: absolute;
  right: 12px;
}
.bpx-player-ctrl-quality-badge-bigvip {
  background-color: #f25d8e;
  color: #fff;
}



</style>
