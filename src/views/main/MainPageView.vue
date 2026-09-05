<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IndexView from '@/views/index/IndexView.vue'
import RecommendedSwipe from '@/components/main/RecommendedSwipe.vue'
import VideoCard from '@/components/video/VideoCard.vue'
import { onMounted } from 'vue'
import { useAsyncResource } from '@/composables/useAsyncResource'
import type { VideoDTOType } from '@/types/ApiRespType'
import videoInfoAPI from '@/api/video/VideoInfoAPI'


const { data: recVideoInfoList, loading, error, execute: fetchRecVideo } = useAsyncResource<VideoDTOType[]>(async () => {
  const { data } = await videoInfoAPI.pageQueryPassedByUid({ pageNo: 1, pageSize: 10, uid: -1 })
  return data || []
})
onMounted(fetchRecVideo)
</script>

<template>
  <IndexView type="main">
    <div class="feed2">
      <div class="recommended-container_floor-aside">
        <div class="container is-version8">
          <RecommendedSwipe />
          <div v-if="loading" class="feed-status page-state" role="status">正在加载推荐视频…</div>
          <div v-else-if="error" class="feed-status page-state" role="alert">
            <p>{{ error }}</p><button @click="fetchRecVideo">重新加载</button>
          </div>
          <div v-else-if="!recVideoInfoList?.length" class="feed-status page-state">暂无推荐视频</div>

          <div
            class="feed-card"
            v-for="info in recVideoInfoList"
            :key="info.vid"
          >
            <VideoCard
              class="enable-no-interest"
              style="--cover-radio: 56.25%"
              :info="info"
            />
          </div>
        </div>
      </div>
    </div>
  </IndexView>
</template>

<style scoped>
.feed-status { grid-column: span 2; }

.recommended-container_floor-aside {
  padding-bottom: 60px;
}

.recommended-container_floor-aside:not(.xs_sm) {
  position: relative;
}

.recommended-container_floor-aside .container {
  display: grid;
  position: relative;
  width: 100%;
  gap: 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.recommended-container_floor-aside .container > * {
  min-width: 0;
}

@media (min-width: 1400px) {
  .recommended-container_floor-aside .container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (min-width: 1800px) {
  .recommended-container_floor-aside .container {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

.feed-roll-btn {
  position: absolute;
  left: 100%;
  top: 0;
  z-index: 2;
  transform: translate(10px);
}

@media (max-width: 1099px) {
  .recommended-container_floor-aside .container { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
}
@media (max-width: 767px) {
  .recommended-container_floor-aside .container { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .recommended-container_floor-aside .container :deep(.recommended-swipe) { grid-column: 1 / -1; grid-row: auto; }
}

</style>
