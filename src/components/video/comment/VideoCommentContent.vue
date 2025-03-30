<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import VideoCommentListItem from '@/components/video/comment/VideoCommentListItem.vue'
</script>

<template>
  <div id="contents">

    <div id="feed">
      <video-comment-list-item
        v-for="item in 10"
        :key="item"
      />
    </div>

    <div id="reply-commentbox">

    </div>
  </div>
</template>

<style scoped>
#contents {
  padding-top: 14px;
  position: relative;
}


</style>
