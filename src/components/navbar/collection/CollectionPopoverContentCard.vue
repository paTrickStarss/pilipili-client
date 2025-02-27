<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IconUpUserWhite from '@/components/icons/IconUpUserWhite.vue'

defineProps({
  title: String,
  name: String,
  url: String,
  imgUrl: String,
  duration: String,
})
</script>

<template>
  <a class="header-fav-card" :href="url" target="_blank">
    <div class="header-fav-card__image">
      <picture class="v-img">
        <source :srcset="imgUrl" type="image/webp" />
        <img src="" alt="" loading="lazy" />
      </picture>
      <div class="header-fav-card__duration">
        <span class="header-fav-card__duration--text">{{ duration }}</span>
      </div>
    </div>
    <div class="header-fav-card__info">
      <div class="header-fav-card__info--title">{{ title }}</div>
      <span class="header-fav-card__info--name">
        <IconUpUserWhite />
        <span>{{ name }}</span>
      </span>
    </div>
  </a>
</template>

<style scoped>
.pili-header .header-fav-card {
  display: flex;
  padding: 10px 10px 10px 20px;
  transition: background-color 0.3s;
}

.pili-header .header-fav-card__image {
  position: relative;
  margin-right: 10px;
  background: var(--bg3);
  border-radius: 4px;
}

.pili-header .header-fav-card__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pili-header .header-fav-card .v-img {
  position: relative;
  flex-shrink: 0;
  width: 128px;
  height: 72px;
  border-radius: 4px;
}

.pili-header .header-fav-card .v-img img {
  border-radius: 4px;
}

.pili-header .header-fav-card__duration {
  position: absolute;
  right: 4px;
  bottom: 4px;
  padding: 0;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.4);
  line-height: 17px;
}

.pili-header .header-fav-card__duration--text {
  display: inline-block;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  transform: scale(0.85);
  transform-origin: center top;
}

.pili-header .header-fav-card__info--title {
  font-family:
    PingFang SC,
    HarmonyOS Sans SC,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
  font-weight: 500;
}

.pili-header .header-fav-card__info--title {
  height: 36px;
  color: var(--text1);
  font-size: 14px;
  line-height: 18px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word !important;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 2;
}

.pili-header .header-fav-card__info--name {
  color: var(--text3);
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
}
</style>
