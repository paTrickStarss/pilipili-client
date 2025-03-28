<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IconSettings from '@/components/icons/IconSettings.vue'
import { ref } from 'vue'
import BuiSwitch from '@/components/global/BuiSwitch.vue'
import IconArrowMoreRight from '@/components/icons/IconArrowMoreRight.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'


const settingsInfo = ref({
  mirror: false,
  loop: false,
  autoplay: true,
  oped: false
})

const showSettingsMenu = ref<boolean>(false)
const btnEnter = ref<boolean>(false)
const menuEnter = ref<boolean>(false)
function btnMouseEnter() {
  btnEnter.value = true
  setTimeout(() => {
    if (btnEnter.value) {
      showSettingsMenu.value = true
    }
  }, 100)
}
function btnMouseLeave() {
  btnEnter.value = false
  setTimeout(() => {
    if (!menuEnter.value) {
      showSettingsMenu.value = false
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
      showSettingsMenu.value = false
    }
  }, 100)
}

const panelNum = ref<number>(0)

</script>

<template>
  <div
    class="bpx-player-ctrl-btn bpx-player-ctrl-setting"
    aria-label="设置" tabindex="0"
    @mouseenter="btnMouseEnter"
    @mouseleave="btnMouseLeave"
  >
    <div class="bpx-player-ctrl-btn-icon">
      <span class="bpx-common-svg-icon">
        <IconSettings
          style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px)"
        />
      </span>
    </div>
    <div
      class="bpx-player-ctrl-setting-box"
      v-show="showSettingsMenu"
      @mouseenter="menuMouseEnter"
      @mouseleave="menuMouseLeave"
    >
      <div class="bpx-player-ctrl-setting-menu bui bui-panel bui-dark">
        <div class="bui-area">
          <div class="bui-panel-wrap" style="width: 132px; height: 140px;">
            <div class="bui-panel-move" style="width: 418px; transform: translateX(0)">
<!--              基础设置-->
              <div
                class="bui-panel-item"
                :class="{'bui-panel-item-active': panelNum === 0 }"
                style="width: 132px;"
              >
                <div class="bpx-player-ctrl-setting-menu-left">
                  <bui-switch
                    class="bpx-player-ctrl-setting-mirror"
                    label="镜像画面"
                    v-model:value="settingsInfo.mirror"
                  />
                  <bui-switch
                    class="bpx-player-ctrl-setting-loop"
                    label="单集循环"
                    v-model:value="settingsInfo.loop"
                  />
                  <bui-switch
                    class="bpx-player-ctrl-setting-autoplay"
                    label="自动开播"
                    v-model:value="settingsInfo.autoplay"
                  />
                  <bui-switch
                    class="bpx-player-ctrl-setting-oped"
                    label="跳过OPED"
                    v-model:value="settingsInfo.oped"
                    v-show="false"
                  />
                  <div class="bpx-player-ctrl-setting-more">
                    <span class="bpx-player-ctrl-setting-more-text">
                      更多播放设置
                    </span>
                    <span class="bpx-common-svg-icon">
                      <IconArrowRight />
                    </span>
                  </div>
                </div>
              </div>
<!--              更多设置-->
              <div
                class="bui-panel-item"
                :class="{'bui-panel-item-active': panelNum === 1 }"
                style="width: 286px;"
              >
                <div class="bpx-player-ctrl-setting-menu-right">
                  <div class="bpx-player-ctrl-setting-handoff"></div>
                  <div class="bpx-player-ctrl-setting-aspect"></div>
                  <div class="bpx-player-ctrl-setting-codec"></div>
                  <div class="bpx-player-ctrl-setting-loudness"></div>
                  <div class="bpx-player-ctrl-setting-others"></div>
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
.bpx-player-ctrl-setting-box {
  bottom: 41px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
/*  display: none;*/
  font-size: 12px;
  position: absolute;
  right: -48px;
  text-align: left;
}
.bpx-player-ctrl-setting-menu {
  border-radius: 2px!important;
}
.bpx-player-ctrl-setting-menu-left {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 6px 20px;
  width: 100%;
}
.bpx-player-ctrl-setting-autoplay,
.bpx-player-ctrl-setting-list-loop,
.bpx-player-ctrl-setting-loop,
.bpx-player-ctrl-setting-mirror,
.bpx-player-ctrl-setting-more,
.bpx-player-ctrl-setting-oped {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 32px;
  line-height: 32px;
  width: 100%;
}
.bpx-player-ctrl-setting-more {
  cursor: pointer;
  position: relative;
  -webkit-transition: color .2s ease-in-out;
  transition: color .2s ease-in-out;
}
.bpx-player-ctrl-setting-more:hover {
  color: #00a1d6;
}
.bpx-player-ctrl-setting-more .bpx-common-svg-icon {
  fill: #fff;
  height: 100%;
  position: absolute;
  right: 0;
  width: 16px;
}
/*.bpx-player-ctrl-setting-more-text {
  transition: color .3s ease-in-out;
}*/

.bpx-player-ctrl-setting-menu-right {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 16px 20px;
  width: 100%;
}



</style>
