<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
defineProps({
  wrapClass: String,
  title: String,
  desc: String,
  hidden: Boolean,
})
defineEmits({
  showMore: () => true,
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
            <i
              class="vui_icon sic-BDC-eye_browse_off_line visible__icon"
              style="font-size: 16px"
            />
            <span>仅自己可见</span>
          </div>
          <slot name="radioGroup"></slot>
          <div class="buttons">
            <slot name="button">
              <button class="vui_button" @click="$emit('showMore')">
                <span>查看更多</span>
                <i
                  class="vui_icon sic-BDC-arrow_forward_right_line icon"
                  style="font-size: 12px; font-variation-settings: 'strk' 2"
                />
              </button>
            </slot>
          </div>
        </slot>
      </div>
      <div class="section-wrap__content">
        <slot>content...</slot>
      </div>
    </div>
  </section>
</template>

<style>
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

.section-wrap__header .buttons {
  /*display: flex;*/
  display: inline-flex;
  align-items: center;
  margin-left: auto;
}

.section-wrap__header .buttons button {
  transition: all 0.3s;
}

.section-wrap .vui_button {
  width: 100px;
}

.vui_button,
.vui_button:focus {
  color: var(--v_text1);
  background: var(--v_bg1_float);
  border: 1px solid var(--v_line_regular);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-wrap__header .buttons .vui_button:last-child {
  margin-left: 12px;
}

.action-btn .icon {
  margin-right: 4px;
}

.section-wrap__header .buttons .vui_button .icon {
  color: var(--graph_icon);
}

.section-wrap__header .buttons .vui_button .icon:last-child {
  margin-left: 2px;
}

.section-wrap__header .buttons .vui_button:hover {
  background-color: var(--graph_bg_thick);
}
</style>
