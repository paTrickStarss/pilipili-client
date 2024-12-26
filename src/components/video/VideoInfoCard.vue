<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { EllipsisOutlined } from '@ant-design/icons-vue'
import type { VideoCardInfoType } from '@/utils/PropsType'
import { jumpRoute } from '@/utils/RouterUtil'
import { useRouter } from 'vue-router'

const props = defineProps<{
  videoCardInfo: VideoCardInfoType
}>()

const router = useRouter()
</script>

<template>
  <div class="video-info-card">
    <div
      class="video-cover"
      @click="jumpRoute(router, `/video/${videoCardInfo.id}`)"
    >
      <img :src="props.videoCardInfo.coverUrl" alt="video cover" />
    </div>
    <div class="card-bottom">
      <div style="text-align: start">
        <div class="video-title">
          {{ props.videoCardInfo.title }}
        </div>
        <p class="video-author">
          {{ props.videoCardInfo.authorName }}
        </p>
      </div>
      <div class="toolbox-btn">
        <a-popover title="" trigger="hover">
          <template #content>
            <div class="popover-menu">
              <p>添加到稍后再看</p>
              <p>内容不感兴趣</p>
            </div>
          </template>
          <EllipsisOutlined />
        </a-popover>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-info-card {
  margin: 10px 18px;
  transition: all 0.3s ease;
}

.video-info-card:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.video-cover {
  height: 70%;
  width: 100%;
}

.video-cover img {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  cursor: pointer;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
}

.video-title {
  font-size: 1em;
  color: #333;
  font-family: 'Harmony Font', sans-serif;
}

.video-author,
.video-publish-date {
  color: #666;
  font-size: 0.9em;
}

.popover-menu > p:hover {
  background-color: #66ccff;
  color: #fff;
  transition: all 0.5s ease-in-out;
}

.toolbox-btn {
  margin: auto 0;
}
</style>
