<script setup lang="ts">
import HomeSection from '@/components/space/main/HomeSection.vue'
import { ref } from 'vue'
import HomeSectionTopEmptyContent from '@/components/space/main/section/top/HomeSectionTopEmptyContent.vue'

const selectRadio = ref<number>(1)
</script>

<template>
  <HomeSection wrap-class="top-section">
    <template #header>
      <div class="radio-filter">
        <div
          class="radio-filter__item"
          :class="{ 'radio-filter__item--active': selectRadio === 1 }"
          @click="selectRadio = 1"
        >
          粉丝视角</div>
        <div
          class="radio-filter__item"
          :class="{ 'radio-filter__item--active': selectRadio === 2 }"
          @click="selectRadio = 2"
        >
          新访客视角</div>
      </div>
    </template>

    <div class="top-section__content">
      <div class="top-section__tab" v-show="selectRadio === 1">
        <div class="top-video top-video--empty">
          <HomeSectionTopEmptyContent
            title="置顶视频是粉丝们看到的第一个视频，"
            desc="请选择你最喜欢的作品，让粉丝们一饱眼福吧！"
            btn-label="置顶视频"
          />
        </div>
      </div>
      <div class="top-section__tab" v-show="selectRadio === 2">
        <div class="top-video top-video--empty">
          <HomeSectionTopEmptyContent
            title="代表作是新访客看到的第一个视频，"
            desc="选择你的得意之作，吸引新访客立即关注你吧！"
            btn-label="代表作视频"
          />
        </div>
      </div>
    </div>
  </HomeSection>
</template>

<style scoped>
.radio-filter {
  display: flex;
  font-size: 14px;
  column-gap: 12px;
  row-gap: 12px;
  flex-wrap: wrap;
}
.radio-filter .radio-filter__item {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 15px;
  flex-shrink: 0;
  color: var(--text2);
  cursor: pointer;
  transition: all .3s;
  border-radius: 6px;
  background-color: var(--graph_bg_thin);
}
.radio-filter .radio-filter__item--active,
.radio-filter .radio-filter__item--active:hover {
  color: var(--text_white);
  background: var(--brand_blue);
}
.top-video {
  --top-video-card-title-font-size: 20px;
  --top-video-card-title-lines: 1;
  --top-video-card-row-margin-top: 4px;
  --top-video-card-desc-font-size: 14px;
  --top-video-card-desc-lines: 1;
  display: flex;
  width: 100%;
}
@media (min-width: 0) {
  .top-video {
    --top-video-card-row-margin-top: 4px;
  }
}
@media (min-width: 1100px) {
  .top-video {
    --top-video-card-row-margin-top: 8px;
  }
}
@media (min-width: 1340px) {
  .top-video {
    --top-video-card-row-margin-top: 16px;
  }
}

.masterpiece-block {
  display: flex;
  column-gap: 2.195%;
}

</style>
