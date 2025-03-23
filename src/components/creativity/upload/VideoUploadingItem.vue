<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import type { VideoUploadingItemProps } from '@/types/PropsType'

defineProps<{
  info: VideoUploadingItemProps
}>()
</script>

<template>
  <div class="task-list-content-item" style="width: 218px;">
    <div
      class="task task-selected"
      style="margin-right: 10px; margin-bottom: 10px;"
      :title="info.fileName"
    >
      <div class="task-title">
        <span class="task-title-icon"></span>
        <span class="task-title-text" style="width: calc(100% - 16px);">
          {{ info.fileName }}
        </span>
      </div>
      <div class="task-status task-status-pending task-status-selected">
        <span class="text">
          {{
            info.progress < 100? '上传中...':
            info.progress === 100? '上传成功':'上传失败'
          }}
        </span>
      </div>
      <div class="task-delete">
<!--        删除按钮-->
      </div>
    </div>
  </div>
</template>

<style scoped>

.task-list-content-item {
  max-width: 218px;
  position: relative;
}
.task {
  height: 60px;
  max-width: 100%;
  transition: all .2s ease-in-out;
  padding: 10px 6px 10px 12px;
  font-size: 12px;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  z-index: 1;
  background: #fff;
  color: #18191c;
}
.task-selected {
  background: #00aeec;
  color: #fff;
}
.task-title {
  flex: 1;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
}
.task-title-text,
.task-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 10;
}
.task-title-text {
  display: block;
}
.task-title-icon {
  z-index: 1000;
}
.task-status {
  color: #00a1d6;
  font-size: 12px;
  padding-top: 8px;
  display: flex;
  align-items: center;
  z-index: 10;
}
.task-status-pending,
.task-status-wait {
  color: #757575;
}
.task-status-selected {
  color: #fff;
}
.task-selected .task-status {
  color: hsla(0,0%,100%,.7);
}
.task-status .text {
  font-size: 10px;
  transform: scale(.83);
  z-index: 10;
  white-space: nowrap;
  line-height: 10px;
}
.task-delete {
  position: absolute;
  right: 6px;
  top: 7px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  z-index: 10;
}
.task-delete .off {
  width: 10px;
  height: 10px;
  cursor: pointer;
  z-index: 10;
}
</style>
