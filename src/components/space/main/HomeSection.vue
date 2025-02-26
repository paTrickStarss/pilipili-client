<script setup lang="ts">

defineProps({
  wrapClass: String,
  title: String,
  desc: String,
  hidden: Boolean,
})
</script>

<template>
  <section class="home-section">
    <div class="section-wrap" :class="wrapClass">
      <div class="section-wrap__header">
        <slot name="header">
          <div class="section-wrap__title">{{ title }}</div>
          <div class="section-wrap__desc">
            <slot name="desc">
              <span> · </span>
              {{ desc }}
            </slot>
          </div>
          <div class="section-wrap__visible" v-show="hidden">
            <i class="vui_icon sic-BDC-eye_browse_off_line visible__icon" style="font-size: 16px;"/>
            <span>仅自己可见</span>
          </div>
        </slot>
      </div>
      <div class="section-wrap__content">
        <slot>content...</slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-wrap {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line_regular);
  margin-bottom: 24px;
}
.section-wrap__header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  height: 34px;
}
.section-wrap__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text1);
}
.section-wrap__desc {
  font-size: 16px;
  margin-left: 6px;
  color: var(--text2);
}
.section-wrap__visible {
  font-size: 12px;
  margin-left: 16px;
  color: var(--text3);
  display: flex;
  align-items: center;
}
.section-wrap__visible .visible__icon {
  margin-right: 4px;
}
</style>
