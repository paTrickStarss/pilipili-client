<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IndexView from '@/views/index/IndexView.vue'
import VideoInfo from '@/components/video/VideoInfo.vue'
import { computed, onMounted, ref } from 'vue'
import type { VideoPageInfoProps, VideoToolbarInfoProps } from '@/types/PropsType'
import VideoPlayer from '@/components/video/player/VideoPlayer.vue'
import VideoPlayerPlaceholder from '@/components/video/player/video-area/VideoPlayerPlaceholder.vue'
import VideoToolbar from '@/components/video/toolbar/VideoToolbar.vue'
import { useRoute } from 'vue-router'
import videoInfoAPI from '@/api/video/VideoInfoAPI'
import { useTokenStore } from '@/stores/token'
import type { VideoDTOType } from '@/types/ApiRespType'
import { copyFieldValue } from '@/utils/CommonUtil'

const token = useTokenStore()
const playerLoading = ref<boolean>(false)

const route = useRoute()
const vid = computed(() =>
  Number(route.params.vid as string || 0)
)
const videoInfoDTO = ref<VideoDTOType>()
const videoInfoEntity = ref<VideoPageInfoProps>({
  vid: vid.value,
  title: '【毕导】往开水里尿尿，开水会瞬间逆流而上烫伤你？请看VCR！',
  publishTime: '2025-01-23 21:45:23',
  viewCount: 125124,
  danmakuCount: 782,
  honorText: '全站排行榜最高第4名',
  argue: '该内容仅供娱乐，请勿过分解读',
  reprintPermit: 1
})
const toolbarInfo = ref<VideoToolbarInfoProps>({
  vid: vid.value,
  favorCount: 0,
  coinCount: 0,
  collectCount: 0,
  repostCount: 0,
  favor: false,
  coin: false,
  collect: false,
  repost: false,
})
async function fetchData() {
  if (vid.value === 0) {
    return
  }
  // 获取当前视频信息
  videoInfoAPI.get(vid.value)
    .then(({ data }) => {
      videoInfoDTO.value = data as VideoDTOType
      copyFieldValue(videoInfoDTO.value, videoInfoEntity.value)
      copyFieldValue(videoInfoDTO.value, toolbarInfo.value)
      console.log('getVideoInfo', videoInfoDTO.value, videoInfoEntity.value, toolbarInfo.value)
    })
  if (token.isLogin) {
    // 若已登录，则获取用户对该视频的互动信息
    videoInfoAPI.getUserVideo(vid.value, token.uid)
      .then(({ data }) => {
        copyFieldValue(data, toolbarInfo.value)
        console.log('getUserVideoInfo', data, toolbarInfo.value)
      })
  }
  // try {
  //   const { data } = await videoInfoAPI.get(vid.value)
  //   console.log('fetchData', data)
  // } catch (error) {
  //   console.log('fetchData', error)
  // }
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <index-view>
    <div id="mirror-vdcon" class="video-container-v1">
      <div class="left-container scroll-sticky">
<!--        视频标题等主要信息-->
        <video-info :info="videoInfoEntity" />
<!--        视频播放器-->
        <div id="playerWrap" class="player-wrap">
          <video-player-placeholder v-show="playerLoading" />
          <video-player v-show="!playerLoading" />
        </div>
<!--        互动栏-->
        <video-toolbar :info="toolbarInfo" />
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
