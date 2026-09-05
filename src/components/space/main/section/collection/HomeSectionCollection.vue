<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import HomeSection from '@/components/space/main/HomeSection.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAsyncResource } from '@/composables/useAsyncResource'
import collectionInfoAPI from '@/api/video/CollectionInfoAPI'
import type { CollectionDTO } from '@/types/ApiRespType'
import { useTokenStore } from '@/stores/token'
import HomeSectionCollectionCard from '@/components/space/main/section/collection/HomeSectionCollectionCard.vue'

const token = useTokenStore()

const route = useRoute()
const { data: collectionList, loading, error, execute } = useAsyncResource<CollectionDTO[]>(async () => {
  const { data } = await collectionInfoAPI.queryUserCollection({ uid: Number(route.params.id || token.uid), pageNo: 1, pageSize: 10 })
  return data || []
})
onMounted(execute)
</script>

<template>
  <HomeSection
    wrap-class="fav-section"
    title="收藏"
    :desc="String(collectionList?.length || 0)"
  >
    <div v-if="loading" class="page-state" role="status">正在加载收藏…</div>
    <div v-else-if="error" class="page-state" role="alert">{{ error }}<button @click="execute">重试</button></div>
    <div v-else-if="!collectionList?.length" class="page-state">暂无公开收藏</div>
    <div v-else class="fav-section__content">
      <div class="items">
        <HomeSectionCollectionCard
          v-for="collection in collectionList"
          :key="collection.collectionId"
          :title="collection.title"
          :cover-url="collection.coverUrl"
          :himitsu="collection.himitsu == 1"
          :video-count="collection.videoCount"
        />
      </div>
    </div>
  </HomeSection>
</template>

<style scoped>
.fav-section__content .items {
  column-gap: 16px;
  row-gap: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
}
@media (min-width: 1340px) {
  .fav-section__content .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  }
}
</style>
