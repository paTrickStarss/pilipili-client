<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import type { RadioListType } from '@/types/PropsType'

defineProps<{
  radioList: RadioListType[]
}>()
const selectRadio = defineModel('selectRadio', { type: Number, required: true })
</script>

<template>
  <div class="radio-filter">
    <div
      v-for="radio in radioList"
      :key="radio.id"
      class="radio-filter__item"
      :class="{ 'radio-filter__item--active': selectRadio === radio.id }"
      @click="selectRadio = radio.id"
    >
      {{ radio.label }}
    </div>
  </div>
</template>

<style scoped>
.radio-filter {
  display: flex;
  font-size: 14px;
  column-gap: 12px;
  row-gap: 12px;
  flex-wrap: wrap;
}

.radio-filter .radio-filter__item {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 15px;
  flex-shrink: 0;
  color: var(--text2);
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 6px;
  background-color: var(--graph_bg_thin);
}

.radio-filter .radio-filter__item--active,
.radio-filter .radio-filter__item--active:hover {
  color: var(--text_white);
  background: var(--brand_blue);
}
</style>
