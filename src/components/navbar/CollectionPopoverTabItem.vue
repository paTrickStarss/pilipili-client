<script setup lang="ts">
defineProps({
  title: String,
  num: Number,
  active: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div class="tab-item" :class="{ 'tab-item--active': active }">
    <span class="tab-item__title" :title="title">{{ title }}</span>
    <span class="tab-item__num">{{ num }}</span>
  </div>
</template>

<style scoped>
.favorite-panel-popover__nav .tab-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 46px;
  color: var(--text1);
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}
.favorite-panel-popover__nav .tab-item--active {
  background-color: var(--brand_blue);
  color: #fff;
}
.favorite-panel-popover__nav .tab-item__title {
  font-family:
    PingFang SC,
    HarmonyOS_Medium,
    Helvetica Neue,
    Microsoft YaHei,
    sans-serif;
  font-weight: 500;
  overflow: hidden;
  width: 85px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.favorite-panel-popover__nav .tab-item__num {
  color: var(--text3);
  word-break: normal;
  font-size: 12px;
  line-height: 20px;
}
</style>
