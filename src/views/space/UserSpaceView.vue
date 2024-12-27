<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import IndexView from '@/views/index/IndexView.vue'
import { onMounted, ref } from 'vue'
import { StarTwoTone, CloudTwoTone, SettingTwoTone } from '@ant-design/icons-vue'
import UserInfoCard from '@/components/space/UserInfoCard.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import type { CollectionInfoType } from '@/types/PropsType'

const isLoading = ref<boolean>(false)
const activeKey = ref<string>('1')
const collectionList = ref<Array<CollectionInfoType>>([])

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)

  collectionList.value = [
    {
      id: 1,
      name: '收藏夹1',
      size: 2,
      desc: 'demo collection 1'
    },
    {
      id: 2,
      name: '收藏夹2',
      size: 0,
      desc: 'demo collection 2'
    },
    {
      id: 3,
      name: '收藏夹3',
      size: 6,
      desc: 'demo collection 1'
    },
  ]
})

</script>

<template>
  <IndexView>
<!--    <div>-->
<!--      <br v-for="i in Array(3)" :key="i">-->
<!--    </div>-->

    <div class="background">
      <a-skeleton v-if="isLoading" :active="isLoading" :paragraph="{ rows: 2 }"/>
      <a-image
        v-else
        width="100%"
        height="100%"
        :src="`${ASSETS_BASE_URL}/image/cover-2.jpg`"
        :preview="false"
        style="height: 200px"
      />
    </div>
    <div class="body-container">
<!--      <p v-for="i in Array(rows)" :key="i">This is User Space View.</p>-->
      <div class="infoCard body-width">
        <a-skeleton v-if="isLoading" avatar :active="isLoading" :paragraph="{ rows: 4 }"/>
        <UserInfoCard v-else/>
      </div>
      <div class="content body-width">
        <a-skeleton v-if="isLoading" :active="isLoading" :paragraph="{ rows: 30 }"/>
        <a-tabs v-else v-model:activeKey="activeKey" centered>

<!--          收藏-->
          <a-tab-pane key="1">
            <template #tab>
              <span class="tab-header"><StarTwoTone/>收藏</span>
            </template>
            <a-tabs tab-position="left">
              <a-tab-pane v-for="item in collectionList" :key="item.id">
                <template #tab>
                  <span class="tab-header"><StarTwoTone/>{{ item.name }}</span>
                </template>
                <p>collection size: {{ item.size }}</p>
                <p>collection desc: {{ item.desc }}</p>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>

<!--          投稿-->
          <a-tab-pane key="2" force-render>
            <template #tab>
              <span class="tab-header"><CloudTwoTone/>投稿</span>
            </template>
            Content of Tab Pane 2
          </a-tab-pane>

<!--          设置-->
          <a-tab-pane key="3">
            <template #tab>
              <span class="tab-header"><SettingTwoTone/>设置</span>
            </template>
            Content of Tab Pane 3
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>

  </IndexView>
</template>

<style scoped>
.body-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 100px;
}
.body-width {
  width: 100%;
}
.background {
  height: 150px;
  width: 100%;
}
.infoCard {
  height: 200px;
}
.content {
  height: 600px;
}
.tab-header {
  margin-inline: 30px
}
</style>
