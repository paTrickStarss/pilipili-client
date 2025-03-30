<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import type { VideoPageInfoProps } from '@/types/PropsType'
import { ref } from 'vue'
import IconHonor from '@/components/icons/IconHonor.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconView from '@/components/icons/IconView.vue'
import IconDanmaku from '@/components/icons/IconDanmaku.vue'
import IconRemark from '@/components/icons/IconRemark.vue'
import IconCopyright from '@/components/icons/IconCopyright.vue'
import IconShowMore from '@/components/icons/IconShowMore.vue'
import { DateTimeUtil } from '@/utils/DateTimeUtil'

defineProps<{
  info: VideoPageInfoProps
}>()

const showPanel = ref<boolean>(false)

const showMoreBtn = ref<boolean>(false)
function showMoreEnter() {
  showMoreBtn.value = true
  showPanel.value = true
}
function showMoreLeave() {
  showMoreBtn.value = false
  setTimeout(() => {
    if (!overFlow.value) {
      showPanel.value = false
    }
  }, 100)
}
const overFlow = ref<boolean>(false)
function overflowEnter() {
  overFlow.value = true
}
function overflowLeave() {
  overFlow.value = false
  setTimeout(() => {
    if (!showMoreBtn.value) {
      showPanel.value = false
    }
  }, 100)
}
</script>

<template>
  <div id="viewbox_report" class="video-info-container win">
    <div class="video-info-title">
      <div class="video-info-title-inner">
        <h1
          class="video-title special-text-indent"
          :title="info.title"
        >
          {{ info.title }}
        </h1>
      </div>

      <div
        class="overflow-panel"
        :style="{ opacity: showPanel ? 1 : 0 }"
        @mouseenter="overflowEnter"
        @mouseleave="overflowLeave"
      >
        <div class="title special-text-indent" :title="info.title">
          {{ info.title }}
        </div>
        <div class="video-info-detail-list info pop-mode">
<!--          视频荣誉-->
          <a
            v-if="info.honorText"
            href="#"
            target="_blank"
            class="honor item honor-rank"
          >
            <IconHonor class="honor-icon" />
            <div class="honor-text">{{ info.honorText }}</div>
            <IconArrowRight class="honor-arrow" />
          </a>
<!--          播放量-->
          <div class="view item">
            <IconView class="view-icon" />
            <div class="view-text">{{ info.viewCount }}</div>
          </div>
<!--          弹幕量-->
          <div class="dm item">
            <IconDanmaku class="dm-icon" />
            <div class="dm-text">{{ info.danmakuCount }}</div>
          </div>
<!--          发布日期-->
          <div class="pubdate-ip item">
            <div class="pubdate-ip-text">
              {{ DateTimeUtil.instance.getDateTime(info.publishTime) }}
            </div>
          </div>
<!--          作者声明-->
          <div class="video-argue item" v-if="info.argue">
            <div class="video-argue-inner pure-text neutral">
              <IconRemark class="remark-icon" />
              <div class="argue-text">作者声明：{{ info.argue }}</div>
            </div>
          </div>
<!--          版权声明（转载声明）-->
          <div class="copyright item" v-if="info.reprintPermit === 1">
            <IconCopyright class="copyright-icon" />
            <div class="copyright-text">未经作者授权：禁止转载</div>
          </div>

        </div>
      </div>
    </div>

    <div class="video-info-meta">
      <div
        class="video-info-detail-list video-info-detail-content video-info-detail-content-overflow"
        :style="{ opacity: showPanel ? '0' : '1' }"
      >
        <!--          视频荣誉-->
        <a
          v-if="info.honorText"
          href="#"
          target="_blank"
          class="honor item honor-rank"
        >
          <IconHonor class="honor-icon" />
          <div class="honor-text">{{ info.honorText }}</div>
          <IconArrowRight class="honor-arrow" />
        </a>
        <!--          播放量-->
        <div class="view item">
          <IconView class="view-icon" />
          <div class="view-text">{{ info.viewCount }}</div>
        </div>
        <!--          弹幕量-->
        <div class="dm item">
          <IconDanmaku class="dm-icon" />
          <div class="dm-text">{{ info.danmakuCount }}</div>
        </div>
        <!--          发布日期-->
        <div class="pubdate-ip item">
          <div class="pubdate-ip-text">
            {{ DateTimeUtil.instance.getDateTime(info.publishTime) }}
          </div>
        </div>
        <!--          作者声明-->
        <div
          class="video-argue item"
          v-if="info.argue"
          style="flex-shrink: initial; margin-right: 0"
        >
          <div class="video-argue-inner pure-text neutral">
            <IconRemark class="remark-icon" />
            <div class="argue-text">作者声明：{{ info.argue }}</div>
          </div>
        </div>
      </div>
      <div
        class="show-more"
        :class="{'show-more-hover': showPanel}"
        @mouseenter="showMoreEnter"
        @mouseleave="showMoreLeave"
      >
        <div class="show-more-btn detail">
          <IconShowMore class="show-more-btn-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-info-container {
  --keep-blank-space: 30px;
  position: relative;
  height: 104px;
  box-sizing: border-box;
  padding-top: 22px;
}
.video-info-container .video-info-title {
  position: relative;
}
.video-info-container .video-info-title-inner {
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.video-info-container .video-info-title-inner .video-title {
  flex-shrink: 0;
  font-size: 20px;
  font-weight: 500;
  color: var(--text1);
  line-height: 28px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.video-info-container .video-info-title .overflow-panel {
  --vertical-padding: 10px;
  --horizontal-padding: 16px;
  --border-width: 1px;
  background-color: var(--bg1);
  border: var(--border-width) solid var(--line_regular);
  padding: var(--vertical-padding) var(--horizontal-padding);
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: calc(100% - var(--keep-blank-space));
  height: auto;
  z-index: 99;
  position: absolute;
  top: calc(0px - calc(var(--vertical-padding) + var(--border-width)));
  left: calc(0px - calc(var(--horizontal-padding) + var(--border-width)));
  color: var(--text3);
  font-size: 13px;
  transition: opacity .3s;
}
.video-info-container .video-info-title .overflow-panel .title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text1);
  line-height: 28px;
}
.video-info-detail-list {
  font-size: 13px;
  color: var(--text3);
  display: flex;
  align-items: center;
  height: 24px;
  overflow: hidden;
  box-sizing: border-box;
  transition: opacity .3s;
}
.video-info-container .video-info-meta .video-info-detail-content {
  flex: 1;
}
.video-info-container .video-info-meta .video-info-detail-content-overflow {
  margin-right: var(--keep-blank-space);
}
.video-info-detail-list.pop-mode {
  width: 100%;
/*  height: 100%;*/
  box-sizing: border-box;
  flex-wrap: wrap;
  height: auto;
}
.video-info-container .video-info-title .overflow-panel .info {
  margin-top: 6px;
}
.honor {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  height: 24px;
  border-radius: 2px;
  padding: 0 6px;
}
.honor.honor-rank {
  color: #ff6699;
  background-color: rgba(255, 102, 153, 0.1);
}
.honor .honor-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
.honor .honor-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.honor .honor-arrow {
  width: 10px;
  height: 10px;
}

.video-argue {
  display: flex;
}
.video-argue .video-argue-inner {
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  border-radius: 2px;
  padding: 3px 6px;
  overflow: hidden;
}
.video-argue .video-argue-inner.neutral {
  color: var(--text3);
  border-radius: 0;
  padding: 0;
}
.video-argue .video-argue-inner.pure-text {
  cursor: text;
}
.video-argue .video-argue-inner .remark-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 2px;
}
.video-argue .video-argue-inner.neutral .remark-icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
.video-argue .video-argue-inner .argue-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.video-info-detail-list .item {
  flex-shrink: 0;
  margin-right: 12px;
  overflow: hidden;
}
.video-info-detail-list .copyright {
  display: inline-flex;
  align-items: center;
}
.video-info-detail-list .copyright .copyright-icon {
  flex-shrink: 0;
  margin-right: 2px;
  color: #fd676f;
  width: 16px;
  height: 16px;
}
.video-info-detail-list .copyright .copyright-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.video-info-detail-list .item:last-child {
  margin-right: 0;
}
.video-info-detail-list .view,
.video-info-detail-list .dm {
  display: inline-flex;
  align-items: center;
}
.video-info-detail-list .view .view-icon,
.video-info-detail-list .dm .view-icon,
.video-info-detail-list .view .dm-icon,
.video-info-detail-list .dm .dm-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
.video-info-detail-list .view .view-text,
.video-info-detail-list .dm .view-text,
.video-info-detail-list .view .dm-text,
.video-info-detail-list .dm .dm-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.video-info-detail-list .pubdate-ip {
  display: flex;
  align-items: center;
  font-size: 13px;
}
.video-info-detail-list .pubdate-ip .pubdate-ip-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.video-info-detail-list.pop-mode .item {
  height: 24px;
}

.video-info-container .video-info-meta {
  margin-top: 6px;
  position: relative;
  display: flex;
  align-items: center;
}
.video-info-container .show-more {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 0;
  cursor: pointer;
  border-radius: 4px;
}
.video-info-container .show-more.show-more-hover {
  background-color: var(--graph_bg_thick);
}
.video-info-container .show-more.show-more-hover .show-more-btn {
  transform: rotate(180deg);
}
.video-info-container .show-more .show-more-btn {
  display: flex;
  width: 20px;
  height: 20px;
  transition: all 0.3s;
}
.video-info-container .show-more .show-more-btn .show-more-btn-icon {
  width: 100%;
  height: 100%;
}


</style>
