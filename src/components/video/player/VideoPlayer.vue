<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import VideoPlayerVideoArea from '@/components/video/player/video-area/VideoPlayerVideoArea.vue'
import { onMounted, ref, watch } from 'vue'
import VideoPlayerSendingArea from '@/components/video/player/sending-area/VideoPlayerSendingArea.vue'
import Player, { type ControlItem, Popover } from 'nplayer'
import Danmaku from '@nplayer/danmaku'
import Hls from 'hls.js'
import type { DanmakuPluginOption } from '@nplayer/danmaku/src/ts/main'

const props = defineProps({
  vid: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
})

const controlHidden = ref<boolean>(true)

const nplayerRef = ref()
const hls = new Hls()
const nplayer = ref<Player>()
const danmakuOptions = ref<DanmakuPluginOption>({
  autoInsert: false,
  items: [
    { time: 1, text: '弹幕1', color: '#FFFFFF' },
    { time: 2, text: '弹幕2', color: '#FFFFFF' },
    { time: 3, text: '弹幕3', color: '#ff4646' },
    { time: 5, text: '弹幕4', color: '#66CCFF' },
    { time: 10, text: '弹幕554555', color: '#FFFFFF' },
  ],
})
const quantity: ControlItem = {
  el: document.createElement('div'),
  init() {
    this.btn = document.createElement('div')
    this.btn.textContent = '画质'
    this.el.appendChild(this.btn)
    this.popover = new Popover(this.el)
    this.btn.addEventListener('click', () => this.popover.show())
    this.el.style.display = 'block'
    this.el.classList.add('quantity')
  },
}
function createNPlayer() {
  const player = new Player({
    controls: [
      [
        'play',
        'volume',
        'time',
        'spacer',
        quantity,
        'danmaku-settings',
        'settings',
        'web-fullscreen',
        'fullscreen',
      ],
      ['progress'],
      ['spacer'],
    ],
    plugins: [new Danmaku(danmakuOptions.value)],
  })

  hls.attachMedia(player.video)
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {

    // hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //   // 清晰度降序排序
    //   hls.levels.sort((a, b) => {
    //     if (b.height === a.height) {
    //       return b.bitrate - a.bitrate
    //     } else {
    //       return b.height - a.height
    //     }
    //   })
    //   const frag = document.createDocumentFragment()
    //   const listener = (i: number) => (init: unknown) => {
    //     const last = quantity.itemElements[quantity.itemElements.length - 1]
    //     const prev = quantity.itemElements[quantity.value] || last
    //     const el = quantity.itemElements[i] || last
    //     prev.classList.add('quantity_item-active')
    //     el.classList.add('quantity_item-active')
    //     quantity.btn.textContent = el.textContent
    //
    //     if (init !== true && !player.paused) {
    //       setTimeout(() => player.play())
    //     }
    //     quantity.value = hls.currentLevel = hls.loadLevel = i
    //     quantity.popover.hide()
    //   }
    //   console.log('hls.levels', hls.levels)
    //   quantity.itemElements = hls.levels.map((l, i) => {
    //     const el = document.createElement('div')
    //     el.textContent = l.name + 'p'
    //     if (l.height === 1080) {
    //       // todo: 当有两档1080p时，若比特率较高的没有超过5Mbps，这里会失效，考虑在外层重新判断
    //       if (l.bitrate > 5000000) {
    //         el.textContent += '高比特率'
    //       } else {
    //         el.textContent += '超清'
    //       }
    //     }
    //     if (l.height == 720) el.textContent += '高清'
    //     if (l.height == 480) el.textContent += '清晰'
    //     el.classList.add('quantity_item')
    //     el.addEventListener('click', listener(i))
    //     frag.appendChild(el)
    //     return el
    //   })
    //
    //   // 自动 - 根据当前客户端网络带宽决定加载的清晰度
    //   const el = document.createElement('div')
    //   el.textContent = '自动'
    //   el.addEventListener('click', listener(-1))
    //   el.classList.add('quantity_item')
    //   frag.appendChild(el)
    //   quantity.itemElements.push(el)
    //
    //   quantity.popover.panelEl.appendChild(frag)
    //   quantity.el.style.display = 'block'
    //
    //   // listener(hls.currentLevel)(true)
    //   listener(hls.levels[0].id)
    // })
    // 使用HLS格式的视频流播放
    hls.loadSource('/hls/master.m3u8')
  })

  player.mount(nplayerRef.value)
  nplayer.value = player
}

onMounted(() => {
  // console.log('videoPlayer mounted', nplayerOptions.value.src, nplayerOptions.value, nplayer.value)
  // createNPlayer()
})
</script>

<template>
  <div id="bilibili-player">
    <div class="bpx-docker bpx-docker-major">
      <div
        class="bpx-player-container bpx-state-no-cursor"
        :data-ctrl-hidden="controlHidden"
        data-revision="1"
      >
        <div
          class="bpx-player-primary-area"
          aria-label="播放器"
          @mouseenter="controlHidden = false"
          @mouseleave="controlHidden = true"
        >
          <video-player-video-area :data-shadow-show="controlHidden" />
<!--          <div ref="nplayerRef"></div>-->
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
  -webkit-box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
  box-shadow: 0 0 8px var(--bpx-box-shadow, #e5e9ef);
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

.quantity {
  position: relative;
  padding: 0 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0.8;
}
.quantity:hover {
  opacity: 1;
}
.quantity_item {
  padding: 5px 20px;
  font-weight: normal;
}
.quantity_item:hover {
  background: rgba(255, 255, 255, 0.3);
}
.quantity_item-active {
  color: var(--theme-color);
}
</style>
