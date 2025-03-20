<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IconCreativity from '@/components/icons/IconCreativity.vue'
import IconUploadManage from '@/components/icons/IconUploadManage.vue'
</script>

<template>
  <div class="upload-section">
    <a href="#" target="_blank">
      <IconCreativity/>
    </a>
    <div class="upload-section-jumper">
      <a href="#" target="_blank">
        <i class="vui_icon sic-BDC-arrow_upload_line" style="font-size: 16px"/>
        <span>视频投稿</span>
      </a>
      <div class="upload-section-jumper__split"></div>
      <a href="#" target="_blank">
        <IconUploadManage/>
        <span>投稿管理</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.upload-section {
  padding: 24px 16px;
  background-color: var(--bg2);
  border-radius: 6px;
  color: var(--text1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-section-jumper {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 6px;
  height: 34px;
  width: 206px;
  border: 1px solid var(--line_regular);
  font-size: 12px;
}
@media (min-width: 0) {
  .upload-section-jumper {
    width: 206px;
  }
}
@media (min-width: 1100px) {
  .upload-section-jumper {
    width: 209px;
  }
}
.upload-section-jumper a {
  height: 18px;
  line-height: 18px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-section-jumper__split {
  width: 1px;
  height: 18px;
  background-color: var(--line_regular);
}
</style>
