<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IconNoInterest from '@/components/icons/IconNoInterest.vue'
import IconRevert from '@/components/icons/IconRevert.vue'
import IconWatchLater from '@/components/icons/IconWatchLater.vue'
import IconStatsPlay from '@/components/icons/IconStatsPlay.vue'
import IconStatsDanmaku from '@/components/icons/IconStatsDanmaku.vue'
import IconUpUserBlack from '@/components/icons/IconUpUserBlack.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import { ref } from 'vue'
import NoInterestPopover from '@/components/video/NoInterestPopover.vue'

defineProps({
  empty: {
    type: Boolean,
    default: false,
  },
  coverUrl: {
    type: String,
    default: `${ASSETS_BASE_URL}/image/video-cover-1.jpg@672w_378h_1c.avif`,
  },
  title: {
    type: String,
    default: '母 鸡 卡 生 产 线',
  },
  authorName: {
    type: String,
    default: '椿棠陌の笙',
  },
  playCount: {
    type: String,
    default: '0',
  },
  danmakuCount: {
    type: String,
    default: '0',
  },
  duration: {
    type: String,
    default: '0:01',
  },
  date: {
    type: String,
    default: '今天 14:33',
  },
})
const vid = ref<numbner>(1100)
const showTinyMenu = ref<boolean>(false)
const showWatchLaterIcon = ref<boolean>(false)
const showWatchLaterText = ref<boolean>(false)
</script>

<template>
  <div class="pili-video-card">
    <!--    skeleton-->
    <div class="pili-video-card__skeleton" v-if="empty">
      <div class="pili-video-card__skeleton--cover"></div>
      <div class="pili-video-card__skeleton--info">
        <div class="pili-video-card__skeleton--right">
          <p class="pili-video-card__skeleton--text"></p>
          <p class="pili-video-card__skeleton--text short"></p>
          <p class="pili-video-card__skeleton--light"></p>
        </div>
      </div>
    </div>

    <!--    content-->
    <div class="pili-video-card__wrap" v-else>
      <div class="pili-video-card__no-interest" v-show="false">
        <div class="pili-video-card__no-interest--inner">
          <div class="pili-video-card__no-interest--left">
            <IconNoInterest class="no-interest-icon" />
            <span class="no-interest-title">不感兴趣</span>
            <span class="no-interest-desc">将减少此类内容推荐</span>
          </div>
          <div class="pili-video-card__no-interest--right">
            <div class="revert-btn">
              <IconRevert class="revert-icon" />
              <span>撤销</span>
            </div>
          </div>
        </div>
      </div>
      <a class="pili-video-card__image--link" :href="`/video/${vid}`" target="_blank">
        <div
          class="pili-video-card__image pili-video-card__image--hover"
          @mouseenter="showWatchLaterIcon = true"
          @mouseleave="showWatchLaterIcon = false"
        >
          <div class="pili-video-card__image--wrap">
            <div class="pili-watch-later--wrap">
              <div
                class="pili-watch-later pili-watch-later--pip"
                v-show="showWatchLaterIcon"
                @mouseenter="showWatchLaterText = true"
                @mouseleave="showWatchLaterText = false"
              >
                <IconWatchLater class="pili-watch-later__icon" />
                <span
                  class="pili-watch-later__tip--lab"
                  v-show="showWatchLaterText"
                >
                  添加至稍后再看
                </span>
              </div>
            </div>
            <picture class="v-img pili-video-card__cover">
              <source :srcset="coverUrl" type="image/avif" />
              <source srcset="" type="image/webp" />
              <img src="" alt="" />
            </picture>
            <div class="v-inline-player">
              <!--            VideoPlayer-->
            </div>
          </div>
          <div class="pili-video-card__mask">
            <div class="pili-video-card__stats">
              <div class="pili-video-card__stats--left">
                <span class="pili-video-card__stats--item">
                  <IconStatsPlay class="pili-video-card__stats--icon" />
                  <span class="pili-video-card__stats--text">
                    {{ playCount }}</span>
                </span>
                <span class="pili-video-card__stats--item">
                  <IconStatsDanmaku class="pili-video-card__stats--icon" />
                  <span class="pili-video-card__stats--text">
                    {{ danmakuCount }}
                  </span>
                </span>
              </div>
              <span class="pili-video-card__stats__duration">
                {{ duration }}
              </span>
            </div>
          </div>
        </div>
      </a>
      <div
        class="pili-video-card__info"
        @mouseenter="showTinyMenu = true"
        @mouseleave="showTinyMenu = false"
      >
        <div class="pili-video-card__info--right">
          <div class="pili-video-card__info--no-interest" v-show="showTinyMenu">
            <!--            <IconTinyMenu class="pili-video-card__info&#45;&#45;no-interest&#45;&#45;icon" />-->
            <NoInterestPopover />
          </div>
          <h3 class="pili-video-card__info--tit" style="font-weight: 500">
            <a :href="`/video/${vid}`" target="_blank">{{ title }}</a>
          </h3>
          <div class="pili-video-card__info--bottom">
            <a class="pili-video-card__info--owner" href="#" target="_blank">
              <IconUpUserBlack class="pili-video-card__info--owner__up" />
              <span class="pili-video-card__info--author">
                {{ authorName }}
              </span>
              <span class="pili-video-card__info--date">· {{ date }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pili-video-card {
  position: relative;
  --title-font-size: 15px;
  --title-line-height: 22px;
  --subtitle-font-size: 13px;
  --subtitle-line-height: 17px;
  --info-margin-top: 8px;
  --avatar-size: 36px;
  --avatar-margin-right: 8px;
  --icon-size: 18px;
  --title-padding-right: 16px;
  --follow-icon-font-size: 12px;
  --follow-icon-line-height: 17px;
  --cover-radio: 56.25%;
  --no-interest-entry-size: 18px;
  --no-interest-icon-size: 36px;
  --no-interest-title-font-size: 14px;
  --no-interest-subtitle-font-size: 12px;
  --no-interest-btn-icon-size: 16px;
  --no-interest-btn-text-font-size: 13px;
  --no-interest-btn-horizontal-padding: 12px;
  --no-interest-btn-vertical-padding: 6px;
  --no-interest-module-gap: 24px;
}

@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-video-card {
    --info-margin-top: 10px;
  }
}

.pili-video-card__skeleton {
  pointer-events: none;
  user-select: none;
}

.pili-video-card__skeleton--cover {
  padding-top: var(--cover-radio);
  border-radius: 6px;
  background-color: var(--graph_bg_regular);
}

.pili-video-card__skeleton--info {
  margin-top: var(--info-margin-top);
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.pili-video-card__skeleton--right {
  min-width: 0;
  flex: 1;
}

.pili-video-card__skeleton--text {
  margin-bottom: 4px;
  width: 94%;
  height: calc(var(--title-line-height) - 4px);
  border-radius: 4px;
  background-color: var(--graph_bg_regular);
}

.pili-video-card__skeleton--text.short {
  width: 72%;
}

.pili-video-card__skeleton--light {
  margin-top: 8px;
  width: 50%;
  height: var(--subtitle-line-height);
  border-radius: 4px;
  background-color: var(--graph_bg_regular);
}

.pili-video-card.enable-no-interest {
  --title-padding-right: 30px;
}

.pili-video-card__wrap {
  background-color: var(--bg1);
}

.pili-video-card .pili-video-card__no-interest {
  padding-top: var(--cover-radio);
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.4);
}

.pili-video-card .pili-video-card__no-interest--inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pili-video-card .pili-video-card__no-interest--left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pili-video-card .pili-video-card__no-interest--left .no-interest-icon {
  width: var(--no-interest-icon-size);
  height: var(--no-interest-icon-size);
  color: var(--text_white);
  margin-bottom: 5px;
}

.pili-video-card .pili-video-card__no-interest--left .no-interest-title {
  font-size: var(--no-interest-title-font-size);
  line-height: 20px;
  color: var(--text_white);
}

.pili-video-card .pili-video-card__no-interest--left .no-interest-desc {
  font-size: var(--no-interest-subtitle-font-size);
  color: var(--text_white);
  opacity: 0.6;
}

.pili-video-card .pili-video-card__no-interest--right {
  margin-left: var(--no-interest-module-gap);
}

.pili-video-card .pili-video-card__no-interest--right .revert-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--no-interest-btn-vertical-padding)
    var(--no-interest-btn-horizontal-padding);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  font-size: var(--no-interest-btn-text-font-size);
  color: var(--text_white);
  cursor: pointer;
}

.pili-video-card .pili-video-card__no-interest--right .revert-btn .revert-icon {
  width: var(--no-interest-btn-icon-size);
  height: var(--no-interest-btn-icon-size);
  color: var(--text_white);
  margin-right: 6px;
}

.pili-video-card__image--link {
  display: block;
}

.pili-video-card a {
  transition: color 0.2s linear;
  cursor: pointer;
}

.pili-video-card .pili-video-card__image {
  position: relative;
  z-index: 1;
  border-radius: 6px;
}

.pili-video-card .pili-video-card__image--wrap {
  padding-top: var(--cover-radio);
  border-radius: inherit;
  background-color: var(--graph_bg_regular);
  cursor: pointer;
}

.pili-watch-later--wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: 28px;
  height: 28px;
  z-index: 9;
  transform: translateZ(0);
  pointer-events: none;
}

.pili-watch-later--wrap .pili-watch-later {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(33, 33, 33, 0.8);
  padding: 0 3px;
  height: 28px;
  pointer-events: auto;
  position: relative;
}

.pili-watch-later--wrap .pili-watch-later__icon {
  pointer-events: none;
  user-select: none;
  width: 22px;
  height: 22px;
  color: #fff;
}

.pili-watch-later--wrap
  .pili-watch-later.pili-watch-later--pip
  .pili-watch-later__tip--lab {
  pointer-events: none;
  user-select: none;
  font-size: 14px;
  margin-left: 4px;
  color: #fff;
  border-radius: 4px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
}

.pili-video-card .pili-video-card__cover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
}

.v-inline-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.2s linear;
  overflow: hidden;
}

.pili-video-card .pili-video-card__mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: all 0.2s linear 0.2s;
  pointer-events: none;
}

.pili-video-card .pili-video-card__stats {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  box-sizing: border-box;
  padding: 16px 8px 6px;
  width: 100%;
  height: 38px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  color: #fff;
  font-size: var(--subtitle-font-size);
  line-height: var(--icon-size);
  opacity: 1;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pili-video-card .pili-video-card__stats--left {
  min-width: 0;
  flex: 1;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.pili-video-card .pili-video-card__stats--item {
  margin-right: 12px;
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.pili-video-card .pili-video-card__stats--icon {
  margin-right: 2px;
  width: var(--icon-size);
  height: var(--icon-size);
  color: #fff;
}

.pili-video-card .pili-video-card__stats--text {
  word-break: keep-all;
}

.pili-video-card .pili-video-card__info {
  margin-top: var(--info-margin-top);
  min-height: calc(
    var(--title-line-height) * 2 + var(--subtitle-line-height) + 4px
  );
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.pili-video-card .pili-video-card__info--right {
  min-width: 0;
  flex: 1;
  position: relative;
}

.pili-video-card .pili-video-card__info--no-interest {
  position: absolute;
  top: calc((var(--title-line-height) - var(--no-interest-entry-size)) / 2);
  right: 0;
  color: var(--text2);
  border-radius: 4px;
  display: flex;
}

.pili-video-card .pili-video-card__info--no-interest--icon {
  width: var(--no-interest-entry-size);
  height: var(--no-interest-entry-size);
}

.pili-video-card .pili-video-card__info--tit {
  padding-right: var(--title-padding-right);
  color: var(--text1);
  font-size: var(--title-font-size);
  line-height: var(--title-line-height);
  height: calc(2 * var(--title-line-height));
  display: -webkit-flex;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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

.pili-video-card .pili-video-card__info--tit > a {
  color: var(--text1);
}

.pili-video-card .pili-video-card__info--tit > a:hover {
  color: var(--brand_blue);
}

.pili-video-card .pili-video-card__info--bottom {
  margin-top: 4px;
  color: var(--text3);
  font-size: var(--subtitle-font-size);
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.pili-video-card .pili-video-card__info--owner {
  cursor: pointer;
  transition: color 0.2s linear;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  display: -webkit-inline-flex;
  display: inline-flex;
}

.pili-video-card .pili-video-card__info--owner__up {
  margin-right: 2px;
  width: var(--subtitle-line-height);
  height: var(--subtitle-line-height);
}

.pili-video-card .pili-video-card__info--author {
  flex: 1;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word !important;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 1;
  line-height: var(--subtitle-line-height);
}

.pili-video-card .pili-video-card__info--date {
  margin-left: 4px;
  line-height: var(--subtitle-line-height);
}
</style>
