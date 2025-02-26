<script setup lang="ts">

import GlobalPopover from '@/components/global/GlobalPopover.vue'
import IconDynamic from '@/components/icons/IconDynamic.vue'
import IconArrowMoreRight from '@/components/icons/IconArrowMoreRight.vue'
import DynamicPopoverListItem from '@/components/navbar/dynamic/DynamicPopoverListItem.vue'
</script>

<template>
  <GlobalPopover
    :content-style="{ marginTop: '0px', marginLeft: '-88px' }">
    <template #trigger>
      <a class="right-entry__outside" href="//message.pilibili.com" target="_blank">
        <IconDynamic/>
        <span class="right-entry-text">动态</span>
      </a>
    </template>

    <div class="dynamic-panel-popover">
      <div id="piliHeaderDynScrollCon" class="header-tabs-panel__content">
        <div class="header-content-panel">
          <div class="dynamic-header">
            <a class="dynamic-header__title" href="#" target="_blank">正在直播</a>
            <a class="dynamic-header__more" href="#" target="_blank">
              查看更多<IconArrowMoreRight/>
            </a>
          </div>
          <div class="living-up-list">
            <a class="up-item" target="_blank" href="https://live.pilibili.com/4421957?live_from=82002" style="transform: translateX(0px);">
              <div class="up-avatar">
                <picture class="v-img up-avatar__img">
                  <source srcset="//i1.hdslb.com/bfs/face/208975fb071320fcfac52ac40a262e8ebbe6b81e.jpg@84w_84h.avif" type="image/avif">
                  <source srcset="//i1.hdslb.com/bfs/face/208975fb071320fcfac52ac40a262e8ebbe6b81e.jpg@84w_84h.webp" type="image/webp">
                  <img src="//i1.hdslb.com/bfs/face/208975fb071320fcfac52ac40a262e8ebbe6b81e.jpg@84w_84h" alt="" loading="lazy">
                </picture>
              </div>
              <div>
                <div class="up-name">丿丶夜曦</div>
              </div>
            </a>
          </div>
          <div class="dynamic-all">
            <div class="split-line">
              <div class="history-tip">历史动态</div>
            </div>

            <DynamicPopoverListItem v-for="i in 10" :key="i"/>
          </div>
        </div>
      </div>
    </div>
  </GlobalPopover>
</template>

<style scoped>

.dynamic-panel-popover {
  width: 370px;
}
.dynamic-panel-popover .header-tabs-panel__content {
  min-height: 172px;
  max-height: 540px;
  overflow-y: auto;
  text-align: left;
  overscroll-behavior: none;
}
.dynamic-header {
  padding: 20px 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dynamic-header__title {
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}
.dynamic-header__more {
  color: var(--text1);
  font-size: 12px;
  line-height: 22px;
  display: flex;
  align-items: center;
}
.living-up-list {
  margin-bottom: 10px;
  margin-left: 20px;
  display: flex;
  overflow: hidden;
}
.up-item {
  width: 67px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  flex: 0 0 auto;
  transition: transform .35s;
}
.up-item .up-avatar {
  position: relative;
  padding: 2px;
  margin-top: 12px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--graph_bg_regular);
  border: 2px solid var(--brand_pink);
  cursor: pointer;
  transition: transform .3s;
}

.up-item .up-avatar__img {
  overflow: hidden;
  border-radius: 50%;
}
.up-item .up-name {
  width: 67px;
  margin-top: 4px;
  font-size: 12px;
  line-height: 17px;
  color: var(--text2);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.dynamic-all .split-line {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text3);
  font-size: 12px;
  margin: 6px 20px;
}
.dynamic-all .split-line:before {
  content: "";
  display: block;
  width: 100%;
  border-top: 1px solid var(--line_regular);
  position: absolute;
  top: 8px;
  left: 0;
}
.dynamic-all .history-tip {
  background: var(--bg1_float);
  padding: 0 10px;
  z-index: 1;
}
.dynamic-all a {
  text-indent: inherit;
}


</style>
