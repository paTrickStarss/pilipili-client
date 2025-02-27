<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
defineProps({
  title: String,
  index: {
    type: Number,
    default: 0,
  },
  active: Boolean,
})
const activeTab = defineModel('activeTab', { type: Number, required: true })
</script>

<template>
  <div
    class="header-tabs-panel__item"
    :class="{ 'header-tabs-panel__item--active': activeTab === index }"
    @click="activeTab = index"
  >
    {{ title }}
  </div>
</template>

<style scoped>
.header-tabs-panel__item {
  flex: 1 auto;
  padding: 15px 0;
  border-bottom: 3px solid transparent;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.header-tabs-panel__item--active {
  border-bottom: 3px solid var(--brand_blue);
  color: var(--brand_blue);
}
</style>
