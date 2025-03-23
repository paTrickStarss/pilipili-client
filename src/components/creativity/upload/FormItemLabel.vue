<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

defineProps({
  label: String,
  required: Boolean,
})
</script>

<template>
  <div class="section-title-container section-title">
    <p class="section-title-deg" v-show="required">
      <span>*</span>
    </p>
    <h3 class="section-title-content-main">
      {{ label }}
    </h3>
  </div>
</template>

<style scoped>

.section-title-container {
  display: inline-flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  width: 134px;
}
.section-title-container .section-title-deg {
  font-size: 16px;
  color: #ff3b30;
  line-height: 16px;
  width: 12px;
}
.section-title-container .section-title-content-main {
  font-size: 14px;
  color: #212121;
  line-height: 21px;
  font-weight: 400;
}
</style>
