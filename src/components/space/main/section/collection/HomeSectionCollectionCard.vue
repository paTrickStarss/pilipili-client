<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import { ASSETS_BASE_URL } from '@/utils/imgUtil'

defineProps({
  title: String,
  coverUrl: String,
  videoCount: Number,
  himitsu: Boolean,
})
</script>

<template>
  <div class="fav-card">
    <div class="fav-card-cover">
      <div class="folder-cover-card">
        <div class="folder-cover-card__cover">
          <div class="bili-cover-card bili-cover-card--frozen">
            <div class="bili-cover-card__thumbnail">
              <img :src="coverUrl || `${ASSETS_BASE_URL}/image/collection-cover-1.jpg@672w_380h_1c.avif`" :alt="title">
            </div>
            <div class="bili-cover-card__stats">
              <div class="bili-cover-card__stat">
                <i class="sic-BDC-lock_locked_line"/>
                <span></span>
              </div>
              <div class="bili-cover-card__stat">
                <span>{{ videoCount }}个视频</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fav-card-info">
      <div class="vui_ellipsis multi-mode" style="-webkit-line-clamp: 1;">
        {{ title }}
      </div>
      <div class="fav-card-info__type">{{ himitsu? '私有':'公开' }}</div>
    </div>
  </div>
</template>

<style scoped>
.fav-card {
  display: block;
  height: 100%;
  padding-top: 16px;
  flex: none;
}
.fav-section__content .items>*:nth-child(1) {
  display: block!important;
}
@media (min-width: 1340px) {
  .fav-section__content .items > *:nth-child(1) {
    display: block !important;
  }
}
.fav-card .fav-card-cover {
  display: block;
  position: relative;
  background: #c9ccd0;
  border-radius: 6px;
  cursor: pointer;
}
.folder-cover-card {
  position: relative;
  --radius: 6px;
  --height: 16px;
  --card-ratio: 56.25%;
}
.folder-cover-card__cover {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  background-color: var(--graph_bg_thick);
  --bili-cover-card-ratio: var(--card-ratio);
}
.bili-cover-card {
  background: var(--graph_bg_thick);
}
.fav-card .bili-cover-card {
  overflow: hidden;
  --bili-cover-card-ratio: 56.25%;
}
.fav-card .fav-card-cover .bili-cover-card {
  border-radius: 6px;
}
.folder-cover-card__back1 {
  position: absolute;
  background: var(--graph_bg_regular);
  width: 90%;
  height: var(--height);
  border-radius: var(--radius);
  top: -8px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: -5;
}
.folder-cover-card__back2 {
  position: absolute;
  background: var(--graph_bg_thin);
  width: 80%;
  height: var(--height);
  border-radius: var(--radius);
  top: -16px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: -10;
}

.fav-card-info {
  cursor: pointer;
  max-width: 100%;
  margin-top: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  color: var(--text1);
}
.fav-card-info__type {
  font-size: 12px;
  color: var(--text3);
  margin-top: 4px;
}

</style>
