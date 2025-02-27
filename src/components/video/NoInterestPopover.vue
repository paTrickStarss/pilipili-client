<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import GlobalPopover from '@/components/global/GlobalPopover.vue'
import IconTinyMenu from '@/components/icons/IconTinyMenu.vue'
</script>

<template>
  <GlobalPopover
    class="popover-wrap"
    :content-style="{
      'margin-top': '-10px',
      'margin-left': '-100px',
      'z-index': '1000',
    }"
  >
    <template #trigger>
      <IconTinyMenu class="pili-video-card__info--no-interest--icon" />
    </template>

    <div class="no-interest-popover">
      <div class="no-interest-inner-list">
        <a href="#" class="no-interest-inner-list__item">内容不感兴趣</a>
        <a href="#" class="no-interest-inner-list__item">不想看此UP主</a>
      </div>
    </div>
  </GlobalPopover>
</template>

<style scoped>
.popover-wrap {
  display: block;
}

.no-interest-popover {
  overflow: hidden;
  width: 142px;
  border-radius: 8px;
}

.no-interest-popover .no-interest-inner-list {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.no-interest-popover .no-interest-inner-list__item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 0 15px 27px;
  color: var(--text2);
  text-align: left;
  font-size: 14px;
  transition: background-color 0.3s;
}

.no-interest-popover .no-interest-inner-list__item:hover {
  background-color: var(--Ga2);
}
</style>
