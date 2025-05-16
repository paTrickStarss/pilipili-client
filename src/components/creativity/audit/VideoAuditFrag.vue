<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import VideoAuditInfoCard from '@/components/creativity/audit/VideoAuditInfoCard.vue'
import { onMounted, ref } from 'vue'
import type { VideoDTOType } from '@/types/ApiRespType'
import VideoInfoAPI from '@/api/video/VideoInfoAPI'
import IndexView from '@/views/index/IndexView.vue'


const videoInfoList = ref<VideoDTOType[]>()

onMounted(async () => {
  try {
    const { data } = await VideoInfoAPI.pageQueryAllByUid({
      uid: -1,
      pageNo: 1,
      pageSize: 10,
      status: 1
    })

    videoInfoList.value = data
    console.log('videoInfoList', videoInfoList.value)

  } catch (error) {
    console.log(error)
  }
})

</script>

<template>
  <div class="cc-content-body upload-manage">
      <div class="article-v2-wrap content">

        <div class="bcc-search-input-wrapper article-header_search">

        </div>
        <div class="cc-article-wrp is-article">
          <div class="article-header showSecondTab"></div>
          <div>
            <div class="article-list_wrap">
              <div
                v-for="info in videoInfoList"
                :key="info.vid"
              >
                <video-audit-info-card :info="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.upload-manage {
  height: 100%;
  background: #fff;
  margin-top: 16px!important;
  display: flow-root;
  padding-bottom: 20px;
}
#app .cc-body.is-layout .cc-content-body {
  width: inherit;
  margin-left: 72px;
  margin-right: 72px;
}
.article-v2-wrap {
  position: relative;
}
.upload-manage .content {
  padding: 0 40px 20px 40px;
}
.bcc-search-input-wrapper {
  position: relative;
  display: inline-block;
}
.article-v2-wrap .article-header_search {
  position: absolute;
  right: 40px;
  width: 230px;
  top: -52px;
}
.bcc-search-input {
  width: 100%;
  height: 32px;
  padding: 12px 35px 12px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  vertical-align: bottom;
  font-size: 12px;
  color: #505050;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
}
.search-input {
  position: absolute;
  top: 8px;
  right: 11px;
  font-size: 14px;
  color: #757575;
}
.cc-article-wrp .article-header {
  height: 32px;
  margin-top: 8px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: relative;
}
.article-header {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.article-header.showSecondTab {
  margin-bottom: 26px;
}

.article-v2-wrap .article-list_wrap {
  margin-top: 8px;
}



</style>
