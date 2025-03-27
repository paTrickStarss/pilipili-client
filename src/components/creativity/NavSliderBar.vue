<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import NavSliderBarItem from '@/components/creativity/NavSliderBarItem.vue'
import { onMounted, ref, watch } from 'vue'
import type { NavSliderBarItemProps } from '@/types/PropsType'
import { jumpRoute } from '@/utils/RouterUtil'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const navBarIndex = ref<number>(checkNavIndex())

watch(() => route.path,
  () => {
    navBarIndex.value = checkNavIndex()
  }
)
function checkNavIndex() {
  return route.meta.index as number
}

const sliderNavItemList = ref<NavSliderBarItemProps[]>([
  {
    id: 0,
    label: '首页',
    iconClass: 'bcc-icon-ic_home_',
    autoOpen: false,
    groupItem: [],
    route: '/creativity',
  },
  {
    id: 1,
    label: '内容管理',
    iconClass: 'bcc-icon-ic_Content_',
    autoOpen: true,
    groupItem: [
      {
        id: 0,
        label: '稿件管理',
        route: '#'
      },
      {
        id: 1,
        label: '申诉管理',
        route: '#'
      },
      {
        id: 2,
        label: '字幕管理',
        route: '#'
      },
    ]
  },
  {
    id: 2,
    label: '数据管理',
    iconClass: 'bcc-icon-ic_data_',
    autoOpen: false,
    groupItem: []
  },
  {
    id: 3,
    label: '粉丝管理',
    iconClass: 'bcc-icon-ic_fans_',
    autoOpen: false,
    groupItem: []
  },
  {
    id: 4,
    label: '互动管理',
    iconClass: 'bcc-icon-ic_interactive_',
    autoOpen: true,
    groupItem: [
      {
        id: 0,
        label: '评论管理',
        route: '#'
      },
      {
        id: 1,
        label: '弹幕管理',
        route: '#'
      },
    ]
  },
  {
    id: 5,
    label: '收益管理',
    iconClass: 'bcc-icon-ic_earnings_',
    autoOpen: true,
    groupItem: [
      {
        id: 0,
        label: '收益中心',
        route: '#'
      },
      {
        id: 1,
        label: '创作激励',
        route: '#'
      },
      {
        id: 2,
        label: '充电计划',
        route: '#'
      },
      {
        id: 3,
        label: '悬赏带货',
        route: '#'
      },
      {
        id: 4,
        label: '任务广场',
        route: '#'
      },
      {
        id: 5,
        label: '花火平台',
        route: '#'
      },
      {
        id: 6,
        label: '模板激励',
        route: '#'
      },
    ]
  }
])
</script>

<template>

  <div id="cc-nav_wrap" class="cc-nav-wrp">
    <div class="cc-nav">
      <div data-simplebar="init">
        <div class="simplebar-wrapper" style="margin: 0">
          <div class="simplebar-height-auto-observer-wrapper"></div>
          <div class="simplebar-mask">
            <div class="simplebar-offset" style="right: 0; bottom: 0; top: 60px">
              <div class="simplebar-content-wrapper" style="height: auto; overflow: hidden">
                <div class="simplebar-content" style="padding: 0">
                  <!--                      投稿-->
                  <div class="nav-upload-btn newApp">
                    <a
                      id="nav_upload_btn"
                      href="/creativity/upload"
                      @click.prevent="jumpRoute(router, '/creativity/upload')"
                    >
                      <i class="bcc-iconfont bcc-icon-ic_contribute"/>
                      <span>投稿</span>
                    </a>
                  </div>
                  <!--                      菜单-->
                  <ul class="nav-wrp">
                    <div id="slider-bar-wrap">
                      <div class="bccNavSliderMenu-wrap slider-bar">
                        <NavSliderBarItem
                          v-for="item in sliderNavItemList"
                          :key="item.id"
                          :info="item"
                          v-model:index="navBarIndex"
                        />
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cc-nav-wrp {
  position: fixed;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  padding-top: 42px;
  top: 0;
  left: 0;
  border-right: 1px solid #e5e9ef;
  background: #fff;
  z-index: 10;
  height: 100%;
  width: 240px;
  overflow: hidden;
  font-family: PingFangSC-Regular,Microsoft YaHei,Arial,Helvetica,sans-serif;
}
#app .cc-nav-wrp {
  padding-top: 60px;
  width: 200px;
  border-right: 1px solid #f4f4f4;
}
.cc-nav {
  width: 200px!important;
}
.cc-nav-wrp .cc-nav {
  width: 240px;
  height: 100%;
}
[data-simplebar] {
  position: static;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-align-content: flex-start;
  align-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}
.simplebar-wrapper {
  overflow: hidden;
  width: inherit;
  height: inherit;
  max-width: inherit;
  max-height: inherit;
}
.simplebar-height-auto-observer-wrapper {
  box-sizing: inherit!important;
  height: 100%;
  width: 100%;
  max-width: 1px;
  position: relative;
  float: left;
  max-height: 1px;
  overflow: hidden;
  z-index: -1;
  padding: 0;
  margin: 0;
  pointer-events: none;
  -webkit-box-flex: inherit;
  -webkit-flex-grow: inherit;
  flex-grow: inherit;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  -webkit-flex-basis: 0;
  flex-basis: 0;
}
.simplebar-mask {
  direction: inherit;
  overflow: hidden;
  width: auto!important;
  height: auto!important;
  z-index: 0;
}
.simplebar-mask, .simplebar-offset {
  position: absolute;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.simplebar-offset {
  direction: inherit!important;
  box-sizing: inherit!important;
  resize: none!important;
  -webkit-overflow-scrolling: touch;
}
.simplebar-content-wrapper {
  direction: inherit;
  box-sizing: border-box!important;
  position: relative;
  display: block;
  height: 100%;
  width: auto;
  max-width: 100%;
  max-height: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.simplebar-content:after, .simplebar-content:before {
  content: " ";
  display: table;
}
.cc-nav-wrp .nav-upload-btn {
  width: 130px;
  margin: 0 auto 20px;
}
.cc-nav .nav-upload-btn {
  width: 136px;
  margin-bottom: 17px;
}
.cc-nav-wrp .nav-upload-btn.newApp {
  margin-top: 24px;
}
.cc-nav-wrp .nav-upload-btn>a {
  display: block;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  background: #00a1d6;
  cursor: pointer;
}
.cc-nav .nav-upload-btn a {
  border-radius: 2px;
}
.cc-nav .nav-upload-btn i {
  margin-right: 8px;
  font-size: 18px;
}

.cc-nav-wrp .nav-wrp {
  padding-bottom: 35px;
}
.bccNavSliderMenu-wrap {
  font-size: 14px;
}
.simplebar-content:after, .simplebar-content:before {
  content: " ";
  display: table;
}
</style>
