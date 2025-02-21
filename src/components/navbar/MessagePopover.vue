<script setup lang="ts">

import GlobalPopover from '@/components/global/GlobalPopover.vue'
import IconMessageBox from '@/components/icons/IconMessageBox.vue'
</script>

<template>
  <GlobalPopover wrap-class="right-entry__outside right-entry--message">
   <template #trigger>
<!--     <div class="red-point&#45;&#45;message"></div>-->
     <div class="red-num--message">2</div>
     <a class="right-entry__outside" href="//message.bilibili.com" target="_blank">
       <IconMessageBox/>
       <span class="right-entry-text">消息</span>
     </a>
   </template>

    <div class="message-entry-popover">
      <div class="message-inner-list">
        <a href="#" class="message-inner-list__item">回复我的</a>
        <a href="#" class="message-inner-list__item">@我的</a>
        <a href="#" class="message-inner-list__item">收到的赞</a>
        <a href="#" class="message-inner-list__item">系统消息</a>
        <a href="#" class="message-inner-list__item">我的消息</a>
      </div>
    </div>
  </GlobalPopover>
</template>

<style scoped>
.message-entry-popover {
  overflow: hidden;
  width: 142px;
  border-radius: 8px;
}
.message-entry-popover .message-inner-list {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}
.message-entry-popover .message-inner-list__item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 0 15px 27px;
  color: var(--text2);
  text-align: left;
  font-size: 14px;
  transition: background-color .3s;
}
.message-entry-popover .message-inner-list__item:hover {
  background-color: var(--Ga2);
}


</style>
