<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import IndexView from '@/views/index/IndexView.vue'
import type { VideoPageInfoProps } from '@/utils/PropsType'


defineProps<VideoPageInfoProps>()

</script>

<template>
  <IndexView>
    <div class="container">
<!--      主内容区域-->
      <div class="main-content">

<!--        标题栏-->
        <div class="title-area">
          <p>{{ videoInfo.title || '--' }}</p>
        </div>

<!--        播放器-->
        <div class="video-player">

        </div>

<!--        互动按钮-->
        <div class="interact-area">

        </div>

<!--        简介-->
        <div class="video-desc">
          {{ videoInfo.desc || '--' }}
        </div>

<!--        评论-->
        <div class="comment-area">

        </div>
      </div>

<!--      右侧内容区域-->
      <div class="side-content">

<!--        作者信息-->
        <div class="author-info">
          <p>{{ videoInfo.uid || '--' }}</p>
        </div>

<!--        弹幕列表-->
        <div class="bullet-list">

        </div>

<!--        合集列表-->
        <div class="compilation-list">

        </div>

<!--        推荐列表-->
        <div class="recommend-list">

        </div>
      </div>

    </div>
  </IndexView>
</template>

<style scoped>

</style>
