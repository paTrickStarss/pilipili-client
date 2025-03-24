<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import type { SelectorInfoProps } from '@/types/PropsType'
import { computed, ref } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps<{
  list: SelectorInfoProps[]
}>()
const map = computed<Map<string, string>>(() => {
  const res = new Map<string, string>()
  props.list.forEach(item => {
    res.set(item.key, item.label)
  })
  return res
})
const selectedKey = defineModel('value',
  { type: String, required: true }
)

const showDropList = ref<boolean>(false)

function onFocus() {
  message.info('onFocus')
  showDropList.value = true
}
function onBlur() {
  message.info('onBlur')
  showDropList.value = false
}
</script>

<template>
  <div
    @focus="onFocus"
    @blur="onBlur"
    tabindex="0"
  >
    <div
      class="select-container"
    >
      <div
        class="select-controller"
        :class="{'select-controller-selected': showDropList}"
      >
        <p class="select-item-cont select-item-cont-inserted">
          {{ map.get(selectedKey) }}
        </p>
        <i
          class="bcc-iconfont arrow-iconfont bcc-icon-ic_drop-down"
          :class="{'active': showDropList}"
          v-show="list.length > 0"
        />
      </div>
      <div
        class="drop-list-v2-container human-type-list"
        style="min-width: 225px;"
        v-show="showDropList"
      >
        <div class="drop-list-v2-content-wrp">
          <div
            v-for="item in list"
            :key="item.key"
            :title="item.label"
            class="drop-list-v2-item"
            :class="{'drop-list-v2-item-selected': item.key === selectedKey}"
            @click="selectedKey = item.key"
          >
            <div class="drop-list-v2-item-cont">
              <p class="item-cont-main">{{ item.label }}</p>
              <p class="item-cont-sub"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.select-container .select-controller {
  padding: 6px 12px;
  border: 1px solid #ccd0d7;
  border-radius: 4px;
  min-width: 225px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #99a2aa;
  transition: border .3s ease;
  background: #fff;
}
.select-container .select-controller-selected {
  border-color: #00a1d6;
}
.select-container .select-controller .select-item-cont {
  line-height: 22px;
  height: 22px;
  font-size: 14px;
  display: inline-block;
  white-space: nowrap;
}
.select-container .select-controller .select-item-cont-inserted {
  color: #222;
}
.select-container .select-controller .selebox-box-v2-drop-icon {
  width: 12px;
  height: 12px;
  color: #757575;
  transition: all .3s ease-in-out;
}

/* drop-list */
.drop-list-v2-container {
  background: #fff;
  border: 1px solid #e5e9ef;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.14);
  border-radius: 4px;
  min-width: 206px;
  position: absolute;
  z-index: 10;
  left: 0;
}
.drop-list-v2-container .drop-list-v2-content-wrp {
  height: 250px;
  overflow-x: hidden;
  overflow-y: auto;
}
.drop-list-v2-container .drop-list-v2-item {
  padding: 0 12px 0 24px;
  margin: 9px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.video-human-type .selector-container .human-type-list .drop-list-v2-content-wrp .drop-list-v2-item {
  margin: 0;
  padding: 4px 24px;
}
.drop-list-v2-container .drop-list-v2-item .drop-list-v2-item-cont {
  line-height: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
}
.drop-list-v2-container .drop-list-v2-item .drop-list-v2-item-cont p.item-cont-main {
  font-size: 14px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drop-list-v2-container .drop-list-v2-item-selected .drop-list-v2-item-cont p.item-cont-main {
  color: #00a1d6!important;
}
.drop-list-v2-container .drop-list-v2-item .drop-list-v2-item-cont p.item-cont-sub {
  margin-left: 10px;
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drop-list-v2-container .drop-list-v2-item i.drop-list-v2-item-icon {
  display: inline-block;
  font-size: 12px;
  text-align: right;
  padding-left: 12px;
  color: #00a1d6;
  opacity: 0;
}

.video-human-type .selector-container .human-type-list {
  margin-top: 6px;
  padding: 6px 0;
}

.arrow-iconfont {
  padding-left: 0;
  color: silver!important;
  font-size: 12px!important;
}
.select-controller i {
  transition: transform .3s;
}
.select-controller.select-controller-selected i.active {
  transform: rotate(180deg);
}
</style>
