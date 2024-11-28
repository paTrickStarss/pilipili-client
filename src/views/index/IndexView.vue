<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/navbar/NavBar.vue'
import VideoInfoCard from '@/components/video/VideoInfoCard.vue'

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
        <a-row :gutter="24" class="landscape-card water-fall">
          <a-skeleton />
        </a-row>
<!--        推荐区域-->
        <a-row :gutter="24" class="recommend-card water-fall">
<!--          轮播图-->
          <a-col :span="12">
            <a-skeleton />
          </a-col>
<!--          推荐视频-->
          <a-col :span="12">
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

<!--        瀑布流-->
        <div>
          <a-row
            v-for="flow in flowList"
            :key="flow"
            :gutter="24"
            class="water-fall"
          >
            <a-skeleton :active="flow.loading" />
          </a-row>
        </div>
      </div>

<!--      页脚-->
      <div class="footer">footer</div>
    </a-flex>

    <a-affix :offset-bottom="200" class="affix-style">
      <a-button class="affix-button" @click="loadData">Add a row</a-button><br>
      <a-button class="affix-button" @click="resetFlowList">Reset</a-button>
    </a-affix>
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
  min-height: 800px;
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
.affix-style {
  text-align: right;
}
.affix-button {
  margin: 10px 20px;
}

.water-fall {
  width: 100%;
}
.landscape-card {
  height: 200px;
}
.recommend-card {
  height: 100%;
}
</style>
