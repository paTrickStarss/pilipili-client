<script setup lang="ts">

import GlobalPopover from '@/components/global/GlobalPopover.vue'
import IconCollection from '@/components/icons/IconCollection.vue'
import CollectionPopoverTabItem from '@/components/navbar/collection/CollectionPopoverTabItem.vue'
import CollectionPopoverContentCard from '@/components/navbar/collection/CollectionPopoverContentCard.vue'
import IconVideoPlay from '@/components/icons/IconVideoPlay.vue'
</script>

<template>
  <GlobalPopover
    :content-style="{ marginTop: '0px', marginLeft: '-308px' }"
    content-class="header-favorite-popover"
  >
    <template #trigger>
      <a class="right-entry__outside" href="//message.pilibili.com" target="_blank">
        <IconCollection/>
        <span class="right-entry-text">收藏</span>
      </a>
    </template>

    <div class="favorite-panel-popover">
      <div class="favorite-panel-popover__nav">
        <CollectionPopoverTabItem :key="0" :title="`0`" :num="1" :active="true" />
        <CollectionPopoverTabItem
          v-for="i in 5" :key="i" :title="`${i}`" :num="i*10" :active="false" />
      </div>
      <div class="favorite-panel-popover__content">
        <div id="favorite-content-scroll" class="content-scroll">
          <CollectionPopoverContentCard
            v-for="i in 10" :key="i"
            :title="`标题${i}`" :name="`名称${i}`"
            :url="`#`" :img-url="`#`" :duration="`${i}:02`" />
        </div>
        <div class="content-bottom">
          <a target="_blank" href="#" class="content-bottom__btn content-bottom__btn--view">查看全部</a>
          <a target="_blank" href="#" class="content-bottom__btn content-bottom__btn--play">
            <p>
              <IconVideoPlay/>
              <span class="play-text">播放全部</span>
            </p>
          </a>
        </div>
      </div>
    </div>

  </GlobalPopover>
</template>

<style scoped>
.header-favorite-popover {
  overflow: hidden;
}
.favorite-panel-popover {
  display: flex;
  width: 520px;
  text-align: left;
}
.favorite-panel-popover__nav {
  overflow-y: auto;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 12px 0;
  width: 150px;
  height: 540px;
  border-right: 1px solid var(--line_regular);
  overscroll-behavior: none;
}
.favorite-panel-popover__content {
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  flex: 1 auto;
  box-sizing: border-box;
  height: 540px;
}
.favorite-panel-popover__content .content-scroll {
  overflow-y: auto;
  height: 493px;
  padding: 12px 0;
  overscroll-behavior: none;
}
.favorite-panel-popover__content .content-bottom {
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid var(--bg3);
}
.favorite-panel-popover__content .content-bottom__btn {
  flex: 1;
  height: 45px;
  color: var(--text1);
  text-align: center;
  font-size: 14px;
  line-height: 45px;
}
.favorite-panel-popover__content .content-bottom__btn--view {
  border-right: 1px solid var(--line_regular);
}
.favorite-panel-popover__content .content-bottom__btn--play {
  color: var(--brand_blue);
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
