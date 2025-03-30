<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">


import { computed, onMounted, ref } from 'vue'
import VideoCommentAvatar from '@/components/video/comment/VideoCommentAvatar.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import BiliRichText from '@/components/video/comment/BiliRichText.vue'
import VideoCommentListItemFooter from '@/components/video/comment/VideoCommentListItemFooter.vue'
import { message } from 'ant-design-vue'
import { DateTimeUtil } from '@/utils/DateTimeUtil'
import VideoCommentUserInfo from '@/components/video/comment/VideoCommentUserInfo.vue'
import VideoCommentReplyItem from '@/components/video/comment/VideoCommentReplyItem.vue'
import VideoCommentReplyPagination from '@/components/video/comment/VideoCommentReplyPagination.vue'

const userInfo = ref({
  uid: 1003,
  nickname: '用户的环境佛',
  level: 6,
})
const content = ref<string>('虽然拉了个大的，但冲厕所的声音好汀')
const datetime = ref<string>(
  DateTimeUtil.instance.getDateTime('2025-1-23 15:32:23', 'YYYY-MM-DD HH:mm'))
const likeCount = ref(1076)

const showMoreReply = ref<boolean>(false)
const replyList = ref<string[]>([])
const replyListRender = computed<Array<string>>(() => {
  if (!showMoreReply.value && replyList.value.length > 2) {
    return replyList.value.slice(0, 2)
  }
  return replyList.value.slice(0, 10)
})

const replyPagination = ref({
  pageNo: 1,
  pageSize: 10,
  total: 45
})
function pageQuery(pageNo: number, pageSize: number) {
  message.info(`分页查询第${pageNo}页，页大小${pageSize}`)
  replyPagination.value.pageNo = pageNo
  replyPagination.value.pageSize = pageSize
}

function handleLike() {
  message.info('点赞')
}
function handleDislike() {
  message.info('点踩')
}
function openReplyBox() {
  message.info('打开回复框')
}
function block() {
  message.info('加入黑名单')
}
function accuse() {
  message.info('举报')
}

onMounted(() => {
  for (let i = 0; i < 120; i++) {
    replyList.value.push((i + 1).toString())
  }
  replyPagination.value.total = replyList.value.length
})
</script>

<template>
  <div>
    <div id="comment">
      <div class="body light">
        <a class="user-avatar" :href="`/space/${userInfo.uid}`" target="_blank">
          <video-comment-avatar style="transform: scale(80%)" />
        </a>

        <div class="main">
<!--          头部：用户名称、等级-->
          <div class="header">
            <video-comment-user-info :user-info="userInfo" />
          </div>

<!--          评论内容-->
          <div class="content">
            <bili-rich-text class="text" :content="content" />
          </div>

          <video-comment-list-item-footer
            id="footer"
            :datetime="datetime"
            :like-count="likeCount"
            @like="handleLike"
            @dislike="handleDislike"
            @reply="openReplyBox"
            @block="block"
            @accuse="accuse"
          />
        </div>
      </div>
    </div>

    <div id="replies">
      <div class="expander">
        <div class="expander-contents">
          <video-comment-reply-item
            v-for="item in replyListRender"
            :key="item"
          />
          <div class="expander-footer">

            <video-comment-reply-pagination
              :pagination="replyPagination"
              @query="pageQuery"
              v-if="showMoreReply"
            >
              <template #foot>
              <span class="button__label" @click="showMoreReply = false">
                收起
              </span>
              </template>
            </video-comment-reply-pagination>

            <div class="view-more" v-else>
              <span>共&nbsp;{{ replyList.length }}&nbsp;条回复，</span>
              <span class="button__label" @click="showMoreReply = true">
                点击查看
              </span>
            </div>


          </div>
        </div>
      </div>
    </div>
    <div id="reply-container"></div>
    <div class="div"></div>
  </div>
</template>

<style scoped>
.body {
  position: relative;
  padding-left: 80px;
  padding-top: 22px;
  --bili-comment-hover-more-display: none;
}
.user-avatar {
  position: absolute;
  left: 20px;
  top: 22px;
  width: 48px;
  height: 48px;
  transform-origin: left top;
  transform: var(--bili-comments-avatar-size);
}
.main {
  width: 100%;
}
.header {
  margin-bottom: 4px;
}

.content {
  width: 100%;
  display: block;
  overflow: hidden;
}
.content {
  font-size: var(--bili-comments-font-size-content);
  line-height: var(--bili-comments-line-height-content);
  color: var(--text1);
}
.content .text {
  --bili-rich-text-font-size: var(--bili-comments-font-size-content);
  --bili-rich-text-line-height: var(--bili-comments-line-height-content);
  --bili-rich-text-link-color: var(--Lb6);
  --bili-rich-text-display: inline;
}

#footer {
  padding-right: 8px;
}


.expander {
  padding-left: 80px;
  margin-top: 2px;
}
.expander-contents {
  position: relative;
}
.expander-footer .view-more {
  font-size: 13px;
  color: var(--text3);
}
.expander-footer .button__label {
  cursor: pointer;
  transition: color .2s;
}
.expander-footer .button__label:hover {
  color: #00a1d6;
}



.div {
  padding-bottom: 14px;
  margin-left: 80px;
  border-bottom: 1px solid var(--graph_bg_thick);
}

</style>
