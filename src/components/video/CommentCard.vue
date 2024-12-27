<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { UserOutlined, LikeOutlined, DislikeOutlined, CommentOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons-vue'
import type { CommentCardInfoType } from '@/types/PropsType'
import { onMounted, reactive, ref } from 'vue'
import type { CommentDTOType } from '@/types/ApiRespType'

const props = defineProps<CommentCardInfoType>()

onMounted(() => {
  console.log('mounted', props.commentInfo)
})

const interactStatus = reactive({
  like: false,
  dislike: false,
})
const loadingStatus = reactive({
  like: false,
  dislike: false,
})
async function onLikeClick() {
  loadingStatus.like = true
  setTimeout(() => {
    interactStatus.like = !interactStatus.like
    loadingStatus.like = false
  }, 500)
}
async function onDisLikeClick() {
  loadingStatus.dislike = true
  setTimeout(() => {
    interactStatus.dislike = !interactStatus.dislike
    loadingStatus.dislike = false
  }, 500)
}

</script>

<template>
  <div class="comment-card-container">
<!--    评论用户信息-->
    <div class="comment-user-container">
      <a-avatar
        :size="36"
        style="background-color: #66ccff"
      >
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <span style="margin-inline: 10px; font-size: 1.2em;">{{commentInfo.username}}</span>
    </div>

<!--    评论内容-->
    <div class="comment-content">
      <a-typography-paragraph
        :ellipsis="{ rows: 3, expandable: true, symbol: 'more' }"
        :content="commentInfo.content"
      />
    </div>

<!--    功能区-->
    <div class="interact-area">
      <a-button
        :loading="loadingStatus.like"
        class="interact-btn"
        type="link"
        shape="circle"
        title="点赞"
        @click="onLikeClick"
      >
        <template #icon>
          <LikeFilled v-if="interactStatus.like"/>
          <LikeOutlined v-else/>
        </template>
      </a-button>
      <a-button
        :loading="loadingStatus.dislike"
        class="interact-btn"
        type="link"
        shape="circle"
        title="踩！"
        @click="onDisLikeClick"
      >
        <template #icon>
          <DislikeFilled v-if="interactStatus.dislike"/>
          <DislikeOutlined v-else/>
        </template>
      </a-button>
      <a-button
        class="interact-btn"
        type="link"
        shape="circle"
        title="评论"
      >
        <template #icon>
          <CommentOutlined/>
        </template>
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.comment-card-container {
  margin: 30px 20px;
}
.comment-user-container {
  display: flex;
  align-items: flex-end;
}

.comment-content {
  margin: 10px 45px;
}

.interact-area {
  margin: 10px 45px;
}
.interact-btn {
  color: grey;
}
</style>
