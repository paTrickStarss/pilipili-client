<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IconVideoLike from '@/components/icons/IconVideoLike.vue'
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import IconVideoCoin from '@/components/icons/IconVideoCoin.vue'
import IconVideoCollect from '@/components/icons/IconVideoCollect.vue'
import IconVideoShare from '@/components/icons/IconVideoShare.vue'
import { formatCount } from '@/utils/CommonUtil'
import { message } from 'ant-design-vue'
import videoInfoAPI from '@/api/video/VideoInfoAPI'
import type { AxiosResponse } from 'axios'
import { useTokenStore } from '@/stores/token'
import type { VideoToolbarInfoProps } from '@/types/PropsType'

const props = defineProps<{
  info: VideoToolbarInfoProps
}>()
const infoCopy = ref<VideoToolbarInfoProps>(props.info)

const token = useTokenStore()

// const info = ref({
//   favorCount: 163967,
//   coinCount: 24386,
//   collectCount: 18856,
//   repostCount: 3286,
// })
// const interactStatus = ref({
//   favor: false,
//   coin: false,
//   collect: false,
//   repost: false,
// })

const key: string = 'interactLoading'
let loading: boolean = false
function interactClick(type: string) {
  if (loading) {
    return
  }
  switch (type) {
    case 'favor':
      handleFavorClick()
      break
    case 'coin':
      handleCoinClick()
      break
    case 'collect':
      handleCollectClick()
      break
    case 'repost':
      handleRepostClick()
      break
  }
}
async function applyInteractAPI(
  name: string,
  apiMethod: (
    vid: number,
    uid: number,
  ) => Promise<AxiosResponse<unknown, unknown>>,
  // callBack?: () => void,
  fallback?: () => void,
) {
  loading = true
  message.loading({ content: `${name}...`, key })

  try {
    await apiMethod(infoCopy.value.vid, token.uid)
    message.success({ content: `${name}成功`, key })
  } catch (error) {
    console.error(`${name}失败`, error)
    message.error({ content: `${name}失败`, key })
    if (fallback) fallback()
  } finally {
    loading = false
  }

}
function handleFavorClick() {
  infoCopy.value.favor = !infoCopy.value.favor
  if (infoCopy.value.favor) {
    // 点赞
    infoCopy.value.favorCount++
    applyInteractAPI('点赞', videoInfoAPI.favor, () => {
      infoCopy.value.favor = !infoCopy.value.favor
      infoCopy.value.favorCount--
    })
  } else {
    // 取消点赞
    infoCopy.value.favorCount--
    applyInteractAPI('取消点赞', videoInfoAPI.favorRevoke, () => {
      infoCopy.value.favor = !infoCopy.value.favor
      infoCopy.value.favorCount++
    })
  }
}
function handleCoinClick() {
  if (infoCopy.value.coin) {
    message.info('已投币，不可重复投币或取消投币哦')
    return
  }
  infoCopy.value.coin = true
  infoCopy.value.coinCount++
  applyInteractAPI('投币', videoInfoAPI.coin, () => {
    infoCopy.value.coin = false
    infoCopy.value.coinCount--
  })
}
function handleCollectClick() {
  // todo: 收藏夹弹窗，选择放入哪些收藏夹后保存再更新互动状态
  infoCopy.value.collect = !infoCopy.value.collect
  if (infoCopy.value.collect) {
    // 收藏
    infoCopy.value.collectCount++
    applyInteractAPI('收藏', videoInfoAPI.collect, () => {
      infoCopy.value.collect = !infoCopy.value.collect
      infoCopy.value.collectCount--
    })
  } else {
    // 取消收藏
    infoCopy.value.collectCount--
    applyInteractAPI('取消收藏', videoInfoAPI.collectRevoke, () => {
      infoCopy.value.collect = !infoCopy.value.collect
      infoCopy.value.collectCount++
    })
  }
}
function handleRepostClick() {
  // todo: 分享到动态弹窗，填写动态正文内容后保存分享再更新互动状态
  infoCopy.value.repost = true
  infoCopy.value.repostCount++
  applyInteractAPI('转发', videoInfoAPI.repost, () => {
    infoCopy.value.repost = false
    infoCopy.value.repostCount--
  })
}

// const ringCanvas = ref<HTMLCanvasElement | null>(null)
// function drawRingCanvas() {
//   if (!ringCanvas.value) {
//     message.error('ringCanvas empty!')
//     console.error('ringCanvas empty', ringCanvas.value)
//   }
//   const ctx = ringCanvas.value?.getContext('2d')
//   if (!ctx) {
//     message.error('canvas context empty!')
//     return
//   }
//
//   const centerX = 200
//   const centerY = 200
//   const outerRadius = 150
//   const innerRadius = 100
//   const color = '#00a1d6'
//
//   ctx.beginPath()
//   ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
//   ctx.fillStyle = color
//   ctx.fill()
//
//   ctx.beginPath()
//   ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
//   ctx.fillStyle = 'white'
//   ctx.fill()
//
// }

let shakeTimer: number | null = null
let longPressTimer: number | null = null
const shakeFavorIcon = ref<boolean>(false)
let keyFavorDown: boolean = false
// 一键三连
async function longPressFavorBtn() {
  loading = true
  message.loading({ content: `一键三连...`, key })
  try {
    const result = await videoInfoAPI.triple(1100, token.uid)
    infoCopy.value.favor = true
    infoCopy.value.coin = true
    infoCopy.value.collect = true
    console.log('一键三连成功！', result)
    message.success({ content: '一键三连成功！', key })
  } catch (error) {
    console.error('一键三连异常', error)
    message.success({ content: '一键三连异常！', key })
  } finally {
    loading = false
  }
}
function handleFavorKeyDown() {
  if (keyFavorDown) return
  keyFavorDown = true
  // 700ms后开始记录长按时间（出现长按动画）
  shakeTimer = setTimeout(() => {
    shakeTimer = null
    shakeFavorIcon.value = true
    // 1秒后长按动画结束，执行长按逻辑
    longPressTimer = setTimeout(() => {
      longPressTimer = null
      shakeFavorIcon.value = false
      longPressFavorBtn()
    }, 1000)
  }, 700)
}
function handleFavorKeyUp() {
  if (shakeTimer && !longPressTimer) {
    // 间隔小于700ms，取消shake倒计时，执行点按逻辑
    clearTimeout(shakeTimer)
    shakeTimer = null
    interactClick('favor')
  } else if (longPressTimer) {
    // 间隔小于1秒，取消长按倒计时，什么都不做
    shakeFavorIcon.value = false
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  keyFavorDown = false
}
function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'q':
    case 'Q':
      handleFavorKeyDown()
      break
    case 'w':
    case 'W':
      interactClick('coin')
      break
    case 'e':
    case 'E':
      interactClick('collect')
      break
    case 'r':
    case 'R':
      interactClick('repost')
      break
  }
}
function handleKeyup(event: KeyboardEvent) {
  switch (event.key) {
    case 'q':
    case 'Q':
      handleFavorKeyUp()
      break
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<template>
  <div id="arc_toolbar_report" class="video-toolbar-container">
    <div class="video-toolbar-left">
      <div class="video-toolbar-left-main">
        <!--        点赞-->
        <div class="toolbar-left-item-wrap">
          <div
            class="video-toolbar-left-item video-like"
            :class="{ active: infoCopy.favor }"
            @mousedown="handleFavorKeyDown"
            @mouseup="handleFavorKeyUp"
            title="点赞（Q）"
          >
            <IconVideoLike
              class="video-toolbar-item-icon video-like-icon"
              :class="{ 'shake-anime': shakeFavorIcon }"
            />
            <span class="video-toolbar-item-text video-like-info">
              {{ formatCount(info.favorCount) }}
            </span>
          </div>
        </div>
        <!--        投币-->
        <div class="toolbar-left-item-wrap">
          <div
            class="video-toolbar-left-item video-coin"
            :class="{ active: infoCopy.coin }"
            @click="interactClick('coin')"
            title="投币（W）"
          >
            <IconVideoCoin
              class="video-toolbar-item-icon video-coin-icon"
              :class="{ 'shake-anime': shakeFavorIcon }"
            />
            <span class="video-toolbar-item-text video-coin-info">
              {{ formatCount(info.coinCount) }}
            </span>
          </div>
          <!--          <canvas-->
          <!--            ref="ringCanvas"-->
          <!--            width="34" height="34"-->
          <!--            class="ring-progress"-->
          <!--            style="width: 34px; height: 34px; left: -3px; top: -3px;"-->
          <!--          />-->
        </div>
        <!--        收藏-->
        <div class="toolbar-left-item-wrap">
          <div
            class="video-toolbar-left-item video-fav"
            :class="{ active: infoCopy.collect }"
            @click="interactClick('collect')"
            title="收藏（E）"
          >
            <IconVideoCollect
              class="video-toolbar-item-icon video-fav-icon"
              :class="{ 'shake-anime': shakeFavorIcon }"
            />
            <span class="video-toolbar-item-text video-fav-info">
              {{ formatCount(info.collectCount) }}
            </span>
          </div>
        </div>
        <!--        转发-->
        <div class="toolbar-left-item-wrap">
          <div class="video-toolbar-left-item video-share-wrap">
            <span>
              <div
                id="share-btn-outer"
                class="video-share van-popover__reference"
                tabindex="0"
              >
                <IconVideoShare
                  class="video-toolbar-item-icon video-share-icon"
                />
                <span class="video-toolbar-item-text video-share-info">
                  {{ formatCount(info.repostCount) }}
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="video-toolbar-right"></div>
    <div class="teleport hidden"></div>
  </div>
</template>

<style scoped>
.video-toolbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 12px;
  line-height: 28px;
  border-bottom: 1px solid var(--line_regular);
  border-bottom: 1px solid var(--line_regular);
}
.video-toolbar-container .video-toolbar-left {
  position: relative;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  user-select: none;
}
.video-toolbar-container .video-toolbar-left .video-toolbar-left-main {
  position: relative;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  user-select: none;
}
.video-toolbar-container .video-toolbar-left .toolbar-left-item-wrap {
  position: relative;
  margin-right: 8px;
}
.video-toolbar-left-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 92px;
  white-space: nowrap;
  transition: all 0.3s;
  font-size: 13px;
  color: var(--text2);
  font-weight: 500;
  cursor: pointer;
}

.video-toolbar-left-item.active {
  color: #00a1d6;
}
.video-toolbar-left-item:hover {
  color: #00a1d6;
}
.video-toolbar-left-item .video-toolbar-item-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  margin-right: 8px;
}
.video-toolbar-left-item .video-toolbar-item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
}
.video-share-wrap {
  width: auto;
}
.video-share-wrap .video-share {
  display: flex;
  align-items: center;
}
.video-share-wrap .video-share .video-share-info {
  position: relative;
  width: 90px;
  height: 28px;
  line-height: 28px;
}
.video-share-wrap .video-share .video-share-info .video-share-info-text {
  position: absolute;
}
.video-toolbar-left-item .shake-anime {
  color: #00a1d6;
  animation: shake 0.3s ease-in-out infinite;
}
@keyframes shake {
  0%,
  100% {
    transform: translate(0, 0) rotate(0);
  }
  10% {
    transform: translate(-1px, 1px) rotate(2deg);
  }
  30% {
    transform: translate(2px, -1px) rotate(5deg);
  }
  50% {
    transform: translate(-1px, 1px) rotate(7deg);
  }
  70% {
    transform: translate(3px, 2px) rotate(-2deg);
  }
  90% {
    transform: translate(-1px, -1px) rotate(-5deg);
  }
}
.ring-progress {
  position: absolute;
}

.video-toolbar-container .video-toolbar-right {
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  user-select: none;
}

.teleport {
  position: absolute;
  width: 0;
  height: 0;
}
.teleport.hidden {
  visibility: hidden;
  display: none;
}
</style>
