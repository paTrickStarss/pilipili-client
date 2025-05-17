<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import VideoAuditInfoCard from '@/components/creativity/audit/VideoAuditInfoCard.vue'
import { onMounted, provide, reactive, ref, watch } from 'vue'
import type { VideoDTOType } from '@/types/ApiRespType'
import VideoInfoAPI from '@/api/video/VideoInfoAPI'


const status = ref<number>(-1)
watch(status, () => {
  fetchData()
})

const videoInfoList = ref<VideoDTOType[]>()

const statusList: number[] = [-1, 0, 1, 2, 3, 4]
function statusClick(newStatus: number) {
  if (!statusList.includes(newStatus)) {
    return;
  }
  status.value = newStatus
}
const currentTotal = ref<number>(0)
const pagination = reactive({
  pageNo: 1,
  pageSize: 10,
})
// watch(() => pagination.pageNo, () => {
//   fetchData()
// })
function pageChange(pageNo: number, pageSize: number) {
  pagination.pageNo = pageNo
  pagination.pageSize = pageSize
  fetchData()
}
async function fetchData() {
  const resp = await VideoInfoAPI.pageQueryAllByUid({
    uid: -1,
    pageNo: pagination.pageNo,
    pageSize: pagination.pageSize,
    status: status.value !== -1 ? status.value : undefined,
  })
  console.log('resp:', resp)
  currentTotal.value = resp.total
  videoInfoList.value = resp.data as VideoDTOType[]
  console.log('videoInfoList', videoInfoList.value)
}
provide('fetchData', fetchData)
onMounted(() => {
  fetchData()
})

</script>

<template>
  <div class="cc-content-body upload-manage">
      <div class="article-v2-wrap content">

        <div class="bcc-search-input-wrapper article-header_search">

        </div>
        <div class="cc-article-wrp is-article">
          <div class="article-header showSecondTab">
            <div class="tabs">
              <a
                class="txt-item"
                :class="{'current': status === -1}"
                @click="statusClick(-1)"
              >
                全部稿件
              </a>
              <span>总数量：{{ currentTotal }}</span>
            </div>
            <div class="text-split_wrap secondTabs">
              <div
                class="split-item operate-txt"
                :class="{'active': status === 0}"
                @click="statusClick(0)"
              >
                上传中
              </div>
              <div
                class="split-item operate-txt"
                :class="{'active': status === 1}"
                @click="statusClick(1)"
              >
                审核中
              </div>
              <div
                class="split-item operate-txt"
                :class="{'active': status === 2}"
                @click="statusClick(2)"
              >
                审核通过
              </div>
              <div
                class="split-item operate-txt"
                :class="{'active': status === 3}"
                @click="statusClick(3)"
              >
                审核不通过
              </div>
              <div
                class="split-item operate-txt"
                :class="{'active': status === 4}"
                @click="statusClick(4)"
              >
                下架
              </div>
            </div>
            <div class="header-operate"></div>
          </div>
          <div>
            <div class="article-list_wrap">
              <div
                v-for="info in videoInfoList"
                :key="info.vid"
              >
                <video-audit-info-card :info="info" />
              </div>
            </div>
            <div class="pagination-wrp">
              <a-pagination
                v-model:current="pagination.pageNo"
                @change="pageChange"
                :total="currentTotal"
              />
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
.article-header .tabs {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.article-header .txt-item {
  color: #505050;
  user-select: none;
}
.article-header .tabs a {
  font-size: 14px;
  color: #505050;
  letter-spacing: .5px;
  text-align: left;
  line-height: 18px;
  cursor: pointer;
  position: relative;
  padding-right: 16px;
}
.article-header .txt-item.current,
.article-header .txt-item:hover {
  color: #00a1d6;
}
.text-split_wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.article-header.showSecondTab .secondTabs {
  position: absolute;
  margin-top: 36px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: .5px;
}
.text-split_wrap .split-item {
  font-size: 14px;
  color: #505050;
  letter-spacing: .5px;
  text-align: left;
  line-height: 18px;
}
.text-split_wrap .operate-txt {
  cursor: pointer;
  position: relative;
  padding-right: 16px;
  user-select: none;
}
.text-split_wrap .operate-txt.active {
  color: #00a1d6;
  font-weight: 500;
}
.article-header.showSecondTab .secondTabs .txt-item:not(.current) {
  color: rgba(80,80,80,.7);
}
.text-split_wrap .operate-txt:not(:last-child):after {
  position: absolute;
  content: " ";
  display: block;
  right: 0;
  height: 16px;
  background: #e7e7e7;
  width: 1px;
  top: 2px;
}
.article-header .header-operate {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.article-header .header-operate div {
  margin-left: 12px;
}

.pagination-wrp {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px 0 10px 0;
}

</style>
