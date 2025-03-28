<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import VideoPlayerDanmakuItem from '@/components/video/player/video-area/VideoPlayerDanmakuItem.vue'
import { computed, ref } from 'vue'
import IconProgressThumb from '@/components/icons/IconProgressThumb.vue'
import IconVideoPlayerPause from '@/components/icons/IconVideoPlayerPause.vue'
import IconVideoPlayerPlay from '@/components/icons/IconVideoPlayerPlay.vue'
import VideoPlayerQualityItem from '@/components/video/player/video-area/VideoPlayerQualityItem.vue'
import type { VideoPlayerQualityItemProps } from '@/types/PropsType'
import VideoPlayerQualityController from '@/components/video/player/video-area/VideoPlayerQualityController.vue'
import VideoPlayerPlayerbackRateController from '@/components/video/player/video-area/VideoPlayerPlayerbackRateController.vue'
import IconSubtitleDeactivated from '@/components/icons/IconSubtitleDeactivated.vue'
import IconSubtitle from '@/components/icons/IconSubtitle.vue'
import VideoPlayerVolumeController from '@/components/video/player/video-area/VideoPlayerVolumeController.vue'
import VideoPlayerSettingsController from '@/components/video/player/video-area/VideoPlayerSettingsController.vue'
import IconPipEnter from '@/components/icons/IconPipEnter.vue'
import IconWideEnter from '@/components/icons/IconWideEnter.vue'
import IconWebEnter from '@/components/icons/IconWebEnter.vue'
import IconFullScreen from '@/components/icons/IconFullScreen.vue'

defineProps({
  dataShadowShow: Boolean,
})

const videoSrc = ref<string>()

const progressBuffer = ref<number>(19)
const progressCurrent = ref<number>(7)
const currentPointX = ref<number>(50)
const currentPointTime = ref<number>(50)
const indicatorLeft = ref<number>(104)
const seekTime = ref<number>(104)
const currentTime = ref<number>(104)
const duration = ref<number>(104)
const previewImageB64 = ref<string>()
const playerPause = ref<boolean>(false)

// 清晰度
const currentQuality = ref<number>(0)
// 倍速
const currentPlaybackRate = ref<number>(3)
// 字幕
const showSubtitle = ref<boolean>(false)
// 音量
const volume = ref<number>(70)


</script>

<template>
  <div class="bpx-player-video-area">
    <div class="bpx-player-error-sign"></div>

<!--    视频内容区域-->
    <div class="bpx-player-video-perch">
      <div class="bpx-player-video-wrap">
        <video
          id="video-player"
          crossorigin="anonymous"
          preload="auto"
          :src="videoSrc"
        />
      </div>
    </div>


    <div class="bpx-player-video-poster" v-show="false"></div>
    <div class="bpx-player-visual-wrap">
      <div class="bpx-player-visual-pixel"></div>
    </div>

    <!--      弹幕渲染区域-->
    <div class="bpx-player-render-dm-wrap">
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
      <div class="bpx-player-cmd-dm-wrap">
        <div class="bpx-player-cmd-dm-inside" style="width: 750px; height: 422px;"></div>
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
    <div class="bpx-player-control-wrap">
      <div class="bpx-player-control-mask"></div>
      <div class="bpx-player-control-entity" :data-shadow-show="dataShadowShow">
        <!--          控制栏顶部：进度条-->
        <div class="bpx-player-control-top">
          <div class="bpx-player-progress-area">
            <div class="bpx-player-progress-freezone"></div>
            <div class="bpx-player-progress-wrap">
              <div class="bpx-player-progress" style="height: 4px">
                <!--                  进度条块（已播放和已缓冲）-->
                <div class="bpx-player-progress-schedule-wrap">
                  <div class="bpx-player-progress-schedule">
                    <div
                      class="bpx-player-progress-schedule-buffer"
                      :style="{ transform: `scaleX(${progressBuffer}%)` }"
                    ></div>
                    <div
                      class="bpx-player-progress-schedule-current"
                      :style="{ transform: `scaleX(${progressCurrent}%)` }"
                    ></div>
                  </div>
                </div>
                <div class="bpx-player-progress-point-wrap"></div>
                <!--                  当前进度位置图标-->
                <div
                  class="bpx-player-progress-thumb"
                  :style="{ transform: `translateX(${currentPointX}px)`}"
                >
                  <div class="bpx-player-progress-thumb-icon bpx-player-progress-thumb-icon-dynamic">
                    <div>
                      <IconProgressThumb
                        style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                      />
                    </div>
                  </div>
                </div>
                <!--                  当前鼠标位置指示器-->
                <div
                  class="bpx-player-progress-move-indicator"
                  :style="{ left: `${indicatorLeft}px`}"
                >
                  <div class="bpx-player-progress-move-indicator-down"></div>
                  <div class="bpx-player-progress-move-indicator-up"></div>
                </div>
                <!--                  指定时间位置预览画面-->
                <div
                  class="bpx-player-progress-popup"
                  :style="{ left: `${indicatorLeft}px`}"
                >
                  <div class="bpx-player-progress-preview">
                    <img
                      class="bpx-player-progress-preview-image"
                      :src="previewImageB64"
                      alt=""
                    >
                    <div class="bpx-player-progress-preview-time">
                      {{ currentPointTime }}
                    </div>
                  </div>
                </div>
                <div
                  class="bpx-player-progress-pull-indicator"
                  :style="{ left: `${indicatorLeft}px`}"
                ></div>
                <div
                  class="bpx-player-progress-cursor"
                  :style="{ left: `${indicatorLeft}px`}"
                ></div>
                <div class="bpx-player-progress-scaleplate"></div>
              </div>
            </div>
          </div>

        </div>

        <!--          控制栏底部：控制按钮-->
        <div class="bpx-player-control-bottom">
          <div class="bpx-player-control-bottom-left">
            <div class="bpx-player-ctrl-btn bpx-player-ctrl-play" aria-label="播放/暂停" tabindex="0">
              <div class="bpx-player-ctrl-btn-icon">
                  <span class="bpx-common-svg-icon">
                    <IconVideoPlayerPlay
                      v-show="playerPause"
                      style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                    />
                    <IconVideoPlayerPause
                      v-show="!playerPause"
                      style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                    />
                  </span>
              </div>
            </div>
            <div class="bpx-player-ctrl-btn bpx-player-ctrl-time">
              <input class="bpx-player-ctrl-time-seek" v-model="seekTime" v-show="false">
              <div class="bpx-player-ctrl-time-label">
                <span class="bpx-player-ctrl-time-current">{{ currentTime }}</span>
                <span class="bpx-player-ctrl-time-divide">/</span>
                <span class="bpx-player-ctrl-time-duration">{{ duration }}</span>
              </div>
            </div>
          </div>
          <div class="bpx-player-control-bottom-center"></div>
          <div class="bpx-player-control-bottom-right">

            <!--              清晰度控制-->
            <video-player-quality-controller v-model:value="currentQuality" />
            <!--              倍速控制-->
            <video-player-playerback-rate-controller v-model:value="currentPlaybackRate" />
            <div
              class="bpx-player-ctrl-btn bpx-player-ctrl-subtitle"
              aria-label="字幕" tabindex="0"
            >
              <div
                class="bpx-player-ctrl-btn-icon"
                @click="showSubtitle = !showSubtitle"
              >
                <span class="bpx-common-svg-icon">
                  <IconSubtitle
                    v-if="showSubtitle"
                    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                  />
                  <IconSubtitleDeactivated
                    v-else
                    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                  />
                </span>
              </div>
            </div>
<!--            音量控制-->
            <video-player-volume-controller v-model:value="volume" />
<!--            设置-->
            <video-player-settings-controller />
            <div
              class="bpx-player-ctrl-btn bpx-player-ctrl-pip"
              aria-label="画中画" title="画中画" tabindex="0"
            >
              <div class="bpx-player-ctrl-btn-icon bpx-player-ctrl-pip-enter">
                <span class="bpx-common-svg-icon">
                  <IconPipEnter
                    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                  />
                </span>
              </div>
            </div>
            <div
              class="bpx-player-ctrl-btn bpx-player-ctrl-wide"
              aria-label="宽屏" title="宽屏" tabindex="0"
            >
              <div class="bpx-player-ctrl-btn-icon bpx-player-ctrl-wide-enter">
                <span class="bpx-common-svg-icon">
                  <IconWideEnter
                    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                  />
                </span>
              </div>
            </div>
            <div
              class="bpx-player-ctrl-btn bpx-player-ctrl-web"
              aria-label="网页全屏" title="网页全屏" tabindex="0"
            >
              <div class="bpx-player-ctrl-btn-icon bpx-player-ctrl-web-enter">
                <span class="bpx-common-svg-icon">
                  <IconWebEnter
                    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                  />
                </span>
              </div>
            </div>
            <div
              class="bpx-player-ctrl-btn bpx-player-ctrl-full"
              aria-label="全屏" title="全屏" tabindex="0"
            >
              <div class="bpx-player-ctrl-btn-icon">
                <span class="bpx-common-svg-icon">
                  <IconFullScreen
                    style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bpx-player-dialog-wrap"></div>
    <div class="bpx-player-music-wrap"></div>
    <div class="bpx-player-business-wrap business-hide"></div>
    <div class="bpx-player-mini-warp" v-show="false"></div>

  </div>
</template>

<style>
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
  background: rgba(0,0,0,.1);
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
.bpx-player-adv-dm-wrap, .bpx-player-bas-dm-wrap, .bpx-player-row-dm-wrap {
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
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
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
  -webkit-transition: opacity .2s linear,visibility 0ms .2s;
  transition: opacity .2s linear,visibility 0ms .2s;
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
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  width: 100%;
  z-index: 45;
}
.bpx-player-container[data-ctrl-hidden=true] .bpx-player-top-wrap {
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

.bpx-player-control-wrap {
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 75;
}
.bpx-player-control-mask {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
  bottom: 0;
  height: 100px;
  left: 0;
  pointer-events: none;
  position: absolute;
  -webkit-transition: opacity .2s ease-in-out;
  transition: opacity .2s ease-in-out;
  width: 100%;
  z-index: -1;
}
.bpx-player-container[data-ctrl-hidden=true] .bpx-player-control-bottom,
.bpx-player-container[data-ctrl-hidden=true] .bpx-player-control-mask {
  opacity: 0;
}
.bpx-player-control-top {
  bottom: 44px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  left: 0;
  opacity: 1;
  padding: 0 12px;
  position: absolute;
  right: 0;
  -webkit-transition: opacity .2s ease-out;
  transition: opacity .2s ease-out;
  visibility: visible;
}
.bpx-player-control-entity[data-shadow-show=false] .bpx-player-shadow-progress-area,
.bpx-player-control-entity[data-shadow-show=true] .bpx-player-control-top {
  opacity: 0;
  visibility: hidden;
}
.bpx-player-progress-area {
  position: relative;
}
.bpx-player-progress-area .bpx-player-progress-freezone {
  pointer-events: none;
}
.bpx-player-progress-area .bpx-player-progress-wrap {
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 6px;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 4px;
  position: relative;
  -webkit-transition: -webkit-transform .1s cubic-bezier(0,0,.2,1);
/*  transition: -webkit-transform .1s cubic-bezier(0,0,.2,1);
  transition: transform .1s cubic-bezier(0,0,.2,1);*/
  transition: transform .1s cubic-bezier(0,0,.2,1),-webkit-transform .1s cubic-bezier(0,0,.2,1);
  width: 100%;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress .bpx-player-progress-schedule-wrap {
  height: 100%;
  position: absolute;
  width: 100%;
}
.bpx-player-progress-schedule {
  background-color: hsla(0,0%,100%,.2);
  border-radius: 1.5px;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
}
.bpx-player-progress-schedule-buffer,
.bpx-player-progress-schedule-current {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.bpx-player-progress-schedule-buffer {
  background-color: hsla(0,0%,100%,.3);
}
.bpx-player-progress-schedule-current {
  background-color: var(--bpx-primary-color,#00a1d6);
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-point-wrap {
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-thumb {
  height: 20px;
  pointer-events: none;
  width: 20px;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-thumb-icon {
  height: 100%;
  line-height: 12px;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition: all .2s;
  transition: all .2s;
  width: 100%;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-move-indicator {
  height: 16px;
  margin-left: -4px;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  -webkit-transition: opacity .1s;
  transition: opacity .1s;
  visibility: hidden;
  width: 8px;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-move-indicator-down {
  border-color: var(--bpx-primary-color,#00a1d6) transparent transparent;
  border-width: 4px 4px 0;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-move-indicator-up {
  border-color: transparent transparent var(--bpx-primary-color,#00a1d6);
  border-width: 0 4px 4px;
  margin-top: 8px;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-move-indicator>div {
  border-style: solid;
  height: 0;
  position: relative;
  width: 0;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-popup {
  background-color: transparent;
  border-radius: 2px;
  bottom: 22px;
  display: none;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  width: 160px;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-preview {
  height: 90px;
  position: relative;
  width: 160px;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-preview-image {
  height: 100%;
  margin: 0 auto;
  position: relative;
  vertical-align: inherit;
  width: 100%;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-preview-time {
  background-color: hsla(0,0%,8%,.9);
  border-radius: 2px;
  bottom: 0;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  left: 50%;
  line-height: 18px;
  padding: 0 5px;
  position: absolute;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  vertical-align: bottom;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-hotspot {
  background-color: hsla(0,0%,8%,.9);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  line-height: 18px;
  max-height: 48px;
  overflow: hidden;
  padding: 6px 8px;
  text-align: left;
  white-space: normal;
  word-break: break-all;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-hotspot:empty {
  display: none;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-pull-indicator {
  bottom: 6px;
  height: 18px;
  line-height: 18px;
  position: absolute;
  width: 18px;
}
.bpx-player-progress-area .bpx-player-progress-wrap .bpx-player-progress-cursor {
  background-color: #fff;
  border-radius: 5px;
  height: 10px;
  left: -5px;
  opacity: 0;
  position: absolute;
  -webkit-transition: opacity .2s .1s;
  transition: opacity .2s .1s;
  visibility: hidden;
  width: 10px;
}

.bpx-player-control-bottom {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 35px;
  justify-content: space-between;
  line-height: 22px;
  margin: 20px 0 0;
  padding: 0 12px;
  -webkit-transition: all .2s ease-out;
  transition: all .2s ease-out;
  width: 100%;
}
.bpx-player-container[data-ctrl-hidden=true] .bpx-player-control-bottom,
.bpx-player-container[data-ctrl-hidden=true] .bpx-player-control-mask {
  opacity: 0;
}
.bpx-player-control-bottom-left {
  -webkit-box-flex: 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex: none;
  flex: none;
}
.bpx-player-ctrl-btn {
  fill: #fff;
  color: hsla(0,0%,100%,.8);
  font-size: 0;
  height: 22px;
  line-height: 22px;
  outline: 0;
  position: relative;
  text-align: center;
  width: 36px;
  z-index: 2;
}
.bpx-player-ctrl-btn:hover {
  color: #fff;
}
.bpx-player-ctrl-btn-icon {
  cursor: pointer;
  width: 100%;
}
.bpx-common-svg-icon {
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  transition: fill .2s ease-in-out;
}
.bpx-common-svg-icon:hover {
  fill: #00a1d6;
}
.bpx-player-ctrl-btn-icon>.bpx-common-svg-icon {
  height: 22px;
  opacity: .9;
  vertical-align: middle;
}
.bpx-player-ctrl-btn-icon>.bpx-common-svg-icon svg {
  -webkit-transform: none!important;
  transform: none!important;
}
.bpx-player-ctrl-time {
  font-size: 12px;
  margin-right: 10px;
  min-width: 90px;
}
.bpx-player-ctrl-time-seek {
  background: hsla(0,0%,100%,.2);
  border: 1px solid transparent;
  color: inherit;
  font-size: 12px;
  height: 20px;
  left: 6px;
  line-height: 20px;
  padding: 0 5px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 60px;
}
.bpx-player-ctrl-time-label {
  height: 100%;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  width: 100%;
}
.bpx-player-ctrl-time-divide {
  padding: 0 2px;
}

.bpx-player-control-bottom-right {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
}
.bpx-docker ol, .bpx-docker ul {
  list-style: none;
  outline: none;
}
.bpx-docker a, .bpx-docker input {
  outline: none;
  -webkit-text-decoration: none;
  text-decoration: none;
}

.subtitle-switch-enter-active,
.subtitle-switch-leave-active {
  transition: opacity .9s ease;
}
.subtitle-switch-enter-from,
.subtitle-switch-leave-to {
  opacity: 0;
}
.subtitle-switch-enter-to,
.subtitle-switch-leave-from {
  opacity: 1;
}


.bpx-player-shadow-progress-area {
  bottom: 0;
  height: 2px;
  left: 0;
  position: absolute;
  right: 0;
  -webkit-transition: opacity .4s ease-in;
  transition: opacity .4s ease-in;
}
.bpx-player-control-entity[data-shadow-show=true] .bpx-player-shadow-progress-area {
  opacity: 1;
  visibility: visible;
}
.bpx-player-pbp {
  bottom: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  height: 28px;
  left: -12px;
  line-height: 28px;
  opacity: 0;
  padding: 0 12px;
  position: absolute;
  width: calc(100% + 24px);
  z-index: -1;
}
.bpx-player-ctrl-pip-enter {
  display: block;
}
.bpx-player-ctrl-wide-enter {
  display: block;
}
.bpx-player-ctrl-web-enter {
  display: block;
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
