<script setup lang="ts">

import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import IconChannelHot from '@/components/icons/IconChannelHot.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import { ref } from 'vue'
import IconSpecialColumn from '@/components/icons/IconSpecialColumn.vue'
import IconLiveStream from '@/components/icons/IconLiveStream.vue'
import IconEvent from '@/components/icons/IconEvent.vue'
import IconClassroom from '@/components/icons/IconClassroom.vue'
import IconCommunityCenter from '@/components/icons/IconCommunityCenter.vue'
import IconHotMusic from '@/components/icons/IconHotMusic.vue'

const showMoreEnter = ref<boolean>(false)
</script>

<template>
  <div class="pili-header__channel">
    <div class="channel-icons">
      <a href="#" target="_blank" class="channel-icons__item">
        <div class="icon-bg icon-bg__dynamic">
          <picture class="v-img icon-bg--up">
            <source
              :srcset="`${ASSETS_BASE_URL}/avatar/avatar-usagi.jpg@92w_92h.avif`"
              type="image/avif"
            >
            <source srcset="" type="image/webp">
            <img src="" alt="" loading="lazy">
          </picture>
        </div>
        <i class="channel-notify" style="top: 0; bottom: initial"></i>
        <span class="icon-title">动态</span>
      </a>
      <a href="#" target="_blank" class="channel-icons__item">
        <div class="icon-bg icon-bg__popular">
          <IconChannelHot/>
        </div>
        <span class="icon-title">热门</span>
      </a>
    </div>
    <div class="right-channel-container">
      <div class="channel-items__left">
        <a class="channel-link" href="#" target="_blank">番剧</a>
        <a class="channel-link" href="#" target="_blank">电影</a>
        <a class="channel-link" href="#" target="_blank">国创</a>
        <a class="channel-link" href="#" target="_blank">电视剧</a>
        <a class="channel-link" href="#" target="_blank">综艺</a>
        <a class="channel-link" href="#" target="_blank">纪录片</a>
        <a class="channel-link" href="#" target="_blank">动画</a>
        <a class="channel-link" href="#" target="_blank">游戏</a>
        <a class="channel-link" href="#" target="_blank">鬼畜</a>
        <a class="channel-link" href="#" target="_blank">音乐</a>
        <a class="channel-link" href="#" target="_blank">舞蹈</a>
        <a class="channel-link" href="#" target="_blank">影视</a>
        <a class="channel-link" href="#" target="_blank">娱乐</a>
        <a class="channel-link" href="#" target="_blank">知识</a>
        <a class="channel-link" href="#" target="_blank">科技</a>
        <a class="channel-link" href="#" target="_blank">资讯</a>
        <a class="channel-link" href="#" target="_blank">美食</a>
        <a class="channel-link" href="#" target="_blank">生活</a>
        <a class="channel-link" href="#" target="_blank">汽车</a>
        <a class="channel-link" href="#" target="_blank">时尚</a>
        <a class="channel-link" href="#" target="_blank">运动</a>
        <div
          class="channel-entry-more__link"
          @mouseenter="showMoreEnter = true"
          @mouseleave="showMoreEnter = false"
        >
          <span>更多</span>
          <IconArrowDown
            class="channel-entry-more__link--arrow"
          />
        </div>
      </div>
      <div class="channel-items__right">
        <a class="channel-link__right" href="#" target="_blank">
          <IconSpecialColumn class="icon side-icon"/>
          <span>专栏</span>
        </a>
        <a class="channel-link__right" href="#" target="_blank">
          <IconLiveStream class="icon side-icon"/>
          <span>直播</span>
        </a>
        <a class="channel-link__right" href="#" target="_blank">
          <IconEvent class="icon side-icon"/>
          <span>活动</span>
        </a>
        <a class="channel-link__right" href="#" target="_blank">
          <IconClassroom class="icon side-icon"/>
          <span>课堂</span>
        </a>
        <a class="channel-link__right" href="#" target="_blank">
          <IconCommunityCenter class="icon side-icon"/>
          <span>社区中心</span>
        </a>
        <a class="channel-link__right" href="#" target="_blank">
          <IconHotMusic class="icon side-icon"/>
          <span>新歌热榜</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pili-header .pili-header__channel {
  display: flex;
  align-items: center;
  background: var(--bg1);
  position: relative;
  width: 100%;
  max-width: 2078px;
  margin: 0 auto;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .pili-header__channel {
    padding: 0 64px;
    height: 110px;
  }
}


.pili-header .channel-icons {
  z-index: 0;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .channel-icons {
    margin-right: 8px;
  }
}
.pili-header .channel-icons__item {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  color: var(--text1);
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .channel-icons__item {
    margin-right: 24px;
  }
}
.pili-header .channel-icons .icon-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background .3s;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .channel-icons .icon-bg {
    width: 46px;
    height: 46px;
  }
}
.pili-header .channel-icons .icon-bg__dynamic {
  background: #ff9212;
}
.pili-header .channel-icons .channel-notify {
  position: absolute;
  right: 0;
  bottom: 24px;
  z-index: 1;
}
.pili-header .channel-icons .icon-title {
  text-align: center;
  font-size: 13px;
  line-height: 18px;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .channel-icons .icon-title {
    font-size: 14px;
    line-height: 20px;
  }
}
.pili-header .channel-icons .icon-bg--up {
  overflow: hidden;
  border-radius: 50%;
}
.pili-header .channel-icons .icon-bg--up>img {
  border-radius: 50%;
}
.pili-header .channel-icons .icon-bg__popular {
  background: #f07775;
}

.pili-header .pili-header__channel .right-channel-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.pili-header .pili-header__channel .channel-items__left {
  display: grid;
  width: 100%;
  grid-auto-flow: column;
  grid-column: span 4;
  grid-gap: 10px;
  grid-template-rows: repeat(2,1fr);
  border-right: 1px solid var(--line_regular);
  position: relative;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .pili-header__channel .channel-items__left {
    grid-template-columns: repeat(11, 1fr);
    padding-right: 30px;
  }
}

.pili-header .pili-header__channel .channel-items__right {
  grid-column: span 1;
  grid-row-gap: 10px;
  grid-auto-flow: column;
  display: grid;
  grid-template-rows: repeat(2,1fr);
  width: 168px;
  flex-shrink: 0;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .pili-header__channel .channel-items__right {
    width: 240px;
  }
}
.pili-header .pili-header__channel .channel-entry-more__link,
.pili-header .pili-header__channel .channel-link {
  display: inline-block;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  border: 1px solid var(--line_light);
  border-radius: 6px;
  background-color: var(--graph_bg_thin);
  color: var(--text2);
  text-align: center;
  transition: background-color .3s,color .3s;
  letter-spacing: 2px;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .pili-header__channel .channel-entry-more__link,
  .pili-header .pili-header__channel .channel-link {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
  }
}
.pili-header .pili-header__channel .channel-entry-more__link:hover,
.pili-header .pili-header__channel .channel-link:hover {
  background-color: var(--graph_bg_thick);
  color: var(--text1);
}
.pili-header .pili-header__channel .channel-entry-more__link--arrow {
  transition: transform .3s;
  transform: rotate(0);
}
.pili-header .pili-header__channel .channel-entry-more__link:hover .channel-entry-more__link--arrow {
  transform: rotate(180deg);
}
.pili-header .pili-header__channel .channel-entry-more__link span {
  user-select: none;
  cursor: pointer;
}

.pili-header .pili-header__channel .channel-link__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  color: var(--text2);
  text-align: center;
  font-weight: 400;
  transition: background-color .3s,color .3s;
  letter-spacing: 2px;
}
@media (min-width: 1367px) and (max-width: 1700px) {
  .pili-header .pili-header__channel .channel-link__right {
    height: 28px;
    font-size: 14px;
  }
}
.pili-header .pili-header__channel .channel-link__right:hover {
  color: var(--brand_blue);
}
.pili-header .pili-header__channel .channel-link__right:hover .side-icon {
  fill: var(--brand_blue);
}
.pili-header .pili-header__channel .channel-link__right .side-icon {
  margin-right: 4px;
  width: 20px;
  height: 20px;
  fill: var(--text2);
  transition: fill .3s;
}
</style>
