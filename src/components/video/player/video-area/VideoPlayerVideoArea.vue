<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import VideoPlayerDanmakuItem from '@/components/video/player/video-area/VideoPlayerDanmakuItem.vue'
import { onBeforeUnmount, ref } from 'vue'
import { useHlsPlayer } from '@/composables/useHlsPlayer'
import VideoPlayerControl from '@/components/video/player/video-area/control/VideoPlayerControl.vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  danmakuSwitchOn: {
    type: Boolean,
    required: true,
  },
  dataShadowShow: Boolean,
})
const videoRef = ref<HTMLVideoElement>()
const { error, qualities, quality, load, selectQuality } = useHlsPlayer(videoRef, () => props.src)

const controlRef = ref()

let timer: number | undefined;
function videoClick() {
  if (timer) {
    clearTimeout(timer)
    timer = undefined
    controlRef.value?.videoFullScreen()
  } else {
    timer = setTimeout(() => {
      controlRef.value?.videoPauseOrPlay()
      timer = undefined
    }, 300)
  }
}

onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
</script>

<template>
  <div class="bpx-player-video-area">
    <div v-if="error" class="media-error" role="alert"><p>{{ error }}</p><button @click="load">重试</button></div>

    <!--    视频内容区域-->
    <div class="bpx-player-video-perch">
      <div class="bpx-player-video-wrap">
        <video
          ref="videoRef"
          id="video-player"
          crossorigin="anonymous"
          preload="auto"
          @click="videoClick"
        />
      </div>
    </div>

    <div class="bpx-player-video-poster" v-show="false"></div>
    <div class="bpx-player-visual-wrap">
      <div class="bpx-player-visual-pixel"></div>
    </div>

    <!--      弹幕渲染区域-->
    <div class="bpx-player-render-dm-wrap">
      <div
        class="bpx-player-dm-svg-mask-wrap"
        :style="{ opacity: 0, visibility: `${danmakuSwitchOn? 'hidden' : 'visible'}` }"
      ></div>

      <div class="bpx-player-dm-mask-wrap" v-show="danmakuSwitchOn">
        <div class="bpx-player-adv-dm-wrap"></div>
        <div class="bpx-player-bas-dm-wrap">
          <div class="bas-danmaku bas-danmaku-pause" style="width: 100%"></div>
        </div>
        <div class="bpx-player-row-dm-wrap bili-danmaku-x-paused">
          <div class="bili-danmaku-x-dm-rotate"></div>
          <VideoPlayerDanmakuItem
            v-for="i in 10"
            :key="i"
            :content="`弹幕${i}`"
          />
        </div>
      </div>

      <div class="bpx-player-cmd-dm-wrap">
        <div
          class="bpx-player-cmd-dm-inside"
          style="width: 100%; height: 100%"
        ></div>
      </div>
    </div>

    <div class="bpx-player-ending-wrap"></div>
    <div class="bpx-player-subtitle-wrap"></div>
    <div class="bpx-player-top-wrap"></div>
    <div class="bpx-player-state-wrap"></div>
    <div class="bpx-player-loading-panel"></div>
    <div class="bpx-player-toast-wrap"></div>
    <div class="bpx-player-summary-wrap"></div>

    <!--      视频控制栏-->
    <video-player-control v-if="videoRef"
      ref="controlRef"
      :data-shadow-show="dataShadowShow"
      :video="videoRef"
      :qualities="qualities" :quality-level="quality"
      @updateHlsLevel="selectQuality"
    />

    <div class="bpx-player-dialog-wrap"></div>
    <div class="bpx-player-music-wrap"></div>
    <div class="bpx-player-business-wrap business-hide"></div>
    <div class="bpx-player-mini-warp" v-show="false"></div>
  </div>
</template>

<style>
.media-error { position: absolute; inset: 0; z-index: 20; display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center; color: white; background: #111; }
.media-error button { color: white; background: #333; border: 1px solid #666; border-radius: 6px; padding: 8px 24px; cursor: pointer; }

.bpx-player-video-area {
  -webkit-box-flex: 1;
  background-color: #000;
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.bpx-player-error-sign {
  color: red;
  display: none;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  right: 50%;
  top: 75%;
  -webkit-transform: translateX(50%);
  transform: translateX(50%);
  z-index: 99;
}

.bpx-player-video-perch {
  -webkit-box-flex: 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: none;
  flex: none;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}
/*.bpx-state-no-cursor .bpx-player-video-perch {
  cursor: none;
}*/
.bpx-player-video-wrap {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  height: 100%;
  width: 100%;
}
.bpx-player-video-wrap .bpx-player-seamless-replacement,
.bpx-player-video-wrap bwp-video,
.bpx-player-video-wrap video {
  content-visibility: visible;
  display: block;
  height: 100%;
  margin: auto;
  width: 100%;
}

.bpx-player-video-poster {
  bottom: 0;
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
.bpx-player-visual-wrap {
  pointer-events: none;
  visibility: hidden;
  width: 100%;
}
.bpx-player-visual-wrap .bpx-player-visual-pixel {
  background: rgba(0, 0, 0, 0.1);
  height: 1px;
  left: 0;
  position: absolute;
  top: 50%;
  width: 1px;
}

.bpx-player-render-dm-wrap {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  z-index: 11;
}
.bpx-player-adv-dm-wrap,
.bpx-player-bas-dm-wrap,
.bpx-player-dm-mask-wrap,
.bpx-player-row-dm-wrap {
  cursor: pointer;
  height: 100%;
  left: 0;
  -webkit-mask-position: center;
  mask-position: center;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  z-index: 2;
}
.bas-danmaku {
  background: transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  z-index: 10;
}
.bili-danmaku-x-dm-rotate {
  position: absolute;
  top: -15%;
  left: -6%;
  right: -6%;
  bottom: -15%;
  pointer-events: none;
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  -webkit-transform-origin: center;
  transform-origin: center;
  z-index: 4;
}

.bpx-player-cmd-dm-wrap {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 11;
}
.bpx-player-cmd-dm-wrap,
.bpx-player-cmd-dm-wrap .bpx-player-cmd-dm-inside {
  height: 100%;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
}
.bpx-player-cmd-dm-wrap .bpx-player-cmd-dm-inside {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 9.5952024%;
  position: relative;
  z-index: 10;
}

.bpx-player-ending-wrap {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 55;
}
.bpx-player-ending-backdrop,
.bpx-player-ending-panel,
.bpx-player-ending-wrap,
.bpx-player-share-panel {
  opacity: 0;
  -webkit-transition:
    opacity 0.2s linear,
    visibility 0ms 0.2s;
  transition:
    opacity 0.2s linear,
    visibility 0ms 0.2s;
  visibility: hidden;
}
.bpx-player-subtitle-wrap {
  z-index: 16;
}
.bpx-player-top-wrap {
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 45;
}
.bpx-player-container[data-ctrl-hidden='true'] .bpx-player-top-wrap {
  opacity: 0;
  visibility: hidden;
}
.bpx-state-paused .bpx-player-state-wrap {
  bottom: 62px;
  cursor: pointer;
  pointer-events: none;
  position: absolute;
  right: 34px;
  z-index: 48;
}
.bpx-player-loading-panel {
  background-color: #000;
  display: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 57;
}
.bpx-player-toast-wrap {
  bottom: 60px;
  font-size: 14px;
  left: 10px;
  line-height: 28px;
  pointer-events: none;
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 65;
}

.bpx-player-music-wrap {
  position: absolute;
  right: 0;
  top: 0;
}
.bpx-player-business-wrap {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 63;
}
.bpx-player-business-wrap.business-hide {
  display: none;
}
.bpx-player-mini-warp {
  bottom: 0;
  cursor: move;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 12;
}
</style>
