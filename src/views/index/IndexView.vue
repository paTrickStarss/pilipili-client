<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, useTemplateRef } from 'vue'
import NavBar from '@/components/navbar/NavBar.vue'
import VideoInfoCard from '@/components/video/VideoInfoCard.vue'
import {
  PlusOutlined,
  RedoOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type {
  CarouselInfoType,
  VideoCardFlowInfoType,
  VideoCardInfoType,
} from '@/utils/PropsType'
import { deepCopy, openLink, randomInt } from '@/utils/CommonUtil'

// 轮播图
const carouselList = ref<Array<CarouselInfoType>>([])
const loadCarouselList = (size: number) => {
  for (let i = 0; i < size; i++) {
    carouselList.value.push({
      id: i,
      imageUrl: `src/assets/image/carousel-${(i % 3) + 1}.jpg`,
      linkUrl: 'https://www.bilibili.com/video/BV1ycztYWEPD',
      desc: 'demo',
    })
  }
}

// 瀑布流
const demoVideoCardInfo = <VideoCardInfoType>{
  id: 0,
  coverUrl: 'src/assets/image/cover-1.jpg',
  linkUrl: 'https://www.bilibili.com/video/BV1ycztYWEPD',
  title: '[514座!]这架老年波音777竟然能装这么多人',
  authorName: 'Hayabusa42',
  date: '2024-12-01',
}
const flowList = ref<Array<VideoCardFlowInfoType>>([])

// 模拟数据加载
const loading = ref<boolean>(false)
const isEnd = ref<boolean>(false)
const maxRow = 5
async function loadData() {
  if (flowList.value.length >= maxRow * 5) {
    if (!isEnd.value) {
      isEnd.value = true
    }
    return
  }
  loading.value = true
  for (let i = 0; i < 5; i++) {
    await loadOneData()
  }
}
async function loadOneData() {
  // const videoCardInfo = JSON.parse(JSON.stringify(demoVideoCardInfo))
  const videoCardInfo = deepCopy<VideoCardInfoType>(demoVideoCardInfo)
  const id = flowList.value.length
  videoCardInfo.id = id
  videoCardInfo.coverUrl = `src/assets/image/cover-${randomInt(1, 5)}.jpg`
  flowList.value.push({
    videoCardInfo,
    id,
    loading: true,
  })

  setTimeout(function () {
    flowList.value.forEach(item => {
      if (item.id === id) {
        item.loading = false
      }
    })
    loading.value = false
  }, 1000)
}
function resetFlowList() {
  flowList.value = []
  isEnd.value = false
}

// 切换navbar背景
const isNavBarTransparent = ref<boolean>(true)
const headerStyle = reactive({
  backgroundColor: 'transparent',
  boxShadow: '0 5px 8px rgba(255, 255, 255, 0.5)',
})
function switchNavBarBackground(isTransparent: boolean) {
  isNavBarTransparent.value = isTransparent
  headerStyle.backgroundColor = isNavBarTransparent.value
    ? 'transparent'
    : '#ffffff'
  headerStyle.boxShadow = isNavBarTransparent.value
    ? 'none'
    : '0 5px 8px rgba(255, 255, 255, 0.5)'
  console.log('switchNavBarBackground', isTransparent, headerStyle)
}


// 登录弹窗
const loginModalVisible = ref<boolean>(false)
function openLoginModal() {
  loginModalVisible.value = true
}
function handleCancel() {
  message.info('handleCancel')
  loginModalVisible.value = false
}
function handleOk() {
  message.info('handleOk')
}

// useTemplateRef返回值 只有在生命周期钩子函数中才能获取到，这里是null
const headerRef = useTemplateRef('headerRef')
const contentRef = useTemplateRef('contentRef')
const controller = new AbortController()
onMounted(() => {
  loadData()
  loadCarouselList(4)

  const scrollEventHandler = () => {
    const appOffsetHeight = (contentRef.value?.offsetHeight || 0) + 90
    const scrollTop = document.documentElement.scrollTop
    const scrollBottom = scrollTop + window.innerHeight
    // console.log('scrollEventHandler', window, document, scrollBottom, appOffsetHeight, loading.value)

    // 触发navbar背景切换事件
    if (isNavBarTransparent.value && scrollTop >= 150) {
      switchNavBarBackground(false)
    } else if (!isNavBarTransparent.value && scrollTop <= 130) {
      switchNavBarBackground(true)
    }

    // 触发数据懒加载事件
    if (!isEnd.value && !loading.value && scrollBottom >= appOffsetHeight) {
      // message.info('loadData!')
      loadData()
    }
  }
  window.addEventListener('scroll', scrollEventHandler, {
    signal: controller.signal,
  })
})
onUnmounted(() => {
  // window.removeEventListener('scroll', scrollEventHandler)
  controller.abort()
})
</script>

<template>
  <div>
    <a-flex class="parent" vertical>
      <!--      顶栏-->
      <div ref="headerRef" class="header">
        <NavBar :style="headerStyle" @openLoginModal="openLoginModal" />
      </div>

      <!--      内容主体-->
      <div id="content" ref="contentRef" class="content">
        <!--        顶部宽屏大图-->
        <a-row class="banner-card">
          <!--          <a-skeleton />-->
          <a-image
            width="100%"
            height="100%"
            src="src/assets/image/banner.jpg"
            :preview="false"
          />
        </a-row>
        <!--        推荐区域-->
        <div class="grid-container content-margin">
          <!--          轮播图-->
          <div class="grid-item grid-item-col-2">
            <a-carousel arrows :autoplay="true">
              <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                  <LeftCircleOutlined />
                </div>
              </template>
              <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                  <RightCircleOutlined />
                </div>
              </template>
              <div
                class="carousel-content"
                v-for="item in carouselList"
                :key="item.id"
                @click="openLink(item.linkUrl)"
              >
                <h3>{{ item.id + 1 }}</h3>
                <br>
                <img
                  :src="item.imageUrl"
                  :alt="item.desc"
                />
              </div>
            </a-carousel>
          </div>
          <!--          推荐区域-->
          <div class="grid-item">
            <VideoInfoCard :video-card-info="demoVideoCardInfo" />
          </div>
          <div class="grid-item">
            <VideoInfoCard :video-card-info="demoVideoCardInfo" />
          </div>
          <div class="grid-item">
            <VideoInfoCard :video-card-info="demoVideoCardInfo" />
          </div>
          <div class="grid-item">
            <VideoInfoCard :video-card-info="demoVideoCardInfo" />
          </div>
          <div class="grid-item">
            <VideoInfoCard :video-card-info="demoVideoCardInfo" />
          </div>
          <div class="grid-item">
            <VideoInfoCard :video-card-info="demoVideoCardInfo" />
          </div>

          <!--          懒加载瀑布流-->
          <template v-for="flow in flowList" :key="flow.id">
            <a-skeleton v-if="flow.loading" :active="flow.loading" />
            <template v-else>
              <div class="grid-item">
                <VideoInfoCard :video-card-info="flow.videoCardInfo" />
              </div>
            </template>
          </template>
          <template v-if="isEnd">
            <p class="end-prompt">不要再拉了，已经到底啦！！！</p>
          </template>
        </div>
      </div>

      <!--      页脚-->
      <div class="footer">footer</div>
    </a-flex>

    <!--    右下角悬浮按钮-->
    <a-float-button
      type="primary"
      @click="loadData"
      :style="{ right: '24px', bottom: '128px' }"
    >
      <template #icon>
        <PlusOutlined />
      </template>
    </a-float-button>
    <a-float-button
      @click="resetFlowList"
      v-if="flowList.length !== 1"
      :style="{ right: '24px', bottom: '72px' }"
    >
      <template #icon>
        <RedoOutlined />
      </template>
    </a-float-button>

<!--    登录弹窗-->
    <a-modal v-model:open="loginModalVisible" title="Title">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<style scoped>
.parent {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s;
}
.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 600px;
  width: 100%;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: grey;
  height: 100px;
}

.banner-card {
  height: 200px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr));
  grid-gap: 10px;
}
.grid-item {
  padding: 10px 5px;
}
.grid-item-col-2 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
.carousel-content {
  margin-block-start: auto;
}
.carousel-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-margin {
  margin: 0 50px;
}

.end-prompt {
  text-align: center;
  grid-column: 1 / 6;
  user-select: none;
}
</style>
