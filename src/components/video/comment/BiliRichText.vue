<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

defineProps({
  content: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <p id="contents">
<!--    todo: 解析文本中的emoji、图片表情、热词查询链接等内容-->
    <span>{{ content }}</span>
  </p>
</template>

<style scoped>
#contents {
  --bili-rich-text-display: block;
  --bili-rich-text-white-space: pre-line;
  --bili-rich-text-word-break: break-word;
  --bili-rich-text-icon-vertical-align: sub;
  --bili-rich-text-link-color: var(--text_link, #008AC5);
  --bili-rich-text-link-color-hover: var(--brand_blue, #00AEEC);
  --icon-vertical-align: var(--bili-rich-text-icon-vertical-align);
  color: var(--bili-rich-text-color, var(--text1, #18191C));
  font-size: var(--bili-rich-text-font-size, 15px);
  line-height: var(--bili-rich-text-line-height, 21px);
  font-family: var(--bili-font-family);
}

#contents {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  display: var(--bili-rich-text-display);
  white-space: var(--bili-rich-text-white-space);
  word-break: var(--bili-rich-text-word-break);
  -webkit-font-smoothing: antialiased;
}
#contents a {
  color: var(--bili-rich-text-link-color);
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
}

#contents a:hover {
  color: var(--bili-rich-text-link-color-hover);
}

#contents a bili-icon {
  vertical-align: var(--bili-rich-text-icon-vertical-align);
}
#contents img, #contents a i {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  vertical-align: var(--bili-rich-text-icon-vertical-align);
}


</style>
