<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { computed, ref } from 'vue'
import IconDanmakuSwitchOn from '@/components/icons/IconDanmakuSwitchOn.vue'
import IconDanmakuSwitchOff from '@/components/icons/IconDanmakuSwitchOff.vue'
import IconDanmakuSettings from '@/components/icons/IconDanmakuSettings.vue'
import DanmakuTypeController from '@/components/video/player/sending-area/DanmakuTypeController.vue'
import { message } from 'ant-design-vue'
import { isEmptyString } from '@/utils/CommonUtil'

const danmakuCount = ref<number>(2333)
const onlineCount = ref<number>(1234)
const onlineCountText = computed<string>(() =>
  onlineCount.value > 1000 ? '1000+': onlineCount.value.toString()
)

const danmakuSwitchOn = ref<boolean>(false)
const danmakuInput = ref<string>('')

function sendDanmaku() {
  if (!danmakuSwitchOn.value) {
    return
  }
  if (isEmptyString(danmakuInput.value)) {
    message.warn('请输入弹幕内容')
    return
  }
  message.info(`sendDanmaku: ${danmakuInput.value}`)
  danmakuInput.value = ''
}

</script>

<template>
  <div class="bpx-player-sending-area">
    <div class="bpx-player-sending-bar">
      <div class="bpx-player-video-info">
        <div class="bpx-player-video-info-online">
          <b>{{ onlineCountText }}</b>
          人正在看
        </div>
        <div class="bpx-player-video-info-divide">，</div>
        <div class="bpx-player-video-info-dm">
          已装填{{ danmakuCount }}条弹幕
        </div>
      </div>
      <div class="bpx-player-dm-root">
<!--        弹幕开关-->
        <div class="bpx-player-dm-switch bui bui-danmaku-switch">
          <div class="bui-area">
            <input
              class="bui-danmaku-switch-input"
              type="checkbox"
              v-model="danmakuSwitchOn"
              :checked="danmakuSwitchOn"
            />
            <label class="bui-danmaku-switch-label">
              <span class="bui-danmaku-switch-on" v-show="danmakuSwitchOn">
                <IconDanmakuSwitchOn/>
              </span>
              <span class="bui-danmaku-switch-off" v-show="!danmakuSwitchOn">
                <IconDanmakuSwitchOff/>
              </span>
            </label>
          </div>
        </div>
<!--        弹幕设置-->
        <div class="bpx-player-dm-setting">
          <span class="bpx-common-svg-icon">
            <IconDanmakuSettings/>
          </span>
        </div>
<!--        弹幕发送-->
        <div class="bpx-player-video-inputbar focus bpx-player-checkbox-hide">
<!--          弹幕输入框-->
          <div class="bpx-player-video-inputbar-wrap">
            <div class="bpx-player-video-preview-emoji-wrap">
              <img class="bpx-player-video-preview-emoji" alt="" src="">
            </div>
<!--            弹幕类型-->
            <danmaku-type-controller />
            <div class="bpx-player-dm-wrap" v-show="!danmakuSwitchOn">
              已关闭弹幕
            </div>
            <input
              v-show="danmakuSwitchOn"
              class="bpx-player-dm-input"
              placeholder="发个友善的弹幕见证当下"
              autocomplete="off"
              v-model="danmakuInput"
              @keydown.enter="sendDanmaku"
            >
<!--            弹幕礼仪-->
          </div>
<!--          发送按钮-->
          <div
            class="bpx-player-dm-btn-send bui bui-button"
            :class="{ 'bui-disabled': !danmakuSwitchOn }"
          >
            <div
              class="bui-area bui-button-blue"
              @click="sendDanmaku"
            >
              发送
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bpx-player-sending-area:before {
  background: #f4f4f4;
  content: "";
  display: block;
  height: 1px;
  margin-bottom: -1px;
  width: 100%;
}
.bpx-player-sending-bar {
  -ms-flex-negative: 0;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  background: var(--bpx-dmsend-main-bg,#fff);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-shrink: 0;
  height: 46px;
  padding: 0 12px;
  position: relative;
}
.bpx-player-sending-bar {
  -webkit-box-flex: 0;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  background: #fff;
  background: var(--bpx-dmsend-main-bg,#fff);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: none;
  flex: none;
  font-size: 12px;
  height: 46px;
  justify-content: space-between;
  padding: 0 12px 0 20px;
}
.bpx-player-sending-bar .bpx-player-video-info {
  -ms-flex-negative: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: var(--bpx-dmsend-info-font,#505050);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-shrink: 1;
  height: 16px;
  line-height: 12px;
  margin-right: 12px;
  overflow: hidden;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  width: 132px;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar {
  font-size: 13px;
  padding-left: 12px;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-info,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-info {
  line-height: 18px;
  margin-right: 24px;
  width: auto;
}
.bpx-player-sending-bar .bpx-player-video-info-online {
  position: relative;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-info-online,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-info-online {
  margin-right: 0;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-info-online b,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-info-online b {
  font-weight: 400;
  margin-right: 3px;
}
.bpx-player-sending-bar .bpx-player-video-info-dm {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.bpx-player-sending-bar .bpx-player-dm-root {
  -webkit-box-flex: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: auto;
  flex: auto;
  height: 34px;
}
.bui-danmaku-switch {
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  fill: var(--bpx-dmsend-switch-icon,#757575);
/*  display: -webkit-inline-box;*/
  display: -ms-inline-flexbox;
  display: inline-flex;
  justify-content: flex-start;
  position: relative;
}
.bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting,
.bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-switch {
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  margin-right: 12px;
  position: relative;
  width: 30px;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting,
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-switch,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-switch {
  height: 24px;
  margin-right: 12px;
  width: 24px;
}
.bui-danmaku-switch .bui-danmaku-switch-input {
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
.bui-danmaku-switch .bui-danmaku-switch-label {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  width: 100%;
}

.bui-danmaku-switch .bui-danmaku-switch-label .bui-danmaku-switch-off,
.bui-danmaku-switch .bui-danmaku-switch-label .bui-danmaku-switch-on {
  height: 24px;
}

.bpx-player-dm-setting {
  color: #fff;
}
.bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting {
  fill: var(--bpx-dmsend-switch-icon,#757575);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 0;
  height: 46px;
  padding: 11px 0;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-dm-root .bpx-player-dm-setting {
  padding: 0;
}
.bpx-player-dm-setting-wrap {
  background: none;
  border: none;
  border-radius: 4px 4px 0 0;
  bottom: 46px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: default;
  font-size: 12px;
  height: 359px;
  position: absolute;
  right: -149px;
  text-align: left;
  width: 320px;
  z-index: 1001;
}
.bpx-player-dm-setting-box {
  border-radius: 2px;
  bottom: 0;
  position: absolute;
  right: 0;
}




.bpx-player-sending-bar .bpx-player-video-inputbar {
  -ms-flex-align: center;
  -ms-flex-positive: 1;
  background: #f4f4f4;
  background: var(--bpx-dmsend-input-bg,#f4f4f4);
  border-radius: 2px;
  color: #999;
  flex-grow: 1;
  width: 300px;
}
.bpx-player-sending-bar .bpx-player-video-inputbar,
.bpx-player-sending-bar .bpx-player-video-inputbar-wrap {
  -webkit-box-align: center;
  -webkit-box-flex: 1;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar {
  border-radius: 8px;
  height: 32px;
  min-width: 300px;
  width: calc(100% - 72px);
}
.bpx-player-sending-bar .bpx-player-video-inputbar-wrap {
  -ms-flex-align: center;
  border: 1px solid var(--bpx-dmsend-border,#e7e7e7);
  border-radius: 2px 0 0 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex: 1;
  flex: 1;
  height: 30px;
  width: 200px;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar-wrap,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar-wrap {
  border: none;
  border-radius: 8px 0 0 8px;
  height: 100%;
}
.bpx-player-sending-bar .bpx-player-video-inputbar-wrap .bpx-player-video-preview-emoji-wrap {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0 0 8px 0 rgba(0,0,0,.102);
  box-shadow: 0 0 8px 0 rgba(0,0,0,.102);
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  display: none;
  height: 50px;
  justify-content: center;
  left: 36px;
  position: absolute;
  top: -56px;
  width: 50px;
  z-index: 70;
}
.bpx-player-sending-bar .bpx-player-video-inputbar-wrap .bpx-player-video-preview-emoji-wrap .bpx-player-video-preview-emoji {
  margin: 0 5px;
  width: 40px;
}



.bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-wrap {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  flex-grow: 1;
  left: 0;
  line-height: 28px;
  overflow: hidden;
  padding: 0 10px;
  text-overflow: ellipsis;
  top: 0;
  white-space: nowrap;
  z-index: 13;
}

.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-wrap,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-wrap {
  padding: 0 0 0 6px;
}

.bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-input {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  background: none;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #212121;
  color: var(--bpx-dmsend-input-font,#212121);
  flex-grow: 1;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  min-width: 100px;
  padding: 0 5px;
  width: 100%;
  z-index: 12;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-input,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-input {
  font-size: inherit;
}


.bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-hint {
  -ms-flex-negative: 0;
  -webkit-box-flex: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  flex-shrink: 0;
  -ms-flex: none;
  flex: none;
  opacity: 0;
  text-align: center;
  width: 72px;
  z-index: 13;
}
.bpx-player-sending-bar .bpx-player-video-inputbar.bpx-player-checkBox-hide .bpx-player-dm-hint {
  opacity: 1;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-hint,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-hint {
  margin-right: 5px;
  width: auto;
}

.bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send {
  border-radius: 0 2px 2px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
  min-width: 60px;
  overflow: hidden;
  text-align: center;
  width: 60px;
  z-index: 13;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send {
  border-radius: 0 8px 8px 0;
  height: 100%;
  min-width: 62px;
  width: 62px;
}
.bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send .bui-area {
  border-radius: 0;
  min-width: 60px;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send.bui-button .bui-area,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send.bui-button .bui-area {
  font-size: 13px;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send.bui-disabled,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send.bui-disabled {
  -webkit-filter: initial;
  filter: none;
}
.bpx-player-container[data-revision="1"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send.bui-disabled .bui-button-blue,
.bpx-player-container[data-revision="2"] .bpx-player-sending-bar .bpx-player-video-inputbar .bpx-player-dm-btn-send.bui-disabled .bui-button-blue {
  background-color: var(--bpx-dmsend-disable-button-bg,#e7e7e7);
  color: var(--bpx-dmsend-disable-button-text,#999);
}

</style>
