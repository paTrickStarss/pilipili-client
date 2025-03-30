<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  content: String
})

const showMore = ref<boolean>(false)
const defaultHeight = ref<number>(48)

</script>

<template>
  <div id="v_desc" class="video-desc-container">
    <div class="basic-desc-info"
         :style="{ height: showMore? `auto`:`${defaultHeight}px` }"
    >
      <span class="desc-info-text" style="white-space: pre-wrap;">
        {{ content }}
      </span>
    </div>
    <div class="toggle-btn" @click="showMore = !showMore">
      <span class="toggle-btn-text">
        {{ showMore? '收起':'展开更多' }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.video-desc-container {
  margin: 16px 0;
}
.video-desc-container .basic-desc-info {
  white-space: pre-line;
  letter-spacing: 0;
  color: var(--text1);
  font-size: 15px;
  line-height: 24px;
  overflow: hidden;
  word-break: break-all;
  line-break: anywhere;
}
.video-desc-container .toggle-btn {
  margin-top: 10px;
  font-size: 13px;
  line-height: 18px;
}
.video-desc-container .toggle-btn-text {
  cursor: pointer;
  color: var(--text2);
}

</style>
