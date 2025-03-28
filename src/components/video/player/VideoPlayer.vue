<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import VideoPlayerVideoArea from '@/components/video/player/video-area/VideoPlayerVideoArea.vue'
import { ref } from 'vue'
import VideoPlayerSendingArea from '@/components/video/player/sending-area/VideoPlayerSendingArea.vue'

const controlHidden = ref<boolean>(true)

</script>

<template>
  <div id="bilibili-player">
    <div class="bpx-docker bpx-docker-major">
      <div class="bpx-player-container bpx-state-no-cursor" :data-ctrl-hidden="controlHidden" data-revision="1">
        <div
          class="bpx-player-primary-area"
          aria-label="播放器"
          @mouseenter="controlHidden = false"
          @mouseleave="controlHidden = true"
        >
          <video-player-video-area :data-shadow-show="controlHidden" />
          <video-player-sending-area />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#bilibili-player {
  width: 750px;
  height: 468px;
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
  -webkit-box-shadow: 0 0 8px var(--bpx-box-shadow,#e5e9ef);
  box-shadow: 0 0 8px var(--bpx-box-shadow,#e5e9ef);
  height: 100%;
  position: relative;
  width: 100%;
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
</style>
