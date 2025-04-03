<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IconVideoPlayerPause from '@/components/icons/IconVideoPlayerPause.vue'
import VideoPlayerSettingsController from '@/components/video/player/video-area/VideoPlayerSettingsController.vue'
import IconFullScreen from '@/components/icons/IconFullScreen.vue'
import IconVideoPlayerPlay from '@/components/icons/IconVideoPlayerPlay.vue'
import IconSubtitle from '@/components/icons/IconSubtitle.vue'
import IconSubtitleDeactivated from '@/components/icons/IconSubtitleDeactivated.vue'
import IconPipEnter from '@/components/icons/IconPipEnter.vue'
import VideoPlayerQualityController from '@/components/video/player/video-area/VideoPlayerQualityController.vue'
import VideoPlayerVolumeController from '@/components/video/player/video-area/VideoPlayerVolumeController.vue'
import IconWebEnter from '@/components/icons/IconWebEnter.vue'
import IconProgressThumb from '@/components/icons/IconProgressThumb.vue'
import IconWideEnter from '@/components/icons/IconWideEnter.vue'
import VideoPlayerPlayerbackRateController from '@/components/video/player/video-area/VideoPlayerPlayerbackRateController.vue'
import { inject, onMounted, ref, watch } from 'vue'
import type { VideoPlayerPlaybackRateItemProps } from '@/types/PropsType'
import { DateTimeUtil } from '@/utils/DateTimeUtil'
import { isEmptyString } from '@/utils/CommonUtil'

const props = defineProps({
  dataShadowShow: {
    type: Boolean,
    required: true,
  },
  qualityLevel: {
    type: Number,
    default: 6
  }
})
const emits = defineEmits({
  /**
   * 更新Hls当前清晰度
   * @param level
   */
  updateHlsLevel: (level: number) => true,
})

const videoRef = defineModel('video', {
  type: HTMLVideoElement,
  required: true,
})

const progressBuffer = ref<number>(0)
const progressCurrent = ref<number>(0)
const currentPointX = ref<number>(50)
const currentPointTime = ref<number>(50)
const indicatorLeft = ref<number>(104)
// const seekTime = ref<number>(0)
const seekTimeText = ref<string>('00:00')
const currentTime = ref<number>(0)
const duration = ref<number>(0)
const previewImageB64 = ref<string>()
const playerPause = ref<boolean>(true)

// 清晰度 1 - 6 (360p 480p 720p 1080p 1080p_hbit 4k)
// const qualityLevel = ref<number>(6)
watch(() => props.qualityLevel, () => {
  console.log('qualityLevel updated', props.qualityLevel)
  currentQuality.value = 6 - props.qualityLevel
})
const currentQuality = ref<number>(6 - props.qualityLevel)
watch(currentQuality, () => {
  console.log('currentQuality', currentQuality)
  updateHlsCurrentLevel(7 - currentQuality.value)
})
function updateHlsCurrentLevel(level: number) {
  emits('updateHlsLevel', level)
}
// 倍速
const currentPlaybackRate = ref<VideoPlayerPlaybackRateItemProps>()
watch(currentPlaybackRate, () => {
  changePlaybackRate(currentPlaybackRate.value?.value || 1)
})
// 字幕
const showSubtitle = ref<boolean>(false)
// 音量
const volume = ref<number>(70)
watch(volume, () => {
  videoRef.value.volume = volume.value / 100
})
// watch(() => videoRef.value.currentTime, () => {
//
// })

// 播放/暂停
function videoPauseOrPlay() {
  if (playerPause.value) {
    // 播放
    videoRef.value.play()
    playerPause.value = false
  } else {
    // 暂停
    videoRef.value.pause()
    playerPause.value = true
  }
}

const isDragging = ref<boolean>(false)
// 开始拖动进度条
const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  updateSeek(event)
  document.addEventListener('mousemove', updateSeek)
  document.addEventListener('mouseup', endDrag)
}

// 更新拖动进度
const updateSeek = (event: MouseEvent) => {
  if (isDragging.value && videoRef.value) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const width = rect.width
    videoRef.value.currentTime = (x / width) * videoRef.value.duration
  }
}

// 结束拖动
const endDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', updateSeek)
  document.removeEventListener('mouseup', endDrag)
}

// 点击进度条跳转
const seekVideo = (event: MouseEvent) => {
  if (!isDragging.value && videoRef.value) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const width = rect.width
    videoRef.value.currentTime = (x / width) * videoRef.value.duration
  }
}
const seekTimeRef = ref()
const showSeekTimeInput = ref<boolean>(false)
function jumpVideoTime() {
  if (isEmptyString(seekTimeText.value)) {
    return
  }
  const seekTime = DateTimeUtil.instance.getSecondsFromText(seekTimeText.value)
  console.log('seekTime', seekTime)
  videoRef.value.currentTime = seekTime
  seekTimeRef.value.blur()
}

function changePlaybackRate(rate: number) {
  videoRef.value.playbackRate = rate
  console.log('changePlaybackRate', rate)
}

const fullscreenHandler = inject('fullscreenHandler') as {
  handleFullscreen: () => void
}
function videoFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    // props.videoRef?.requestFullscreen()
    fullscreenHandler.handleFullscreen()
  }
  // props.videoRef?.()
}
function updatePlayProgress() {
  currentTime.value = Math.floor(videoRef.value.currentTime)
  duration.value = Math.floor(videoRef.value.duration)
  const progress = videoRef.value.currentTime / videoRef.value.duration
  // console.log('updatePlayProgress', videoRef.value.currentTime, progress)
  progressCurrent.value = progress * 100
  if (progress == 1) {
    playerPause.value = true
  }
}
function updatePlayBuffered() {
  const buffered = videoRef.value.buffered
  const duration = videoRef.value.duration
  let bufferedProgress = 0
  for (let i = 0; i < buffered.length; i++) {
    bufferedProgress += buffered.end(i) / duration
  }
  // console.log('updatePlayBuffered', videoRef.value.currentTime, bufferedProgress)
  progressBuffer.value = bufferedProgress * 100
}
onMounted(() => {
  videoRef.value.ontimeupdate = updatePlayProgress
  videoRef.value.onprogress = updatePlayBuffered
})
</script>

<template>
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
                <div class="bpx-player-progress-schedule" @click="seekVideo">
                  <div
                    class="bpx-player-progress-schedule-current"
                    :style="{ transform: `scaleX(${progressCurrent}%)` }"
                    @mousedown="startDrag"
                  ></div>
                  <div
                    class="bpx-player-progress-schedule-buffer"
                    :style="{ transform: `scaleX(${progressBuffer}%)` }"
                  ></div>
                </div>
              </div>
              <div class="bpx-player-progress-point-wrap"></div>
              <!--                  当前进度位置图标-->
              <div
                class="bpx-player-progress-thumb"
                :style="{ transform: `translateX(${currentPointX}px)` }"
              >
                <div
                  class="bpx-player-progress-thumb-icon bpx-player-progress-thumb-icon-dynamic"
                >
                  <div>
                    <IconProgressThumb
                      style="
                        width: 100%;
                        height: 100%;
                        transform: translate3d(0px, 0px, 0px);
                      "
                    />
                  </div>
                </div>
              </div>
              <!--                  当前鼠标位置指示器-->
              <div
                class="bpx-player-progress-move-indicator"
                :style="{ left: `${indicatorLeft}px` }"
              >
                <div class="bpx-player-progress-move-indicator-down"></div>
                <div class="bpx-player-progress-move-indicator-up"></div>
              </div>
              <!--                  指定时间位置预览画面-->
              <div
                class="bpx-player-progress-popup"
                :style="{ left: `${indicatorLeft}px` }"
              >
                <div class="bpx-player-progress-preview">
                  <img
                    class="bpx-player-progress-preview-image"
                    :src="previewImageB64"
                    alt=""
                  />
                  <div class="bpx-player-progress-preview-time">
                    {{ currentPointTime }}
                  </div>
                </div>
              </div>
              <div
                class="bpx-player-progress-pull-indicator"
                :style="{ left: `${indicatorLeft}px` }"
              ></div>
              <div
                class="bpx-player-progress-cursor"
                :style="{ left: `${indicatorLeft}px` }"
              ></div>
              <div class="bpx-player-progress-scaleplate"></div>
            </div>
          </div>
        </div>
      </div>

      <!--          控制栏底部：控制按钮-->
      <div class="bpx-player-control-bottom">
        <div class="bpx-player-control-bottom-left">
          <div
            class="bpx-player-ctrl-btn bpx-player-ctrl-play"
            aria-label="播放/暂停"
            tabindex="0"
          >
            <div class="bpx-player-ctrl-btn-icon">
              <span class="bpx-common-svg-icon" @click="videoPauseOrPlay">
                <IconVideoPlayerPlay
                  v-show="playerPause"
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                />
                <IconVideoPlayerPause
                  v-show="!playerPause"
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                />
              </span>
            </div>
          </div>
          <div
            ref="seekTimeRef"
            class="bpx-player-ctrl-btn bpx-player-ctrl-time"
            tabindex="0"
            @focus="showSeekTimeInput = true"
            @blur="showSeekTimeInput = false"
          >
<!--            todo: 输入时间跳转待实现-->
            <input
              class="bpx-player-ctrl-time-seek"
              v-model="seekTimeText"
              v-show="showSeekTimeInput"
              @keydown.enter="jumpVideoTime"
            />
            <div class="bpx-player-ctrl-time-label" v-show="!showSeekTimeInput">
              <span class="bpx-player-ctrl-time-current">
                {{ DateTimeUtil.instance.getFormatTextFromSeconds(currentTime) }}
              </span>
              <span class="bpx-player-ctrl-time-divide">/</span>
              <span class="bpx-player-ctrl-time-duration">
                {{ DateTimeUtil.instance.getFormatTextFromSeconds(duration) }}
              </span>
            </div>
          </div>
        </div>
        <div class="bpx-player-control-bottom-center"></div>
        <div class="bpx-player-control-bottom-right">
          <!--              清晰度控制-->
          <video-player-quality-controller
            ref="qualityControllerRef"
            :level="qualityLevel"
            v-model:value="currentQuality"
          />
          <!--              倍速控制-->
          <video-player-playerback-rate-controller
            v-model:value="currentPlaybackRate"
            @updatePlaybackRate="changePlaybackRate"
          />
          <div
            class="bpx-player-ctrl-btn bpx-player-ctrl-subtitle"
            aria-label="字幕"
            tabindex="0"
          >
            <div
              class="bpx-player-ctrl-btn-icon"
              @click="showSubtitle = !showSubtitle"
            >
              <span class="bpx-common-svg-icon">
                <IconSubtitle
                  v-if="showSubtitle"
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                />
                <IconSubtitleDeactivated
                  v-else
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
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
            aria-label="画中画"
            title="画中画"
            tabindex="0"
          >
            <div class="bpx-player-ctrl-btn-icon bpx-player-ctrl-pip-enter">
              <span class="bpx-common-svg-icon">
                <IconPipEnter
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                />
              </span>
            </div>
          </div>
          <div
            class="bpx-player-ctrl-btn bpx-player-ctrl-wide"
            aria-label="宽屏"
            title="宽屏"
            tabindex="0"
          >
            <div class="bpx-player-ctrl-btn-icon bpx-player-ctrl-wide-enter">
              <span class="bpx-common-svg-icon">
                <IconWideEnter
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                />
              </span>
            </div>
          </div>
          <div
            class="bpx-player-ctrl-btn bpx-player-ctrl-web"
            aria-label="网页全屏"
            title="网页全屏"
            tabindex="0"
          >
            <div class="bpx-player-ctrl-btn-icon bpx-player-ctrl-web-enter">
              <span class="bpx-common-svg-icon">
                <IconWebEnter
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                />
              </span>
            </div>
          </div>
          <div
            class="bpx-player-ctrl-btn bpx-player-ctrl-full"
            aria-label="全屏"
            title="全屏"
            tabindex="0"
          >
            <div class="bpx-player-ctrl-btn-icon" @click="videoFullScreen">
              <span class="bpx-common-svg-icon">
                <IconFullScreen
                  style="
                    width: 100%;
                    height: 100%;
                    transform: translate3d(0px, 0px, 0px);
                  "
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bpx-player-control-wrap {
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 75;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-control-entity,
  .bpx-player-container[data-screen='full'] .bpx-player-control-wrap,
  .bpx-player-container[data-screen='web'] .bpx-player-control-entity,
  .bpx-player-container[data-screen='web'] .bpx-player-control-wrap {
    height: 73px;
    line-height: 73px;
  }
}
.bpx-player-control-mask {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)
    repeat-x bottom;
  bottom: 0;
  height: 100px;
  left: 0;
  pointer-events: none;
  position: absolute;
  -webkit-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
  width: 100%;
  z-index: -1;
}
.bpx-player-container[data-ctrl-hidden='true'] .bpx-player-control-bottom,
.bpx-player-container[data-ctrl-hidden='true'] .bpx-player-control-mask {
  opacity: 0;
}
.bpx-player-container[data-ctrl-hidden='false'] .bpx-player-control-bottom,
.bpx-player-container[data-ctrl-hidden='false'] .bpx-player-control-mask {
  opacity: 1;
  -webkit-transition: opacity 0.2s ease-in;
  transition: opacity 0.2s ease-in;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-control-mask,
  .bpx-player-container[data-screen='web'] .bpx-player-control-mask {
    height: 100px;
  }
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
  -webkit-transition: opacity 0.2s ease-out;
  transition: opacity 0.2s ease-out;
  visibility: visible;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-control-top,
  .bpx-player-container[data-screen='web'] .bpx-player-control-top {
    bottom: 68px;
  }
}
.bpx-player-control-entity[data-shadow-show='false']
  .bpx-player-shadow-progress-area,
.bpx-player-control-entity[data-shadow-show='true'] .bpx-player-control-top {
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
  -webkit-transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
  /*  transition: -webkit-transform .1s cubic-bezier(0,0,.2,1);
    transition: transform .1s cubic-bezier(0,0,.2,1);*/
  transition:
    transform 0.1s cubic-bezier(0, 0, 0.2, 1),
    -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
  width: 100%;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress
  .bpx-player-progress-schedule-wrap {
  height: 100%;
  position: absolute;
  width: 100%;
}
.bpx-player-progress-schedule {
  background-color: hsla(0, 0%, 100%, 0.2);
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
  transition: transform 0.2s;
}
.bpx-player-progress-schedule-buffer {
  background-color: hsla(0, 0%, 100%, 0.3);
}
.bpx-player-progress-schedule-current {
  background-color: var(--bpx-primary-color, #00a1d6);
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-point-wrap {
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
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-thumb-icon {
  height: 100%;
  line-height: 12px;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  width: 100%;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-move-indicator {
  height: 16px;
  margin-left: -4px;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  -webkit-transition: opacity 0.1s;
  transition: opacity 0.1s;
  visibility: hidden;
  width: 8px;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-move-indicator-down {
  border-color: var(--bpx-primary-color, #00a1d6) transparent transparent;
  border-width: 4px 4px 0;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-move-indicator-up {
  border-color: transparent transparent var(--bpx-primary-color, #00a1d6);
  border-width: 0 4px 4px;
  margin-top: 8px;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-move-indicator
  > div {
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
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-preview {
  height: 90px;
  position: relative;
  width: 160px;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-preview-image {
  height: 100%;
  margin: 0 auto;
  position: relative;
  vertical-align: inherit;
  width: 100%;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-preview-time {
  background-color: hsla(0, 0%, 8%, 0.9);
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
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-hotspot {
  background-color: hsla(0, 0%, 8%, 0.9);
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
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-hotspot:empty {
  display: none;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-pull-indicator {
  bottom: 6px;
  height: 18px;
  line-height: 18px;
  position: absolute;
  width: 18px;
}
.bpx-player-progress-area
  .bpx-player-progress-wrap
  .bpx-player-progress-cursor {
  background-color: #fff;
  border-radius: 5px;
  height: 10px;
  left: -5px;
  opacity: 0;
  position: absolute;
  -webkit-transition: opacity 0.2s 0.1s;
  transition: opacity 0.2s 0.1s;
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
  -webkit-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
  width: 100%;
}
.bpx-player-container[data-ctrl-hidden='true'] .bpx-player-control-bottom,
.bpx-player-container[data-ctrl-hidden='true'] .bpx-player-control-mask {
  opacity: 0;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-control-bottom,
  .bpx-player-container[data-screen='web'] .bpx-player-control-bottom {
    height: 45px;
    line-height: 34px;
    margin: 20px 0 0;
  }
}
.bpx-player-control-bottom-left {
  -webkit-box-flex: 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex: none;
  flex: none;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-control-bottom-left,
  .bpx-player-container[data-screen='web'] .bpx-player-control-bottom-left {
    min-width: 316px;
  }
}
.bpx-player-ctrl-btn {
  fill: #fff;
  color: hsla(0, 0%, 100%, 0.8);
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
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-ctrl-btn,
  .bpx-player-container[data-screen='web'] .bpx-player-ctrl-btn {
    height: 43px;
    line-height: 32px;
    width: 54px;
  }
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-ctrl-time,
  .bpx-player-container[data-screen='web'] .bpx-player-ctrl-time {
    height: 32px;
    width: 120px;
  }
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
  transition: fill 0.2s ease-in-out;
}
.bpx-common-svg-icon:hover {
  fill: #00a1d6;
}
.bpx-player-ctrl-btn-icon > .bpx-common-svg-icon {
  height: 22px;
  opacity: 0.9;
  vertical-align: middle;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full']
    .bpx-player-ctrl-btn-icon
    > .bpx-common-svg-icon,
  .bpx-player-container[data-screen='web']
    .bpx-player-ctrl-btn-icon
    > .bpx-common-svg-icon {
    height: 28px;
  }
}
.bpx-player-ctrl-btn-icon > .bpx-common-svg-icon svg {
  -webkit-transform: none !important;
  transform: none !important;
}
.bpx-player-ctrl-time {
  font-size: 12px;
  margin-right: 10px;
  min-width: 90px;
}
.bpx-player-ctrl-time-seek {
  background: hsla(0, 0%, 100%, 0.2);
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
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-ctrl-time-seek,
  .bpx-player-container[data-screen='web'] .bpx-player-ctrl-time-seek {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 100px;
  }
}
.bpx-player-ctrl-time-label {
  height: 100%;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  width: 100%;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-ctrl-time-label,
  .bpx-player-container[data-screen='web'] .bpx-player-ctrl-time-label {
    font-size: 14px;
    text-align: left;
    text-indent: 16px;
  }
}
.bpx-player-ctrl-time-divide {
  padding: 0 2px;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-control-bottom-center,
  .bpx-player-container[data-screen='web'] .bpx-player-control-bottom-center {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    height: 34px;
    line-height: 34px;
    padding: 0 60px;
  }
}
.bpx-player-control-bottom-right {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: flex-end;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full'] .bpx-player-control-bottom-right,
  .bpx-player-container[data-screen='web'] .bpx-player-control-bottom-right {
    min-width: 370px;
  }
}
.bpx-docker ol,
.bpx-docker ul {
  list-style: none;
  outline: none;
}
.bpx-docker a,
.bpx-docker input {
  outline: none;
  -webkit-text-decoration: none;
  text-decoration: none;
}

.subtitle-switch-enter-active,
.subtitle-switch-leave-active {
  transition: opacity 0.9s ease;
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
  -webkit-transition: opacity 0.4s ease-in;
  transition: opacity 0.4s ease-in;
}
.bpx-player-control-entity[data-shadow-show='true']
  .bpx-player-shadow-progress-area {
  opacity: 1;
  visibility: visible;
}
@media screen and (min-width: 750px) {
  .bpx-player-container[data-screen='full']
    .bpx-player-shadow-progress-area:not(.permanent) {
    opacity: 0 !important;
    visibility: hidden;
  }
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
</style>
