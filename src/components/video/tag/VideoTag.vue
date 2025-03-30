<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import { ref } from 'vue'
import IconShowMore from '@/components/icons/IconShowMore.vue'

defineProps({
  tagList: {
    type: Array as () => string[],
    required: true
  },
})
const showMoreLength = ref<number>(7)
</script>

<template>
  <div class="video-tag-container">
    <div class="tag-panel">
      <div
        class="tag not-btn-tag"
        v-for="tag in tagList"
        :key="tag"
      >
        <div class="ordinary-tag">
<!--          todo: 根据标签内容进行查询-->
          <a :href="`/search/${tag}`" target="_blank" class="tag-link">
            {{ tag }}
          </a>
        </div>
      </div>

      <div class="tag" v-show="tagList.length > showMoreLength">
        <div class="show-more-btn">
          <IconShowMore />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-tag-container {
  padding-bottom: 6px;
  margin: 16px 0 20px 0;
  border-bottom: 1px solid var(--line_regular);
}
.video-tag-container .tag-panel {
  transition: height 0.3s;
  overflow: hidden;
}
.video-tag-container .tag-panel .tag {
  float: left;
  margin: 0 12px 8px 0;
}
.video-tag-container .tag-panel .tag-link {
  color: var(--text2);
  background: var(--graph_bg_regular);
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  font-size: 13px;
  padding: 0 12px;
  box-sizing: border-box;
  transition: all .3s;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.video-tag-container .tag-panel .tag-link:hover {
  color: #00a1d6;
}
.video-tag-container .tag-panel .tag .show-more-btn {
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  background: var(--graph_bg_regular);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--graph_icon);
}

</style>
