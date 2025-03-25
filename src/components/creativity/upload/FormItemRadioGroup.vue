<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import type { RadioInfoProps } from '@/types/PropsType'

defineProps<{
  radioGroup: RadioInfoProps[]
}>()

const selectedKey = defineModel('value',
  { type: Number, required: true }
)
</script>

<template>
  <div>
    <div
      class="check-radio-v2-container"
      v-for="radio in radioGroup"
      :key="radio.key"
      @click="selectedKey = radio.key"
    >
      <span
        class="check-radio-v2-box"
        :class="{'check-radio-v2-box-checked': selectedKey === radio.key}"
      ></span>
      <span class="check-radio-v2-name">
        {{ radio.label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.check-radio-v2-container {
  cursor: pointer;
  margin-right: 20px;
  display: inline-block;
  position: relative;
}
.check-radio-v2-container .check-radio-v2-box,
.check-radio-v2-container .check-radio-v2-name {
  display: inline-block;
  vertical-align: middle;
}
.check-radio-v2-container .check-radio-v2-box {
  border: 1px solid #bec3cc;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin-right: 6px;
}
.check-radio-v2-container .check-radio-v2-name {
  font-size: 14px;
  color: #61666d;
  line-height: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.check-radio-v2-container .check-radio-v2-box.check-radio-v2-box-checked+.check-radio-v2-name {
  color: #00a1d6;
}
.check-radio-v2-container .check-radio-v2-box:after {
  content: "";
  display: block;
  position: relative;
  height: 12px;
  width: 12px;
  left: 1px;
  top: 1px;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all .2s cubic-bezier(.78,.14,.15,.86);
}
.check-radio-v2-container .check-radio-v2-box.check-radio-v2-box-checked:after {
  opacity: 1;
  transform: scale(1);
  background: #00a1d6;
}

</style>
