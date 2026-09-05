<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { useAsyncResource } from '@/composables/useAsyncResource'
import HomeSection from '@/components/space/main/HomeSection.vue'
import RadioGroup from '@/components/space/main/section/RadioGroup.vue'
import { computed, onMounted, ref } from 'vue'
import type { RadioListType } from '@/types/PropsType'
import { message } from 'ant-design-vue'
import HomeSectionVideoCard from '@/components/space/main/section/video/HomeSectionVideoCard.vue'

import videoInfoAPI from '@/api/video/VideoInfoAPI'
import { useTokenStore } from '@/stores/token'

import { useRoute } from 'vue-router'


const route = useRoute()
const token = useTokenStore()

const radioList = ref<RadioListType[]>([
  {
    id: 0,
    label: '最新发布',
  },
  {
    id: 1,
    label: '最多播放',
  },
  {
    id: 2,
    label: '最多收藏',
  },
])
const selectRadio = ref<number>(0)


function playAll() {
  message.info('playAll')
}

function showMore() {
  message.info('showMore')
}

const { data: result, loading, error, execute } = useAsyncResource(async () => {
  const uid = Number(route.params.id || token.uid)
  const api = uid === token.uid ? videoInfoAPI.pageQueryByUid : videoInfoAPI.pageQueryPassedByUid
  return api({ uid, pageNo: 1, pageSize: 10 })
})
const videoList = computed(() => result.value?.data || [])
const total = computed(() => result.value?.total || 0)
onMounted(execute)
</script>

<template>
  <HomeSection
    wrap-class="video-section"
    title="视频"
    :desc="`${total}`"
  >
    <template #radioGroup>
      <RadioGroup :radio-list="radioList" v-model:select-radio="selectRadio" />
    </template>
    <template #button>
      <button class="vui_button action-btn" @click="playAll">
        <i class="vui_icon sic-fsp-play_fill icon" style="font-size: 16px" />
        <span>播放全部</span>
      </button>
      <button class="vui_button" @click="showMore">
        <span>查看更多</span>
        <i
          class="vui_icon sic-BDC-arrow_forward_right_line icon"
          style="font-size: 12px; font-variation-settings: 'strk' 2"
        />
      </button>
    </template>

    <div v-if="loading" class="page-state" role="status">正在加载视频…</div>
    <div v-else-if="error" class="page-state" role="alert">{{ error }}<button @click="execute">重试</button></div>
    <div v-else-if="!videoList.length" class="page-state">暂无视频</div>
    <div v-else class="wrap">
      <div class="items full">
        <div class="items__item" v-for="item in videoList" :key="item.vid">
          <HomeSectionVideoCard :info="item" :progress="50" />
        </div>
      </div>
    </div>
  </HomeSection>
</template>

<style scoped>
.section-wrap .radio-filter:not(:first-child) {
  margin-left: 36px;
}

.video-section .items {
  column-gap: 16px;
  row-gap: 20px;
}

.video-section .items.full {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
}

@media (min-width: 1340px) {
  .video-section .items.full {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  }
}

.video-section .items.full > *:nth-child(1) {
  display: block !important;
}

@media (min-width: 1340px) {
  .video-section .items.full > *:nth-child(1) {
    display: block !important;
  }
}
</style>
