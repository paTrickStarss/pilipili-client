<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">


import type { VideoUploadingItemProps } from '@/types/PropsType'
import { computed } from 'vue'
import IconPlay from '@/components/icons/IconPlay.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'

const props = defineProps<{
  info: VideoUploadingItemProps
}>()

const uploadOverPart = computed(() =>
  Number(props.info.fileSize * (props.info.progress/100)).toFixed(1)
)
const remainingTime = computed(() => {
  if (!props.info.speed ||  props.info.speed <= 0) {
    return '--'
  }
  return (Number(props.info.fileSize - Number(uploadOverPart.value)) / props.info.speed).toFixed(1)
})
</script>

<template>
  <div class="file-item">
    <div class="file-item-icon"></div>
    <div class="file-item-content">
      <div class="file-item-content-detail">
        <div class="file-item-content-text">
          <div class="title">
            <div class="pure-text">
              <span :title="info.fileName">{{ info.fileName }}</span>
            </div>
          </div>
          <div class="file-item-content-status">
            <div class="file-item-content-status-text">
              <span style="padding-right: 5px;">
                {{ `已经上传：${uploadOverPart}MB/${info.fileSize.toFixed(2)}MB` }}
              </span>
              <span>
                {{ `当前速度：${info.speed}MB/s 剩余时间：${remainingTime}秒` }}
              </span>
            </div>
          </div>
        </div>
        <div class="file-item-content-operate">
          <span class="progress-text">{{ `${info.progress}%` }}</span>
          <div class="operate-btns">
            <div class="icon-btn">
              <IconPlay class="icon icon-sprite icon-sprite-play"/>
            </div>
            <div class="icon-btn">
              <IconRefresh class="icon icon-sprite icon-sprite-play"/>
            </div>
          </div>
        </div>
      </div>
      <div class="file-item-content-progress">
        <div
          class="file-item-content-progress-inner pending"
          :style="{width: `${info.progress}%`}"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-item {
  display: flex;
  align-items: center;
  width: 838px;
  height: 76px;
}
.file-item-icon {
  margin: 0 12px 0 0;
  width: 30px;
  height: 38px;
  background: url(data:image/png;base64,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) no-repeat;
  background-size: 100% 100%;
}
.file-item-content {
  width: 838px;
}
.file-item-content-detail {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.file-item-content-text {
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #18191c;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
}
.file-item-content-text .title {
  max-width: 645px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-item-content-text .title .pure-text {
  padding: 6px 0 6px 6px;
  color: #222;
  display: flex;
}
.file-item-content-text .title .pure-text,
.file-item-content-text .title .pure-text span {
  max-width: 650px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-item-content-status {
  display: flex;
  align-items: center;
  margin-left: 6px;
}
.file-item-content-status-text {
  flex: 1;
  font-size: 10px;
  line-height: 14px;
  color: #999;
  display: flex;
  align-items: center;
}

.file-item-content-operate {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.file-item-content-operate .progress-text {
  font-size: 12px;
  line-height: 16px;
  color: #999;
  margin-right: 10px;
}
.file-item-content-operate .operate-btns {
  display: inline-flex;
  align-items: center;
}
.file-item-content-operate .operate-btns .icon-btn {
  border-radius: 50% 50%;
  background: #e7e7e7;
  margin: 0 8px 0 10px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-item-content-operate .operate-btns .icon-btn .icon {
  width: 10px;
  height: 10px;
  color: #757575;
}

.file-item-content-progress {
  margin-top: 6px;
  margin-left: 6px;
  height: 3px;
  width: calc(100% - 6px);
  border-radius: 4px;
  background-color: #e7e7e7;
}
.file-item-content-progress-inner {
  width: 0;
  height: 100%;
  transition: all .3s ease-in-out;
}
.file-item-content-progress .pending {
  background-color: #00a1d6;
}
</style>
