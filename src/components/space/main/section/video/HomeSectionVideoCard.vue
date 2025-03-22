<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import type { VideoDTOType } from '@/types/ApiRespType'
import { DateTimeUtil } from '../../../../../utils/DateTimeUtil'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'

defineProps<{
  info: VideoDTOType
  progress: number
}>()
</script>

<template>
  <div class="bili-video-card">
    <div class="bili-video-card__wrap">
      <div class="bili-video-card__cover">
        <a href="#" target="_blank" class="bili-cover-card">
          <div class="bili-cover-card__thumbnail">
            <img :src="info.coverUrl || `${ASSETS_BASE_URL}/image/collection-cover-1.jpg@672w_380h_1c.avif`" alt="" />
          </div>
          <div class="bili-cover-card__stats">
            <div class="bili-cover-card__stat">
              <i class="sic-BDC-playdata_square_line" />
              <span>{{ info.viewCount }}</span>
            </div>
            <div class="bili-cover-card__stat">
              <i class="sic-BDC-danmu_square_line" />
              <span>{{ info.danmakuCount }}</span>
            </div>
            <div class="bili-cover-card__stat">
              <span>{{ info.duration }}</span>
            </div>
          </div>
          <div
            class="bili-cover-card__progress"
            :style="{ '--bili-cover-card-progress-value': `${progress}%` }"
          ></div>
        </a>
        <div
          class="bili-card-inline-player bili-card-inline-player--visible"
        ></div>
        <div class="bili-card-watch-later">
          <div class="bili-card-watch-later__btn">
            <i
              class="sic-BDC-arrow_play_next_line"
              style="font-variation-settings: 'strk' 1.5"
            />
          </div>
          <span class="bili-card-watch-later__tip">稍后再看</span>
        </div>
      </div>
      <div class="bili-video-card__details">
        <div class="bili-video-card__title" :title="info.title">
          <a :href="info.contentUrl" target="_blank">
            {{ info.title }}
          </a>
        </div>
        <div class="bili-video-card__subtitle" :title="DateTimeUtil.instance.getDate(info.publishTime)">
          <span>{{ DateTimeUtil.instance.getDateTimeString(info.publishTime) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bili-video-card {
  --bili-video-card-theme-brand-color: var(
    --bili-card-theme-brand-color,
    var(--brand_blue)
  );
  --bili-video-card-border-radius: 6px;
  --bili-video-card-direction: column;
  --bili-video-card-stat-icon-size: 18px;
  --bili-video-card-stat-font-size: 13px;
  --bili-video-card-progress-value: 0;
  --bili-video-card-details-margin-top: 10px;
  --bili-video-card-title-font-size: 15px;
  --bili-video-card-title-line-height: 22px;
  --bili-video-card-title-padding-right: 16px;
  --bili-video-card-subtitle-margin-top: 4px;
  --bili-video-card-subtitle-icon-size: 16px;
  --bili-video-card-subtitle-font-size: 13px;
  --bili-video-card-subtitle-line-height: 18px;
  --bili-video-card-label-font-size: 12px;
  position: relative;
}

.bili-video-card__wrap {
  position: relative;
  display: flex;
  flex-direction: var(--bili-video-card-direction);
}

.bili-video-card__cover {
  background: var(--graph_weak, #c9ccd0);
}

.bili-video-card__cover {
  --bili-cover-card-ratio: 56.25%;
  position: relative;
  border-radius: var(--bili-video-card-border-radius);
  overflow: hidden;
  z-index: 1;
}

.bili-cover-card {
  --bili-cover-card-border-radius: 6px;
  --bili-cover-card-direction: column;
  --bili-cover-card-stat-icon-size: 18px;
  --bili-cover-card-stat-font-size: 13px;
  --bili-cover-card-stat-height: 18px;
  --bili-cover-card-filter-blur: 20px;
  --bili-cover-card-badge-bg: rgba(0, 0, 0, 0.5);
  --bili-cover-card-badge-color: var(--text_white);
  --bili-cover-card-badge-font-size: 12px;
  --bili-cover-card-tag-font-size: 13px;
  --bili-cover-card-tag-line-height: 18px;
  --bili-cover-card-progress-height: 3px;
  --bili-cover-card-transition: all 0.2s linear 0.2s;
  padding-top: var(--bili-cover-card-ratio);
  position: relative;
  display: block;
}

.bili-cover-card {
  background: var(--graph_weak, #c9ccd0);
}

.bili-cover-card__thumbnail {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: var(--bili-cover-card-border-radius);
}

.bili-cover-card__thumbnail img {
  width: 100%;
  height: 100%;
  border-radius: var(--bili-cover-card-border-radius);
}

.bili-cover-card__stats {
  padding: 14px 8px 4px !important;
}

.bili-cover-card__stats {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  box-sizing: border-box;
  padding: 14px 8px 6px;
  width: 100%;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  background-image: linear-gradient(180deg, #0000, #000c);
  color: #fff;
  font-size: var(--block-stat-font-size);
  line-height: var(--block-stat-icon-size);
  opacity: 1;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  transition: var(--bili-cover-card-transition);
}

.bili-cover-card__stat {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: var(--bili-cover-card-stat-font-size);
  height: var(--bili-cover-card-stat-height);
  flex-shrink: 0;
}

.bili-cover-card__stat i {
  margin-right: 2px;
  font-size: var(--bili-cover-card-stat-icon-size);
}

.bili-cover-card__stat:last-child {
  margin-right: 0;
  justify-content: flex-end;
  flex: 1;
  overflow: hidden;
}

.bili-cover-card__stat:last-child span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.bili-cover-card__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--bili-cover-card-progress-height);
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s linear 0.2s;
}

.bili-cover-card__progress:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--bili-cover-card-progress-value);
  height: 100%;
  background-color: var(--brand_pink);
}

.bili-card-inline-player {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;
  color: var(--text_white);
  overflow: hidden;
}

.bili-card-inline-player--visible {
  opacity: 1;
}

.bili-video-card__cover .bili-card-inline-player {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  cursor: pointer;
}

.bili-card-watch-later {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s linear;
  color: var(--text_white);
}

.bili-video-card__cover .bili-card-watch-later {
  top: 8px;
  right: 8px;
  z-index: 200;
}

.bili-card-watch-later__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(33, 33, 33, 0.8);
  padding: 0 3px;
  height: 28px;
  width: 28px;
  pointer-events: auto;
  box-sizing: border-box;
  transition: width 0.3s;
}

.bili-card-watch-later__btn i {
  font-size: 22px;
  pointer-events: none;
}

.bili-card-watch-later__tip {
  display: none;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  position: absolute;
  bottom: -6px;
  right: -10px;
  transform: translateY(100%);
  font-size: 12px;
  border-radius: 4px;
  line-height: 18px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
}

.bili-video-card__details {
  margin-top: var(--bili-video-card-details-margin-top);
  display: flex;
  flex-direction: column;
}

.bili-video-card__title {
  position: relative;
  padding-right: var(--bili-video-card-title-padding-right);
  color: var(--text1);
  font-size: var(--bili-video-card-title-font-size);
  line-height: var(--bili-video-card-title-line-height);
  height: calc(2 * var(--bili-video-card-title-line-height));
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 2;
  font-weight: 500;
}

/* 以下这三类全角括弧字符字宽较大，需要调整一下缩进 */
.bili-video-card__title[title^='「'],
.bili-video-card__title[title^='『'],
.bili-video-card__title[title^='【'] {
  text-indent: -0.6em;
}

.bili-video-card__title a {
  cursor: pointer;
  transition: color 0.2s linear;
  font-weight: inherit;
}

.bili-video-card__subtitle {
  margin-top: var(--bili-video-card-subtitle-margin-top);
  display: flex;
  align-items: center;
  color: var(--text3);
  font-size: var(--bili-video-card-subtitle-font-size);
  line-height: var(--bili-video-card-subtitle-line-height);
  height: var(--bili-video-card-subtitle-line-height);
}

.bili-video-card__subtitle > span {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 1;
}
</style>
