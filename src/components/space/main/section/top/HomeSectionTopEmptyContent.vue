<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { ASSETS_BASE_URL } from '@/utils/imgUtil'

defineProps({
  title: String,
  desc: String,
  btnLabel: String,
})
defineEmits({
  commit: () => true,
})
</script>

<template>
  <div class="home-empty-content">
    <div class="home-empty-content__left">
      <div class="home-empty-content__pic">
        <div class="b-img empty-content__img">
          <img
            :src="`${ASSETS_BASE_URL}/image/space-home-section-top.png@240w_240h.webp`"
            alt=""
            class="b-img__inner"
          />
        </div>
      </div>
    </div>
    <div class="home-empty-content__right">
      <div class="home-empty-content__title">
        {{ title }}
      </div>
      <div class="home-empty-content__desc">
        {{ desc }}
      </div>
      <div class="action">
        <button
          class="vui_button vui_button--blue brand-action"
          @click="$emit('commit')"
        >
          <i
            class="vui_icon sic-BDC-plus_add_line icon"
            style="font-size: 12px"
          />
          <span>{{ btnLabel }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-empty-content {
  width: 100%;
  display: flex;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
}

.home-empty-content__pic {
  width: 120px;
  height: 120px;
}

.home-empty-content__pic .b-img {
  background-color: transparent;
}

.b-img__inner {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

.home-empty-content__right {
  line-height: 20px;
  font-size: 14px;
  color: var(--text3);
  margin-left: 20px;
}

.home-empty-content__right div:last-child {
  margin-top: 12px;
}

.vui_button--blue,
.vui_button--blue:focus {
  color: var(--v_text_white);
  background: var(--v_brand_blue);
  border: 1px solid var(--v_brand_blue);
}

.brand-action {
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vui_button:not(.vui_button--no-transition) {
  -webkit-transition-property:
    color,
    background-color,
    border,
    -webkit-transform;
  transition-property:
    color,
    background-color,
    border,
    transform,
    -webkit-transform;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
}

.section-wrap .vui_button {
  width: 100px;
}

.brand-action .icon {
  margin-right: 4px;
}
</style>
