<script setup lang="ts">

import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import IconDevicePC from '@/components/icons/IconDevicePC.vue'
import IconDeviceMobile from '@/components/icons/IconDeviceMobile.vue'
import IconUpUser from '@/components/icons/IconUpUser.vue'

defineProps({
  title: String,
  duration: String,
  progress: Number,
  userName: String,
  dateTime: String,
  isMobile: Boolean,
})
</script>

<template>
  <a href="#" target="_blank" class="header-history-card header-history-video">
    <div class="header-history-video__image">
      <picture class="v-img">
        <source :srcset="`${ASSETS_BASE_URL}/avatar/honkai-starrail-video-cover-1.avif`" type="image/avif">
        <source srcset="" type="image/webp">
        <img src="" alt="">
      </picture>
      <div class="header-history-video__duration">
        <span class="header-history-video__duration--text">{{ duration }}</span>
      </div>
      <div class="header-history-video__progress">
        <div
          class="header-history-video__progress--inner"
          :style="{width: `${progress}%`, borderRadius: '0 0 4px'}"
        ></div>
      </div>
    </div>
    <div class="header-history-card__info">
      <div class="header-history-card__info--title">{{ title }}</div>
      <div class="header-history-card__info--date">
        <IconDeviceMobile v-if="isMobile"/>
        <IconDevicePC v-else/>
        <span>{{ dateTime }}</span>
      </div>
      <div class="header-history-card__info--name">
        <IconUpUser/>
        <span>{{ userName }}</span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.pili-header .header-history-video {
  display: flex;
  padding: 10px 20px;
  transition: background-color .3s;
}
.pili-header .header-history-video__image,
.pili-header .header-history-video__image .v-img {
  position: relative;
  flex-shrink: 0;
  margin-right: 10px;
  width: 128px;
  height: 72px;
  border-radius: 4px;
}
.pili-header .header-history-video__duration {
  position: absolute;
  right: 4px;
  bottom: 4px;
  padding: 0;
  border-radius: 2px;
  background: rgba(0,0,0,.4);
  line-height: 17px;
}
.pili-header .header-history-video__duration--text {
  display: inline-block;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  transform: scale(.85);
  transform-origin: center top;
}
.pili-header .header-history-video__progress {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3px;
  border-radius: 0 0 4px 4px;
  background: rgba(0,0,0,.7);
}
.pili-header .header-history-video__progress--inner {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: #fb7199;
}
.history-panel-popover .header-history-card__info {
  display: flex;
  flex: 1 auto;
  flex-direction: column;
  justify-content: space-between;
}
.history-panel-popover .header-history-card__info--date,
.history-panel-popover .header-history-card__info--name {
  display: flex;
  align-items: center;
  color: var(--text3);
  font-size: 12px;
  line-height: 16px;
}

</style>
