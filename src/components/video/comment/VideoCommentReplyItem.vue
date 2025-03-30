<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'
import VideoCommentUserInfo from '@/components/video/comment/VideoCommentUserInfo.vue'
import BiliRichText from '@/components/video/comment/BiliRichText.vue'
import VideoCommentListItemFooter from '@/components/video/comment/VideoCommentListItemFooter.vue'
import { DateTimeUtil } from '@/utils/DateTimeUtil'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import { message } from 'ant-design-vue'

const userInfo = ref({
  uid: 1003,
  nickname: '用户的环境佛',
  level: 6,
})
const avatarUrl = ref(`${ASSETS_BASE_URL}/image/avatar-patrick.jpg@96w_96h_1c_1s.avif`)
const content = ref<string>('神人比喻')
const datetime = ref<string>(
  DateTimeUtil.instance.getDateTime('2025-1-25 21:45:11', 'YYYY-MM-DD HH:mm'))
const likeCount = ref<number>(12)

function handleLike() {
  message.info('点赞')
}
function handleDislike() {
  message.info('点踩')
}
function handleReply() {
  message.info('回复')
}
function handleBlock() {
  message.info('拉黑')
}
function handleAccuse() {
  message.info('举报')
}
</script>

<template>
  <div id="body">
    <div class="main">
      <video-comment-user-info :user-info="userInfo" />
      <a class="user-avatar" :href="`/space/${userInfo.uid}`" target="_blank">
        <img width="24" height="24" :src="avatarUrl" alt="">
      </a>
      <bili-rich-text
        :content="content"
        style="--bili-rich-text-line-height: 24px;--bili-rich-text-link-color: var(--Lb6);--bili-rich-text-display: inline;"
      />
    </div>
    <video-comment-list-item-footer
      id="footer"
      :datetime="datetime"
      :likeCount="likeCount"
      @like="handleLike"
      @dislike="handleDislike"
      @block="handleBlock"
      @reply="handleReply"
      @accuse="handleAccuse"
    />
  </div>
</template>

<style scoped>
#body {
  --bili-comment-spotlight-color: var(--brand_blue_thin);
}
#body {
  position: relative;
  padding: 8px 0 8px 34px;
  border-radius: 4px;
  --bili-comment-hover-more-display: none;
}
.main {
  width: 100%;
  display: block;
  overflow: hidden;
}
.user-avatar {
  position: absolute;
  left: 0;
  width: 24px;
  height: 24px;
}
.user-avatar img {
  border-radius: 50%;
}
#footer {
  padding-right: 20px;
}

</style>
