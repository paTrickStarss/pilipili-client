<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IconDanmakuType from '@/components/icons/IconDanmakuType.vue'
import { ref } from 'vue'
import { useTokenStore } from '@/stores/token'

const token = useTokenStore()

const showDanmakuTypePanel = ref<boolean>(false)
const danmakuTypeInfo = ref({
  fontsize: 1,
  mode: 0,
  color: '#FFFFFF',
})
const fontsizeList = ref([
  {
    id: 0,
    name: '小'
  },
  {
    id: 1,
    name: '标准'
  },
])
const modeList = ref([
  {
    id: 0,
    name: '滚动',
    iconElement: 'IconDanmakuModeScroll'
  },
  {
    id: 1,
    name: '顶部',
    iconElement: 'IconDanmakuModeTop'
  },
  {
    id: 2,
    name: '底部',
    iconElement: 'IconDanmakuModeBottom'
  },
])
const colorList = ref([
  '#FFFFFF', '#FE0302', '#FF7204', '#FFAA02',
  '#FFD302', '#FFFF00', '#A0EE00', '#00CD00',
  '#019899', '#4266EE', '#66CCFF', '#CC0273',
  '#222222', '#9B9B9B'
])

const btnEnter = ref<boolean>(false)
const menuEnter = ref<boolean>(false)
function btnMouseEnter() {
  btnEnter.value = true
  setTimeout(() => {
    if (btnEnter.value) {
      showDanmakuTypePanel.value = true
    }
  }, 100)
}
function btnMouseLeave() {
  btnEnter.value = false
  setTimeout(() => {
    if (!menuEnter.value) {
      showDanmakuTypePanel.value = false
    }
  }, 100)
}
function menuMouseEnter() {
  menuEnter.value = true
}
function menuMouseLeave() {
  menuEnter.value = false
  setTimeout(() => {
    if (!btnEnter.value) {
      showDanmakuTypePanel.value = false
    }
  }, 100)
}
</script>

<template>
  <div
    class="bpx-player-video-btn-dm"
    @mouseenter="btnMouseEnter"
    @mouseleave="btnMouseLeave"
  >
    <span class="bpx-player-iconfont bpx-player-iconfont-danmakutype">
      <span class="bpx-common-svg-icon">
        <IconDanmakuType />
      </span>
    </span>
    <div
      class="bpx-player-mode-selection-container"
      v-show="showDanmakuTypePanel"
      @mouseenter="menuMouseEnter"
      @mouseleave="menuMouseLeave"
    >
      <div v-if="token.isLogin" class="bpx-player-mode-selection-panel">
        <!--                  弹幕字号-->
        <div class="bpx-player-mode-selection-row fontsize">
          <div class="row-title">字号</div>
          <div class="row-selection">
            <div
              data-type="fontsize"
              class="selection-span js-action"
              :class="{ 'active': danmakuTypeInfo.fontsize === item.id }"
              v-for="item in fontsizeList"
              :key="item.id"
              @click="danmakuTypeInfo.fontsize = item.id"
            >
              <span class="selection-name">{{ item.name }}</span>
            </div>
          </div>
        </div>

<!--        弹幕模式-->
        <div class="bpx-player-mode-selection-row mode">
          <div class="row-title">模式</div>
          <div class="row-selection">
            <div
              data-type="mode"
              class="selection-span js-action"
              :class="{ 'active': danmakuTypeInfo.mode === item.id }"
              v-for="item in modeList"
              :key="item.id"
              @click="danmakuTypeInfo.mode = item.id"
            >
<!--              <span class="selection-icon">{{ item.iconElement }}</span>-->
              <component :is="item.iconElement" class="selection-icon" />
              <span class="selection-name">{{ item.name }}</span>
            </div>
          </div>
        </div>

<!--        弹幕颜色-->
        <div class="bpx-player-mode-selection-row color">
          <div class="row-title">颜色</div>
          <div class="row-selection danmaku-color bui bui-color-picker bui-dark">
            <div class="bui-area">
              <div class="bui-color-picker-wrap" style="width: 176px">
<!--                颜色选取展示-->
                <div class="bui-color-picker-result">
                  <span class="bui-color-picker-input bui bui-input" style="width: auto; flex: 1;">
                    <div class="bui-area">
                      <div class="bui-input-wrap">
                        <input class="bui-input-input" type="text" v-model="danmakuTypeInfo.color">
                      </div>
                    </div>
                  </span>
                  <span class="bui-color-picker-display" :style="{ background: `${danmakuTypeInfo.color}`}"></span>
                </div>
<!--                颜色预选方案展示-->
                <ul class="bui-color-picker-options" style="margin-right: -10.66px">
                  <li
                    class="bui-color-picker-option"
                    :class="{ 'bui-color-picker-option-active': danmakuTypeInfo.color === color }"
                    :style="{ background: `${color}`, marginRight: '10.66px' }"
                    @click="danmakuTypeInfo.color = color"
                    v-for="color in colorList"
                    :key="color"
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div v-else class="bpx-player-mode-selection-mask">
        <div class="bpx-player-mode-selection-mask-warning login-btn bui bui-button">
          <div class="bui-area bui-button-blue">
            请先登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.bpx-player-video-btn-dm {
  -webkit-box-flex: 0;
  fill: var(--bpx-dmsend-switch-icon,#757575);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: hsla(0,0%,100%,.8);
  cursor: pointer;
  -ms-flex: none;
  flex: none;
  height: 30px;
  line-height: 30px;
  padding: 3px 0;
  position: relative;
  text-align: center;
  width: 30px;
}
.bpx-player-video-btn-dm .bpx-player-iconfont {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 100%;
}
.bpx-player-mode-selection-container {
  background: hsla(0,0%,8%,.9);
  border-radius: 2px;
  bottom: 39px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: auto;
  left: 50%;
  margin-left: -108px;
  padding: 2px 0 0;
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 216px;
  z-index: 1001;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel {
  display: block;
  position: relative;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row {
  font-size: 12px;
  line-height: 22px;
  margin: 10px 20px;
  min-height: 22px;
  position: relative;
  width: 176px;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-title {
  color: #fff;
  line-height: 16px;
  text-align: left;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 8px -8px 0 0;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span {
  background: hsla(0,0%,100%,.2);
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  margin-right: 8px;
  position: relative;
  text-align: center;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row.mode .selection-span {
  fill: hsla(0,0%,100%,.8);
  background: transparent;
  color: hsla(0,0%,100%,.8);
  margin: -4px 22px 0 0;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span:last-child {
  margin-right: 8px;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span[data-type=fontsize] {
  margin-bottom: 8px;
  width: 84px;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span.active {
  background: #00a1d6;
  background: var(--bpx-fn-color,#00a1d6);
  color: #fff;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span[data-type=mode].active {
  color: #00a1d6;
  fill: #00a1d6;
  background: initial;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span .selection-icon {
  border-radius: 2px;
  display: block;
  font-size: 26px;
  height: 26px;
  overflow: hidden;
  position: relative;
  text-align: center;
  width: 26px;
  z-index: 1;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row.mode .selection-name {
  display: block;
  line-height: 14px;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .selection-span.js-action>span {
  pointer-events: none;
}

.bui-color-picker .bui-color-picker-result {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 22px;
  margin-bottom: 6px;
  vertical-align: middle;
}
.bui-color-picker .bui-color-picker-input {
  margin-right: 6px;
  width: 98px;
}
.bui-color-picker.bui-dark .bui-input .bui-input-input {
  background-color: transparent;
  border: 1px solid hsla(0,0%,100%,.2);
  color: #fff;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-panel .bpx-player-mode-selection-row .row-selection .bui-input .bui-input-input {
  -webkit-transition: none;
  transition: none;
}
.bui-color-picker .bui-color-picker-display {
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: background .2s;
  transition: background .2s;
  vertical-align: middle;
  width: 50px;
}
.bui-color-picker.bui-dark .bui-color-picker-display {
  border: 1px solid hsla(0,0%,100%,.2);
}

/*.bpx-docker ol, .bpx-docker ul {
  list-style: none;
  outline: none;
}*/
.bui-color-picker .bui-color-picker-options {
  font-size: 0;
  line-height: 0;
  list-style-type: none;
  margin: 0 -6px 0 0;
  padding: 0;
  white-space: normal;
}
.bui-color-picker .bui-color-picker-option {
  border: 1px solid rgba(0,0,0,.3);
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  height: 16px;
  margin-bottom: 4px;
  margin-right: 6px;
  width: 16px;
}
.bui-color-picker .bui-color-picker-option.bui-color-picker-option-active {
  -webkit-box-shadow: 0 0 1px 1px #fff;
  box-shadow: 0 0 1px 1px #fff;
}
.bui-color-picker.bui-dark .bui-color-picker-option.bui-color-picker-option-active {
  border-color: #000;
}



.bpx-player-mode-selection-container .bpx-player-mode-selection-mask {
  background: rgba(0,0,0,.8);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  z-index: 49;
}
.bpx-player-mode-selection-container .bpx-player-mode-selection-mask .bpx-player-mode-selection-mask-warning {
  height: 26px;
  left: 50%;
  line-height: 26px;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  width: 76px;
}
</style>
