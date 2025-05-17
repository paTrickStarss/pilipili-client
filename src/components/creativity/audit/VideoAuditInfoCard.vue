<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import type { VideoDTOType } from '@/types/ApiRespType'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'
import { inject, onMounted, ref } from 'vue'
import { DateTimeUtil } from '@/utils/DateTimeUtil'
import VideoAuditPlayerPop from '@/components/creativity/audit/VideoAuditPlayerPop.vue'

const props = defineProps<{
  info: VideoDTOType
}>()

interface ViewStatsInfoType {
  id: number,
  title: string,
  icon: string,
  text: string | number,
}
const viewStatsInfo = ref<ViewStatsInfoType[]>()
const showAuditPlayerPop = ref<boolean>(false)

const fetchData = inject('fetchData', async () => {})
function refresh() {
  fetchData()
}

onMounted(() => {
  viewStatsInfo.value = [
    {
      id: 0,
      title: '播放',
      icon: `${ASSETS_BASE_URL}/icons/play-count-icon.png`,
      text: props.info.viewCount,
    },
    {
      id: 1,
      title: '弹幕',
      icon: `${ASSETS_BASE_URL}/icons/danmaku-count-icon.png`,
      text: props.info.danmakuCount,
    },
    {
      id: 2,
      title: '评论',
      icon: `${ASSETS_BASE_URL}/icons/comment-count-icon.png`,
      text: props.info.commentCount,
    },
    {
      id: 3,
      title: '点赞',
      icon: `${ASSETS_BASE_URL}/icons/favor-count-icon.png`,
      text: props.info.favorCount,
    },
    {
      id: 4,
      title: '投币',
      icon: `${ASSETS_BASE_URL}/icons/coin-count-icon.png`,
      text: props.info.coinCount,
    },
    {
      id: 5,
      title: '收藏',
      icon: `${ASSETS_BASE_URL}/icons/collect-count-icon.png`,
      text: props.info.collectCount,
    },
    {
      id: 6,
      title: '转发',
      icon: `${ASSETS_BASE_URL}/icons/repost-count-icon.png`,
      text: props.info.repostCount,
    },
  ]
})
</script>

<template>
  <div>
    <div class="article-card v2 clearfix">
      <a :href="`/video/${info.vid}`" target="_blank" class="cover-wrp">
        <img :src="info.coverUrl" :alt="info.title" class="cover-img">
        <div class="duration">{{ DateTimeUtil.instance.getFormatTextFromSeconds(info.duration) }}</div>
      </a>
      <div class="meta-wrp">
        <div class="meta-title">
<!--          <span class="mission-mark">活动</span>-->
          <a :href="`/video/${info.vid}`" target="_blank" class="name vui_ellipsis">
            {{ info.title }}
          </a>
        </div>
        <div class="meta-middle">
          <div class="meta-status">
            <div class="pubdate" :title="DateTimeUtil.instance.getDateTime(info.uploadTime)">
              <span class="date">上传时间：{{ DateTimeUtil.instance.getDateTime(info.uploadTime) }}</span>
            </div>
            <div class="pubdate is-success" :title="DateTimeUtil.instance.getDateTime(info.publishTime)" v-if="info.status === 2">
              <span class="date">发布时间：{{ DateTimeUtil.instance.getDateTime(info.publishTime) }}</span>
            </div>
            <div></div>
          </div>
          <div class="meta-view">
            <a href="#" target="_blank" class="bili-btn">
              <i class="bcc-iconfont bcc-icon-Mediumx" style="font-size: 16px; color: rgb(80, 80, 80);"/>
              编辑
            </a>
<!--            <a href="#" target="_blank" class="bili-btn">-->
<!--              <i class="bcc-iconfont bcc-icon-icon_list_ranking_x1" style="font-size: 16px; color: rgb(80, 80, 80);"/>-->
<!--              数据-->
<!--            </a>-->
            <a class="bili-btn" v-show="info.status === 1 || info.status === 3" @click="showAuditPlayerPop = true">
              <i class="bcc-iconfont bcc-icon-ic_audit" style="font-size: 16px; color: rgb(80, 80, 80);"/>
                审核
            </a>
            <a class="more-btn">
              <i class="bcc-iconfont bcc-icon-icon_list_more_x" style="font-size: 16px; color: rgb(80, 80, 80);"/>
            </a>
          </div>
        </div>
        <div class="meta-footer clearfix">
          <div
            class="view-stat"
            v-for="info in viewStatsInfo"
            :key="info.id"
            :title="info.title"
          >
            <img :src="info.icon" alt="" width="16px" height="16px">
            <span class="icon-text">{{ info.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <video-audit-player-pop
      :info="info"
      v-model:show="showAuditPlayerPop"
      @refresh="refresh"
    />
  </div>
</template>

<style scoped>
.article-card {
  border-bottom: 1px solid #e7e7e7;
}
.cc-article-wrp .article-card {
  position: relative;
  width: 100%;
  min-height: 140px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
}
.article-card.v2 {
  padding: 24px 0;
  margin-bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.cc-article-wrp .article-card .cover-wrp {
  position: relative;
  float: left;
  width: 160px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 20px;
  background: #f1f3f7 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAtCAMAAADflBjwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEUAAACwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucCwucAAAAAIOUAVAAAAanRSTlMAZfG8DwSe9InuxgoDqP4GjgKgtAGWsJoJkKORpgWKlYyXhIeCiBB+0Ph9NOYoykek+XESGttwGUx/suUgYF7fn6Ffs4BNXQeYei318yZvrHborjN869xaWBYR99nYqzsI8DLyzurpeGftOJZa5gAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAG/SURBVEjHxZVnQ8IwEIZP3Fhx1YkD96CgOFAQB1q34N4bRfT+/w8wl9pKa2vCF3w/kN7leZP0UhKAIlX4KqvAoeqa2jrwUj2iv8GeUhoRA01ehmZErLT1trSyVJvnDGo76+5QihKdxHeBt6ObAT2qFQdZ2NsHf6mfIQNmEGLBoAJ/a4hBw8bjCHscVV2YsfGJSRRqcmJqzODDmpg2pIWJj/hkeURfhBUmKs8jRlWYLoVHnIYZamKzc4LiwfxsjMgZWKAmLsJJcSIXgBdUOD5pjhcX+MpkePhGy21YXEokl1NmlFpOJpYWvQyc5dGKSazy0HI5DGvW5rSahnUrteZicPTax0i7GDaMD3JT35q3dndL39R+VukwpGxs0TdBrtT/7UMZDdvb0oad3T2A/YPDDICerZYwhAN4dHzCduT4FANnMkui8w4TU/QbknoH5fzi8grg+vJCV6QMgirx//SNDH9L5B3cUxOUMfBT4wHSfKLHp2fR+Ma5lC795FP9pfB+NlfmRZ5/ydDqcvL3Q854H3YDxcT065t5A30rT9n33+U5oXzepW4F6ij8zmcpf+5iULP5fNztzvzQPgstVvQF6+Zs+Lvu8fAAAAAASUVORK5CYII=) no-repeat 50%;
}
.article-card.v2 .cover-wrp {
  -webkit-align-self: center;
  align-self: center;
  width: 154px;
  height: 87px;
  margin-right: 24px;
}
.article-card .cover-img {
  -o-object-fit: cover;
  object-fit: cover;
}
.cc-article-wrp .article-card .cover-wrp img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.cc-article-wrp .article-card .cover-wrp .duration {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 18px;
  line-height: 18px;
  padding: 0 4px;
  background: rgba(0,0,0,.6);
  color: #fff;
  border-radius: 4px;
}
.article-card.v2 .cover-wrp .duration {
  background: rgba(0,0,0,.5);
  border-radius: 4px 0 4px 0;
}
.article-card .tag-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
  top: 4px;
  right: 4px;
  position: absolute;
}

.cc-article-wrp .article-card .meta-wrp {
  float: left;
}
.article-card.v2 .meta-wrp {
  width: calc(100% - 178px);
  position: relative;
}
.cc-article-wrp .article-card .meta-title {
  height: 24px;
  line-height: 24px;
}
.article-card.v2 .meta-title .mission-mark {
  border-radius: 12px;
  font-size: 12px;
  padding: 4px 12px;
  line-height: 14px;
  margin-right: 12px;
  color: #00a1d6;
  background-color: #f4f4f4;
  vertical-align: middle;
}
.cc-article-wrp .article-card .meta-title .name {
  display: inline-block;
  max-width: 420px;
  font-size: 18px;
  color: #212121;
}
.article-card.v2 .meta-title .name {
  font-size: 16px;
  color: #212121;
  line-height: 20px;
  vertical-align: middle;
}

.article-card.v2 .meta-middle {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.cc-article-wrp .article-card .meta-status {
  padding: 18px 0 20px;
}
.article-card.v2 .meta-status {
  padding: 18px 0 16px 0;
  font-size: 14px;
  color: #505050;
  line-height: 16px;
  margin-right: 4px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.cc-article-wrp .article-card .meta-status .pubdate {
  display: inline-block;
  color: #99a2aa;
  font-weight: 400;
  padding-right: 20px;
  border-right: 1px solid #e5e9ef;
  vertical-align: middle;
}
.cc-article-wrp .article-card .meta-status .is-success {
  border: none;
}
.article-card.v2 .meta-status .pubdate {
  font-size: 14px;
  color: #505050;
  line-height: 20px;
  padding-right: 24px;
  border-right: 1px solid #e7e7e7;
}
.article-card.v2 .meta-status .pubdate.is-success {
  border-right: none;
}
.article-card.v2 .meta-status .pubdate .date {
  display: inline-block;
  min-width: 175px;
}

.cc-article-wrp .article-card .meta-view {
  position: absolute;
  top: 50%;
  margin-top: -16px;
  right: 10px;
  color: #99a2aa;
}
.article-card.v2 .meta-view {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  right: 0;
  position: relative;
  margin-top: 0;
  user-select: none;
}
.cc-article-wrp .article-card .meta-view .bili-btn {
  width: 72px;
  display: inline-block;
}
.article-card.v2 .meta-view .bili-btn {
  width: 84px;
  height: 32px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  font-size: 14px;
  color: #505050;
  line-height: 18px;
  padding: 0;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  margin-right: 12px;
}
.article-card.v2 .meta-view .bili-btn .bcc-iconfont {
  margin-right: 7px;
}
.article-card.v2 .meta-view .more-btn {
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid #e7e7e7;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}
.article-card.v2 .meta-view .more-btn i {
  display: inline-block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.cc-article-wrp .article-card .meta-footer {
  position: relative;
  font-size: 12px;
}
.cc-article-wrp .article-card .meta-footer .view-stat {
  display: inline-block;
  float: left;
  margin-right: 20px;
  color: #99a2aa;
}
.article-card.v2 .meta-footer .view-stat {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin-right: 25px;
}
.cc-article-wrp .article-card .meta-footer .icon-text {
  vertical-align: top;
}
.article-card.v2 .meta-footer .view-stat .icon-text {
  margin-left: 5px;
}


</style>
