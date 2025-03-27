<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IndexView from '@/views/index/IndexView.vue'
import VideoInfo from '@/components/video/VideoInfo.vue'
import { ref } from 'vue'
import type { VideoPageInfoProps } from '@/types/PropsType'
import VideoPlayer from '@/components/video/player/VideoPlayer.vue'

const videoInfoEntity = ref<VideoPageInfoProps>({
  vid: 1101,
  title: '【毕导】往开水里尿尿，开水会瞬间逆流而上烫伤你？请看VCR！',
  publishDate: '2025-01-23 21:45:23',
  viewCount: 125124,
  danmakuCount: 782,
  honorText: '全站排行榜最高第4名',
  argue: '该内容仅供娱乐，请勿过分解读',
  reprintPermit: 1
})
</script>

<template>
  <index-view>
    <div id="mirror-vdcon" class="video-container-v1">
      <div class="left-container scroll-sticky">
        <video-info :info="videoInfoEntity" />
        <div id="playerWrap" class="player-wrap">
          <video-player />
        </div>
      </div>

      <div class="right-container">

      </div>
    </div>
  </index-view>
</template>

<style scoped>
.video-container-v1 {
  width: auto;
  padding: 0 10px;
}
.video-container-v1 {
  display: flex;
  justify-content: center;
  box-sizing: content-box;
  position: relative;
}
.left-container {
  width: 750px;
}
.video-container-v1 .left-container {
  position: relative;
}
.video-container-v1 .left-container.scroll-sticky {
  position: sticky;
  height: fit-content;
  z-index: 1;
}
.player-wrap {
  position: relative;
}
#playerWrap {
  height: 468px;
}


.video-container-v1 .right-container {
  width: 350px;
  flex: none;
  margin-left: 30px;
  position: relative;
  pointer-events: none;
}

.fixed-sidenav-storage {
  position: fixed;
  right: 6px;
  bottom: 50px;
  z-index: 6;
}
</style>
