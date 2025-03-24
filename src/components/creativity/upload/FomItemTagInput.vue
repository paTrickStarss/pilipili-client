<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">


import { computed, ref, watch } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'
import { message } from 'ant-design-vue'

const tagList = defineModel('tagList',
  { type: Array<string>, required: true }
)
const focus = ref<boolean>(false)
const tagSet = ref<Set<string>>(new Set())
const inputVal = ref<string>('')

const maxTagNum = ref<number>(10)
const remainingCount = computed<number>(() =>
  (maxTagNum.value - tagSet.value.size)
)
watch(() => tagSet.value.size, () => {
  tagList.value = Array.from(tagSet.value)
})

function addTag() {
  if (remainingCount.value <= 0) {
    message.warn(`最多只能添加${maxTagNum.value}个标签`)
    return
  }
  const tag = inputVal.value.trim()
  if (tag.length === 0) {
    message.warn('不能创建空白标签')
    inputVal.value = ''
    return
  }
  if (tagSet.value.has(tag)) {
    message.info(`已创建标签${tag}`)
  }
  tagSet.value.add(tag)
  inputVal.value = ''
}
function removeItem(item: string) {
  if (tagSet.value.size === 0) {
    return
  }
  tagSet.value.delete(item)
}
function removeLastTag() {
  if (tagSet.value.size === 0) {
    return
  }
  const iterator = tagSet.value.values()
  let last: string = '';
  for (const item of iterator) {
    last = item
  }
  removeItem(last)
}
</script>

<template>
  <div>
    <div
      class="input-container"
      :class="{'focus': focus}"
    >
      <div class="tag-pre-wrp">
        <div
          class="label-item-v2-container"
          v-for="item in tagSet.values()"
          :key="item"
        >
          <p class="label-item-v2-content">
            {{ item }}
          </p>
          <IconClose
            class="close icon-sprite icon-sprite-off"
            @click="removeItem(item)"
          />
        </div>
      </div>
      <div class="input-instance">
        <input
          class="input-val"
          type="text"
          maxlength="20"
          placeholder="按回车键Enter创建标签"
          v-model="inputVal"
          @keydown.enter="addTag"
          @keydown.delete="removeLastTag"
          @focus="focus = true"
          @blur="focus = false"
        >
      </div>
      <p class="tag-last-wrp">{{ `还可以添加个${remainingCount}标签` }}</p>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  background: hsla(0,0%,84.7%,0);
  border: 1px solid #ccd0d7;
  border-radius: 4px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transition: border .3s ease;
}
.input-container.focus {
  border-color: #00a1d6;
}

.label-item-v2-container {
  background: #00a1d6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 9px 0 11px;
  cursor: pointer;
}
.tag-pre-wrp {
  display: flex;
  flex-wrap: wrap;
}
.tag-pre-wrp>.label-item-v2-container {
  margin: 4px 6px 4px 0;
}
.label-item-v2-container .label-item-v2-close,
.label-item-v2-container .label-item-v2-content {
  color: #fff;
  font-size: 12px;
}
.label-item-v2-container .label-item-v2-content {
  line-height: 30px;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.close {
  margin-left: 4px;
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
}

.input-container .input-instance {
  flex: 1;
  min-width: 200px;
  margin: 6px 0;
}
.input-container .input-instance .input-val {
  display: block;
  width: 100%;
  color: #222;
  line-height: 22px;
  height: 22px;
  font-size: 14px;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background-color: transparent;
}
.tag-last-wrp {
  font-size: 14px;
  color: #858585;
  margin: 8px 0 8px 12px;
  cursor: default;
}
</style>
