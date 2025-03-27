<!--
  - Copyright (c) 2024-2025.  Bubble
  -->

<script setup lang="ts">
import IndexView from '@/views/index/IndexView.vue'
import { useVideoStore } from '@/stores/video'
import { onMounted, reactive, ref, watch } from 'vue'
import {
  InfoCircleOutlined,
  StopOutlined,
  LikeFilled,
  DollarCircleFilled,
  HeartFilled,
  ShareAltOutlined,
  DislikeFilled,
  LikeOutlined,
  DollarCircleOutlined,
  HeartOutlined,
  DislikeOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { type RouteParamValue, useRoute } from 'vue-router'
import type {
  CommentDTOType,
  UserInfoType,
  VideoDTOType,
  VideoStatisticsDTOType,
} from '@/types/ApiRespType'
import { DictionaryConverter } from '@/utils/DictionaryConverter'
import { message } from 'ant-design-vue'
import CommentCard from '@/components/video/CommentCard.vue'
import VideoPlayer from '@/components/video/player/VideoPlayer.vue'

const videoStore = useVideoStore()
const videoPageInfo = reactive(videoStore.videoPageInfo)

const route = useRoute()
watch(() => route.params.id, paramsChange, { immediate: true })

function paramsChange(id: RouteParamValue | RouteParamValue[]) {
  console.log('paramsChange', id)
  // TODO: 获取视频页数据
}

onMounted(() => {
  console.log('mounted', videoPageInfo)
})

const dicConverter = DictionaryConverter.instance

// interact button
const interactBtnLoading = reactive({
  like: false,
  coin: false,
  collect: false,
  share: false,
  dew: false,
})
const interactBtnStatus = reactive({
  like: false,
  coin: false,
  collect: false,
  share: false,
  dew: false,
})

function onLikeClick() {
  interactBtnLoading.like = true
  setTimeout(() => {
    demoVideoStatistics.favor++
    interactBtnStatus.like = !interactBtnStatus.like
    interactBtnLoading.like = false
  }, 1000)
}

function onCoinClick() {
  interactBtnLoading.coin = true
  setTimeout(() => {
    demoVideoStatistics.coin++
    interactBtnStatus.coin = !interactBtnStatus.coin
    interactBtnLoading.coin = false
  }, 1000)
}

function onCollectClick() {
  interactBtnLoading.collect = true
  setTimeout(() => {
    demoVideoStatistics.collect++
    interactBtnStatus.collect = !interactBtnStatus.collect
    interactBtnLoading.collect = false
  }, 1000)
}

function onShareClick() {
  interactBtnLoading.share = true
  setTimeout(() => {
    demoVideoStatistics.repost++
    interactBtnLoading.share = false
  }, 1000)
}

function onDewClick() {
  interactBtnLoading.dew = true
  setTimeout(() => {
    interactBtnStatus.dew = !interactBtnStatus.dew
    interactBtnLoading.dew = false
  }, 1000)
}

// comment area
const commentText = ref<string>('')
const publishCommentBtnLoading = ref<boolean>(false)

function onPublishCommentClick() {
  publishCommentBtnLoading.value = true
  setTimeout(() => {
    message.success(`publishComment${commentText.value}`)
    console.log('comment', commentText.value)
    commentText.value = ''
    publishCommentBtnLoading.value = false
  }, 1000)
}

// test
const demoVideoPageInfo = reactive<VideoDTOType>({
  vid: 566,
  uid: 233,
  title: 'demo Title Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur\n' +
    '          eaque ex facere magnam minima possimus ratione voluptate. Aliquam,\n' +
    '          assumenda aut doloribus exercitationem laudantium maxime numquam,\n' +
    '          perferendis reprehenderit soluta vero, voluptatem? Lorem ipsum dolor\n' +
    '          sit amet, consectetur adipisicing elit. Aliquid at, beatae eligendi\n' +
    '          harum impedit incidunt ipsum nostrum odit, pariatur quidem\n' +
    '          reprehenderit rerum. Atque autem porro, quaerat sapiente unde\n' +
    '          voluptates voluptatibus! Lorem ipsum dolor sit amet, consectetur\n' +
    '          adipisicing elit. Corporis cupiditate, doloribus eligendi expedita\n' +
    '          fuga impedit laudantium magni, minima necessitatibus obcaecati\n' +
    '          officiis praesentium quibusdam repellat sint sunt tempora tempore\n' +
    '          voluptatem voluptatum. Lorem ipsum dolor sit amet, consectetur\n' +
    '          adipisicing elit. Accusantium ad aperiam aut commodi culpa dolore\n' +
    '          dolores earum ex expedita explicabo fugiat, inventore itaque nam\n' +
    '          repellendus, rerum sit temporibus totam voluptates. Lorem ipsum dolor\n' +
    '          sit amet, consectetur adipisicing elit. Ad, distinctio ducimus eum\n' +
    '          fuga id ipsum nemo nulla officiis pariatur perferendis possimus quas\n' +
    '          rerum vel. Aperiam et itaque nobis officia sit?',
  coverUrl: 'src/assets/image/cover-1.jpg',
  contentUrl: '',
  duration: 66,
  sourceType: 0,
  reprintPermit: 1,
  tag: ['demo', 'hahaha', 'abracadebra'],
  status: 1,
  publishDate: '2024-12-27 11:21',
})
const demoVideoStatistics = reactive<VideoStatisticsDTOType>({
  vid: 566,
  favor: 18655,
  coin: 2876,
  collect: 2694,
  repost: 537,
})
const demoCommentInfo = reactive<CommentDTOType>({
  id: 2,
  toId: 1,
  uid: 233,
  username: 'Bernice White',
  vid: 566,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam debitis deserunt dicta doloremque error hic libero molestiae, necessitatibus numquam officiis porro recusandae reprehenderit sapiente similique, sint veniam voluptate voluptatum.',
  like: 0,
  createDate: '2024-12-27 16:62',
})
/*const demoUserInfo = reactive<UserInfoType>({
  uid: 233,
  nickname: 'Patrick',
  gender: 1,
  avatarUrl: '',
  backgroundUrl: '',
  email: '23591013fas@gmail.com',
  description: 'haifhdifsai',
  vipStatus: 1,
  authority: 0,
  authorityDesc: '',
  validStatus: 1,
  role: 0,
  exp: 153473,
  hcoin: 45,
  pcoin: 4,
})*/
</script>

<template>
  <IndexView>
    <div class="container">
      <!--      主内容区域-->
      <div class="main-content">
        <!--        标题栏-->
        <div class="title-area">
          <div class="main-title">
            <p>{{ demoVideoPageInfo.title || '--' }}</p>
          </div>
          <div class="subtitle-area">
            <!--            来源类型及转载声明-->
            <span style="margin-inline-end: 10px">
              <InfoCircleOutlined />
              {{ dicConverter.getSourceTypeName(demoVideoPageInfo.sourceType) }}
            </span>
            <span
              v-if="demoVideoPageInfo.reprintPermit == 1"
              style="color: indianred; margin-inline: 2px"
              ><StopOutlined
            /></span>
            <span>
              {{
                dicConverter.getReprintPermitMsg(
                  demoVideoPageInfo.reprintPermit,
                ) || '--'
              }}
            </span>

            <!--            发布日期-->
<!--            <span style="color: darkgrey; margin-inline: 20px">{{-->
<!--              demoVideoPageInfo.publishDate-->
<!--            }}</span>-->
          </div>
        </div>

        <!--        播放器-->
        <div class="video-player">
<!--          <a-skeleton :paragraph="{ rows: 12 }" />-->
          <video-player />
        </div>

        <!--        互动按钮-->
        <div class="interact-area">
          <div class="interact-btn-container">
            <a-button
              class="interact-btn"
              :loading="interactBtnLoading.like"
              type="link"
              shape="circle"
              size="large"
              title="点赞"
              @click="onLikeClick"
            >
              <template #icon>
                <LikeFilled v-if="interactBtnStatus.like" />
                <LikeOutlined v-else />
              </template>
              Like
            </a-button>
            <span class="video-statistics-number">{{
              demoVideoStatistics.favor
            }}</span>
          </div>

          <div class="interact-btn-container">
            <a-button
              class="interact-btn"
              :loading="interactBtnLoading.coin"
              type="link"
              shape="circle"
              size="large"
              title="投币"
              @click="onCoinClick"
            >
              <template #icon>
                <DollarCircleFilled v-if="interactBtnStatus.coin" />
                <DollarCircleOutlined v-else />
              </template>
              Coin
            </a-button>
            <span class="video-statistics-number">{{
              demoVideoStatistics.coin
            }}</span>
          </div>

          <div class="interact-btn-container">
            <a-button
              class="interact-btn"
              :loading="interactBtnLoading.collect"
              type="link"
              shape="circle"
              size="large"
              title="收藏"
              @click="onCollectClick"
            >
              <template #icon>
                <HeartFilled v-if="interactBtnStatus.collect" />
                <HeartOutlined v-else />
              </template>
              Collect
            </a-button>
            <span class="video-statistics-number">{{
              demoVideoStatistics.collect
            }}</span>
          </div>

          <div class="interact-btn-container">
            <a-button
              class="interact-btn"
              :loading="interactBtnLoading.share"
              type="link"
              shape="circle"
              size="large"
              title="分享"
              @click="onShareClick"
            >
              <template #icon>
                <ShareAltOutlined />
              </template>
              Share
            </a-button>
            <span class="video-statistics-number">{{
              demoVideoStatistics.repost
            }}</span>
          </div>

          <div class="interact-btn-container">
            <a-button
              class="interact-btn"
              :loading="interactBtnLoading.dew"
              type="link"
              shape="circle"
              size="large"
              title="踩！"
              @click="onDewClick"
            >
              <template #icon>
                <DislikeFilled v-if="interactBtnStatus.dew" />
                <DislikeOutlined v-else />
              </template>
              Dew!
            </a-button>
          </div>
        </div>

        <!--        简介-->
        <div class="video-desc">
          <a-typography-paragraph
            :ellipsis="{ rows: 3, expandable: true, symbol: 'more' }"
            :content="demoVideoPageInfo.description"
          />
        </div>

        <!--        评论区-->
        <div class="comment-area">
          <!--          发表评论区域-->
          <div class="comment-publish-area">
            <a-avatar :size="48" style="background-color: #66ccff">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <a-textarea
              v-model:value="commentText"
              placeholder="键入评论内容进行一个评论的发送..."
              :maxlength="2048"
              show-count
              allow-clear
              @pressEnter="onPublishCommentClick"
              style="margin-inline: 25px; width: 80%"
            />
            <a-button
              :loading="publishCommentBtnLoading"
              type="primary"
              @click="onPublishCommentClick"
            >
              发布评论
            </a-button>
          </div>

          <!--          评论列表-->
          <div class="comment-list-area">
            <CommentCard
              v-for="i in Array(10)"
              :key="i"
              :comment-info="demoCommentInfo"
            />
          </div>
        </div>
      </div>

      <!--      右侧内容区域-->
      <div class="side-content">
        <!--        作者信息-->
        <div class="author-info">
<!--          <p>{{ demoUserInfo.nickname || '&#45;&#45;' }}</p>-->
        </div>

        <!--        弹幕列表-->
        <div class="bullet-list"></div>

        <!--        合集列表-->
        <div class="compilation-list"></div>

        <!--        推荐列表-->
        <div class="recommend-list"></div>
      </div>
    </div>
  </IndexView>
</template>

<style scoped>
.container {
  display: flex;
  margin: 50px 30px;
  height: 100%;
}

.main-content {
  margin-top: 20px;
  padding: 0 30px;
  width: 1000px;
}

.title-area {
  padding: 15px 0;
}

.main-title {
  font-size: 1.4em;
}

.subtitle-area {
  color: grey;
}

.video-player {
}

.interact-area {
  display: flex;
  padding: 10px 20px;
}

.interact-btn-container {
  display: flex;
  flex-direction: column;
}

.interact-btn {
  margin-inline-end: 52px;
  color: grey;
}

.video-statistics-number {
  color: grey;
  margin-inline-start: 10px;
}

.video-desc {
  margin-top: 20px;
}

.comment-area {
  margin: 20px 10px;
}

.comment-publish-area {
  display: flex;
}
</style>
