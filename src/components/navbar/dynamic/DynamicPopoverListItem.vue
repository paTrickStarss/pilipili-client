<script setup lang="ts">

import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import IconWatchLater from '@/components/icons/IconWatchLater.vue'
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const showWatchLater = ref<boolean>(false)

const watchLater = () => {
  message.info('watchLater')
}
</script>

<template>

  <a href="#" target="_blank">
    <div class="header-dynamic-list-item">
      <div class="header-dynamic-container">
        <div class="header-dynamic__box--left">
          <a class="header-dynamic-avatar" href="#" target="_blank" title="崩坏星穹铁道">
            <div class="pili-avatar" style="width: 100%; height: 100%">
              <img :src="`${ASSETS_BASE_URL}/avatar/honkai-starrail-avatar.avif`" alt="avatar img"
                   class="pili-avatar-img pili-avatar-face pili-avatar-img-radius">
              <span class="pili-avatar-icon pili-avatar-right-icon pili-avatar-icon-business"/>
            </div>
          </a>
        </div>
        <div class="header-dynamic__box--center">
          <div class="dynamic-name-line">
            <div class="user-name">崩坏星穹铁道</div>
          </div>
          <div class="dynamic-info-content">
            <div class="all-in-one-article-title">
              《崩坏：星穹铁道》黄金史诗PV：「命运的第一个黎明」
            </div>
          </div>
          <span class="publish-time">23分钟前</span>
        </div>
        <a class="header-dynamic__box--right" href="/detail" target="_blank" @click.prevent="watchLater">
          <div class="cover" @mouseenter="showWatchLater = true" @mouseleave="showWatchLater = false">
            <picture class="v-img">
              <source :srcset="`${ASSETS_BASE_URL}/avatar/honkai-starrail-video-cover-1.avif`" type="image/avif">
              <img src="" alt="">
            </picture>
            <div class="watch-later" v-show="showWatchLater">
              <IconWatchLater/>
            </div>
          </div>
        </a>
      </div>
    </div>
  </a>
</template>

<style scoped>
.pili-header .header-dynamic-list-item {
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: .3s;
}
.pili-header .header-dynamic-list-item:hover {
  background-color: var(--Ga2);
}
.pili-header .header-dynamic-list-item .header-dynamic-container {
  display: flex;
  flex-direction: row;
}
.pili-header .header-dynamic-list-item .header-dynamic__box--left,
.pili-header .header-dynamic-list-item .header-dynamic__box--right {
  width: 36px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.pili-header .header-dynamic-avatar {
  z-index: 2;
  position: relative;
  display: block;
  width: 38px;
  height: 38px;
  border: 2px solid var(--graph_bg_thick);
  border-radius: 50%;
}

.pili-avatar-face {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
}
.pili-avatar-img {
  border: none;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
}
.pili-avatar-img-radius {
  border-radius: 50%;
}
.pili-header .pili-avatar-img {
  transform: translateZ(0);
  will-change: transform;
}
.pili-header .pili-avatar-face {
  top: 0;
  left: 0;
}
.pili-avatar-icon-business {
  background-image: url(//i0.hdslb.com/bfs/seed/jinkela/short/user-avatar/business.svg);
}
.pili-avatar-right-icon {
  width: 27.5%;
  height: 27.5%;
  position: absolute;
  right: 0;
  bottom: -1px;
  background-size: cover;
  image-rendering: -webkit-optimize-contrast;
}
.pili-header .header-dynamic-list-item .header-dynamic__box--center {
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 12px;
}
.pili-header .header-dynamic-list-item .dynamic-name-line {
  display: inline-block;
  font-size: 13px;
  color: var(--text2);
}
.pili-header .header-dynamic-list-item .dynamic-name-line .user-name {
  display: flex;
  align-items: center;
}
.pili-header .header-dynamic-list-item .dynamic-name-line .user-name>a {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word!important;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 1;
}
.pili-header .header-dynamic-list-item .dynamic-info-content {
  margin-top: 4px;
  font-size: 14px;
  color: var(--text1);
  font-weight: 500;
  max-width: 200px;
  display: inline-block;
}
.pili-header .header-dynamic-list-item .header-dynamic__box--center .dynamic-info-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.all-in-one-article-title {
  overflow: inherit;
  text-overflow: inherit;
  display: inherit;
  font-size: 14px;
  line-height: 20px;
  color: var(--text1);
  line-clamp: inherit;
  -webkit-line-clamp: inherit;
  -webkit-box-orient: inherit;
}
.publish-time {
  color: var(--text3);
  display: inline-block;
  font-size: 12px;
}
.pili-header .header-dynamic-list-item .header-dynamic__box--right {
  width: 64px;
  position: relative;
  top: 20px;
  margin-bottom: 20px;
}
.cover {
  width: 82px;
  height: 46px;
  border-radius: 4px;
  background: var(--raph_bg_thick) center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.watch-later {
  position: absolute;
  width: 28px;
  height: 28px;
  padding-top: 3px;
  padding-left: 3px;
  border-radius: 6px;
  background-color: rgba(33,33,33,.8);
}


</style>
