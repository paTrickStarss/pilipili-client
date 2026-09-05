<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import { useAsyncResource } from '@/composables/useAsyncResource'
import IndexView from '@/views/index/IndexView.vue'
import VideoInfo from '@/components/video/VideoInfo.vue'
import { computed, onMounted, provide, reactive, ref } from 'vue'
import type { VideoPageInfoProps, VideoToolbarInfoProps } from '@/types/PropsType'
import VideoPlayer from '@/components/video/player/VideoPlayer.vue'
import VideoPlayerPlaceholder from '@/components/video/player/video-area/VideoPlayerPlaceholder.vue'
import VideoToolbar from '@/components/video/toolbar/VideoToolbar.vue'
import { useRoute } from 'vue-router'
import videoInfoAPI from '@/api/video/VideoInfoAPI'
import { useTokenStore } from '@/stores/token'
import type { VideoDTOType } from '@/types/ApiRespType'
import { copyFieldValue } from '@/utils/CommonUtil'
import VideoDescription from '@/components/video/description/VideoDescription.vue'
import VideoTag from '@/components/video/tag/VideoTag.vue'
import VideoComment from '@/components/video/comment/VideoComment.vue'
import UpUserPanel from '@/components/video/right-container/UpUserPanel.vue'
import UserInfoCardPopover from '@/components/global/UserInfoCardPopover.vue'

const token = useTokenStore()
const playerRef = ref()

const route = useRoute()
const vid = computed(() =>
  Number(route.params.vid as string || 0)
)
const videoInfoDTO = ref<VideoDTOType>()
const videoInfoEntity = ref<VideoPageInfoProps>({
  vid: vid.value,
  title: '--',
  publishTime: '--',
  viewCount: 0,
  danmakuCount: 0,
  honorText: '',
  argue: '',
  reprintPermit: 1,
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
const { loading: playerLoading, error, execute: fetchData } = useAsyncResource(async () => {
  if (!Number.isSafeInteger(vid.value) || vid.value <= 0) throw new Error('视频地址无效')
  const { data } = await videoInfoAPI.get(vid.value)
  if (!data) throw new Error('视频不存在或暂不可用')
  videoInfoDTO.value = data
  copyFieldValue(data, videoInfoEntity.value)
  copyFieldValue(data, toolbarInfo.value)
  if (token.isLogin) {
    try {
      const response = await videoInfoAPI.getUserVideo(vid.value, token.uid)
      copyFieldValue(response.data, toolbarInfo.value)
    } catch { /* A failed interaction lookup should not prevent video playback. */ }
  }
  return data
})

const userInfoPopRef = ref()
const refHandler = reactive({
  userInfoPopRef,
})
provide('refHandler', refHandler)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <index-view>
    <div v-if="playerLoading" class="page-state" role="status">正在加载视频…</div>
    <div v-else-if="error" class="page-state" role="alert"><p>{{ error }}</p><button @click="fetchData">重试</button></div>
    <div v-else-if="videoInfoDTO" id="mirror-vdcon" class="video-container-v1">
      <div class="left-container scroll-sticky">
<!--        视频标题等主要信息-->
        <video-info :info="videoInfoEntity" />
<!--        视频播放器-->
        <div id="playerWrap" class="player-wrap">
          <video-player-placeholder v-show="playerLoading" />
          <video-player
            ref="playerRef"
            v-if="!playerLoading"
            :vid="videoInfoDTO?.vid || 0"
            :src="videoInfoDTO?.contentUrl || ''"
          />
        </div>
<!--        互动栏-->
        <video-toolbar :info="toolbarInfo" />
        <video-description :content="videoInfoDTO?.description" />
        <video-tag :tag-list="videoInfoDTO?.tagList || []" />
        <video-comment />
      </div>

      <div class="right-container">
        <div class="right-container-inner scroll-sticky">
<!--          投稿用户名片-->
          <up-user-panel
            v-if="!playerLoading"
            :uid="videoInfoDTO?.uid || 0"
          />
<!--          弹幕列表-->


<!--          推荐视频-->

        </div>
      </div>
    </div>

    <user-info-card-popover ref="userInfoPopRef" />
  </index-view>
</template>

<style scoped>
.video-container-v1 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 350px);
  gap: var(--layout-gap);
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 24px var(--layout-padding);
}
.left-container, .right-container { min-width: 0; }
.player-wrap { position: relative; }
.right-container-inner { position: sticky; top: calc(var(--header-height) + 24px); }
@media (max-width: 1099px) {
  .video-container-v1 { grid-template-columns: minmax(0, 1fr); }
  .right-container-inner { position: static; }
}
</style>
