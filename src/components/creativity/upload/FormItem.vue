<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

defineProps({
  wrapClass: String,
  label: String,
  required: Boolean,
})
</script>

<template>
  <div class="form-item">
    <div :class="wrapClass">
      <div class="section-title-container section-title">
        <p class="section-title-deg" v-show="required">
          <span>*</span>
        </p>
        <h3 class="section-title-content-main">
          {{ label }}
        </h3>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.form-item {
  margin: 24px 0 0 20px;
  color: #00a1d6;
}
.form-item-short-margin {
  margin: 14px 0 0 20px;
}
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


.cover {
  color: #212121;
  display: flex;
}
.video-title {
  display: flex;
  align-items: flex-start;
}
.video-title .section-title {
  margin-top: 6px;
}
.type-check {
  display: flex;
  align-items: center;
}


</style>
