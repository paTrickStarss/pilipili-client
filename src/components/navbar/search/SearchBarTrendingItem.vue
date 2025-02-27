<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import { message } from 'ant-design-vue'

const props = defineProps({
  title: String,
  rank: {
    type: Number,
    default: 0,
  },
  isHot: Boolean,
})

const markSrc = ref<string>('')

function goSearch() {
  message.info(`goSearch: ${props.title}`)
}

onMounted(() => {
  if (props.isHot) {
    markSrc.value = 'search-hot.png'
  }
})
</script>

<template>
  <div class="trending-item" tabindex="0" @click="goSearch">
    <div class="trending-rank" :class="{ 'search-rank-top': rank <= 3 }">
      {{ rank }}
    </div>
    <div class="trending-text">
      {{ title }}
    </div>
    <img
      class="trending-mark"
      :src="`${ASSETS_BASE_URL}/icons/${markSrc}`"
      alt=""
    />
  </div>
</template>

<style scoped>
.pili-header .trending-item {
  box-sizing: border-box;
  height: 38px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 16px;
  transition: background-color 0.3s;
}

.pili-header .trending-item:hover {
  background-color: var(--graph_bg_thick);
}

.pili-header .trending-item .trending-rank {
  font-family:
    PingFang SC,
    HarmonyOS Sans SC,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
  font-weight: 500;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
}

.pili-header .trending-item .trending-rank {
  width: 15px;
  min-width: 15px;
  height: 17px;
  line-height: 17px;
  text-align: center;
  font-size: 14px;
  margin-right: 7px;
  color: var(--text3);
}

.pili-header .trending-item .trending-rank.search-rank-top {
  color: var(--text1);
}

.pili-header .trending-item .trending-text {
  font-size: 14px;
  line-height: 17px;
  height: 17px;
  margin-right: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0;
}

.pili-header .trending-item .trending-mark {
  height: 14px;
  margin-right: 16px;
}
</style>
