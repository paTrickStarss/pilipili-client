<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import { ref } from 'vue'
import IconInteractLike from '@/components/icons/IconInteractLike.vue'
import IconInteractDislike from '@/components/icons/IconInteractDislike.vue'
import IconInteractMenu from '@/components/icons/IconInteractMenu.vue'

defineProps({
  datetime: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    required: true,
  },
})
defineEmits({
  /**
   * 点赞
   */
  like: () => true,
  /**
   * 不喜欢
   */
  dislike: () => true,
  /**
   * 回复
   */
  reply: () => true,
  /**
   * 拉黑
   */
  block: () => true,
  /**
   * 举报
   */
  accuse: () => true,
})

const showMenu = ref<boolean>(false)
const showMoreIcon = ref<boolean>(false)
</script>

<template>
  <div
    class="root"
    @mouseenter="showMoreIcon = true"
    @mouseleave="showMoreIcon = false"
  >

    <div class="pubdate">{{ datetime }}</div>

    <div class="like">
      <button @click="$emit('like')">
        <IconInteractLike />
        <span class="count">
          {{ likeCount }}
        </span>
      </button>
    </div>

    <div class="dislike">
      <button @click="$emit('dislike')">
        <IconInteractDislike />
      </button>
    </div>

    <div class="reply">
      <button @click="$emit('reply')">回复</button>
    </div>

    <div
      class="more"
      tabindex="0"
      @focus="showMenu = true"
      @blur="showMenu = false"
    >
      <button
        :style="{ opacity: showMoreIcon ? '1' : '0' }"
        @click="showMenu = !showMenu"
      >
        <IconInteractMenu />
      </button>
      <ul class="options" v-show="showMenu" @mouseleave="showMenu = false">
        <li @click="$emit('block')">加入黑名单</li>
        <li @click="$emit('accuse')">举报</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.root {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 3px;
  font-size: 13px;
  color: var(--text3);
}
.root > :not(:first-child):not(:last-child) {
  margin-left: 20px;
}

button {
  padding: 0;
  outline: none;
  border: none;
  background: transparent;
  height: 24px;
  font-size: 13px;
  color: var(--text3);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
button .bili-icon {
  vertical-align: middle;
}
button span {
  margin-left: 5px;
  display: inline-block;
}

.more {
  margin-left: auto;
  margin-right: 20px;
  width: 24px;
  height: 24px;
  position: relative;
  transition: opacity .3s;
  --bili-comment-menu-display: none;
  --bili-comment-menu-position: absolute;
  --bili-comment-menu-top: 20px;
  --bili-comment-menu-right: 0;
}
.more button {
  transition: opacity .3s;
}
.more .options {
/*  display: var(--bili-comment-menu-display);*/
  position: var(--bili-comment-menu-position);
  top: var(--bili-comment-menu-top);
  right: var(--bili-comment-menu-right);
  margin: 0;
  padding: 0;
  z-index: 10;
  width: 120px;
  list-style: none;
  border-radius: 4px;
  font-size: 14px;
  color: var(--text2);
  background-color: var(--bg1_float);
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 5px;
  overflow: hidden;
}
.more .options li {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 15px;
  cursor: pointer;
  user-select: none;
  transition: background-color .3s;
}
.more .options li:hover {
  background-color: var(--graph_bg_thick);
}


</style>
