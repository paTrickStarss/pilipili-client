<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import type { VideoPlayerPlaybackRateItemProps } from '@/types/PropsType'

defineProps<{
  info: VideoPlayerPlaybackRateItemProps
}>()
const selectedIndex = defineModel('value',
  { type: Number, required: true })
</script>

<template>
  <li
    class="bpx-player-ctrl-playbackrate-menu-item"
    :class="{ 'bpx-state-active': selectedIndex === info.id }"
    @click="selectedIndex = info.id"
  >
    {{ info.text }}
  </li>
</template>

<style scoped>
.bpx-player-ctrl-playbackrate-menu-item {
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  position: relative;
}
.bpx-player-ctrl-playbackrate-menu-item.bpx-state-active {
  color: var(--bpx-primary-color,#00a1d6);
}
.bpx-player-ctrl-playbackrate-menu-item:hover {
  background-color: hsla(0, 0%, 25%, 0.8);
}

</style>
