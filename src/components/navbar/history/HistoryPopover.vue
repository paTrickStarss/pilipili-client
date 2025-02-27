<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import GlobalPopover from '@/components/global/GlobalPopover.vue'
import IconHistory from '@/components/icons/IconHistory.vue'
import { ref } from 'vue'
import TabItem from '@/components/navbar/TabItem.vue'
import HistoryVideoCard from '@/components/navbar/history/HistoryVideoCard.vue'

const activeTab = ref<number>(1)
</script>

<template>
  <GlobalPopover
    wrap-class="right-entry-item"
    :content-style="{ marginTop: '0', marginLeft: '-150px' }"
  >
    <template #trigger>
      <a
        class="right-entry__outside"
        href="//message.pilibili.com"
        target="_blank"
      >
        <IconHistory />
        <span class="right-entry-text">历史</span>
      </a>
    </template>

    <div class="history-panel-popover">
      <div class="header-tabs-panel">
        <TabItem title="视频" :index="1" v-model:active-tab="activeTab" />
        <TabItem title="直播" :index="2" v-model:active-tab="activeTab" />
        <TabItem title="专栏" :index="3" v-model:active-tab="activeTab" />
      </div>
      <div class="header-tabs-panel__content">
        <div>
          <p class="header-tabs-panel__content--date">今天</p>
          <HistoryVideoCard
            v-for="i in 5"
            :key="i"
            :title="`视频${i}`"
            :date-time="`今天18:35`"
            :duration="`9:00/12:00`"
            :is-mobile="true"
            :user-name="`Patrick`"
            :progress="75"
          />
        </div>
        <div>
          <p class="header-tabs-panel__content--date">昨天</p>
          <HistoryVideoCard
            v-for="i in 2"
            :key="i"
            :title="`视频${i}`"
            :date-time="`今天18:35`"
            :duration="`9:00/12:00`"
            :is-mobile="false"
            :user-name="`Patrick`"
            :progress="75"
          />
        </div>
        <div>
          <p class="header-tabs-panel__content--date">更早</p>
          <HistoryVideoCard
            v-for="i in 10"
            :key="i"
            :title="`视频${i}`"
            :date-time="`今天18:35`"
            :duration="`9:00/12:00`"
            :is-mobile="false"
            :user-name="`Patrick`"
            :progress="75"
          />
        </div>
      </div>
    </div>
  </GlobalPopover>
</template>

<style scoped>
.history-panel-popover {
  width: 370px;
  height: 540px;
}

.history-panel-popover .header-tabs-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line_regular);
}

.history-panel-popover .header-tabs-panel__content {
  overflow-y: auto;
  height: 480px;
  text-align: left;
  overscroll-behavior: none;
}

.history-panel-popover .header-tabs-panel__content--date {
  margin-top: 12px;
  margin-bottom: 5px;
  padding: 0 20px;
  color: var(--text1);
  font-size: 14px;
  line-height: 16px;
}
</style>
