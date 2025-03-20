<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import HomeSection from '@/components/space/main/HomeSection.vue'
import { onMounted, ref } from 'vue'
import collectionInfoAPI from '@/api/video/CollectionInfoAPI'
import { useUserStore } from '@/stores/user'
import { useTokenStore } from '@/stores/token'
import HomeSectionCollectionCard from '@/components/space/main/section/collection/HomeSectionCollectionCard.vue'

const token = useTokenStore()
const user = useUserStore()
const userInfo = ref(user.userInfo)

const collectionList = ref([])

onMounted(async () => {
  collectionInfoAPI.queryUserCollection(
    {
      uid: token.uid,
      pageNo: 1,
      pageSize: 10,
    }
  ).then((data) => {
    console.log('user collection list', data)
    collectionList.value = data.data
  })
})
</script>

<template>
  <HomeSection
    wrap-class="fav-section"
    title="收藏"
    :desc="'1'"
    hidden
  >
    <div class="fav-section__content">
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
  grid-template-columns: repeat(4,1fr);
}
@media (min-width: 1340px) {
  .fav-section__content .items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
