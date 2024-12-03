<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/navbar/NavBar.vue'
import VideoInfoCard from '@/components/video/VideoInfoCard.vue'
import { PlusOutlined, RedoOutlined } from '@ant-design/icons-vue'

// 瀑布流
const initialData = {
  id: 0,
  loading: false,
}
const flowList = ref<Array<{ id: number, loading: boolean }>>([initialData])
// 模拟数据加载
async function loadData() {
  const id = flowList.value.length
  flowList.value.push({
    id,
    loading: true,
  })
  setTimeout(function () {
    flowList.value.forEach((item) => {
      if (item.id === id) {
        item.loading = false
      }
    })
  }, 1000)
}
function resetFlowList() {
  flowList.value = [initialData]
}

</script>

<template>
  <div>
    <a-flex class="parent" vertical>
<!--      顶栏-->
      <div class="header">
        <NavBar />
      </div>

<!--      内容主体-->
      <div class="content">
<!--        顶部宽屏大图-->
        <a-row class="banner-card">
<!--          <a-skeleton />-->
          <a-image
            width="100%" height="100%"
            src="src/assets/image/foster-lake.jpg"
            :preview="false"
          />
        </a-row>
<!--        推荐区域-->
        <a-row  class="recommend-card content-margin">
<!--          轮播图-->
          <a-col :span="12" class="recommend-col">
            <a-skeleton />
          </a-col>
<!--          推荐视频-->
          <a-col :span="12" class="recommend-col">
            <a-row>
              <a-col :span="8"><VideoInfoCard/></a-col>
              <a-col :span="8"><VideoInfoCard/></a-col>
              <a-col :span="8"><VideoInfoCard/></a-col>
            </a-row>
            <a-row>
              <a-col :span="8"><VideoInfoCard/></a-col>
              <a-col :span="8"><VideoInfoCard/></a-col>
              <a-col :span="8"><VideoInfoCard/></a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>

      <!--        瀑布流-->
      <div class="content-margin">
        <a-row
          v-for="flow in flowList"
          :key="flow"
          :gutter="24"
          class="water-fall"
        >
          <a-skeleton v-if="flow.loading" :active="flow.loading" />
          <template v-else>
            <a-col :span="4"><VideoInfoCard/></a-col>
            <a-col :span="4"><VideoInfoCard/></a-col>
            <a-col :span="4"><VideoInfoCard/></a-col>
            <a-col :span="4"><VideoInfoCard/></a-col>
            <a-col :span="4"><VideoInfoCard/></a-col>
            <a-col :span="4"><VideoInfoCard/></a-col>
          </template>
        </a-row>
      </div>

<!--      页脚-->
      <div class="footer">footer</div>
    </a-flex>

    <a-float-button
      type="primary" @click="loadData"
      :style="{right: '24px', bottom: '128px'}"
    >
      <template #icon>
        <PlusOutlined />
      </template>
    </a-float-button>
    <a-float-button
      @click="resetFlowList" v-if="flowList.length !== 1"
      :style="{right: '24px', bottom: '72px'}"
    >
      <template #icon>
        <RedoOutlined />
      </template>
    </a-float-button>
  </div>
</template>

<style scoped>
.parent {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  position: fixed;
  width: 100%;
  z-index: 1000;
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

.water-fall {
  width: 100%;
}
.banner-card {
  height: 200px;
}
.recommend-card {
  height: 500px;
}
.recommend-col {
  margin: auto 0;
}
.content-margin {
  margin: 0 50px;
}
</style>
