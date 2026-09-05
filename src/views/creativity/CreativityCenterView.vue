<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import IndexView from '@/views/index/IndexView.vue'
import NavSliderBar from '@/components/creativity/NavSliderBar.vue'


</script>

<template>
  <IndexView type="body">
    <div id="root" class="ct-root">
      <details class="creator-navigation" open>
        <summary>创作中心菜单</summary>
        <NavSliderBar />
      </details>

      <div id="cc-body" class="cc-body cc-body-microapp-wrap" style="height: 100%">
        <RouterView />
      </div>
    </div>

  </IndexView>
</template>

<style>
.ct-root { display: grid; grid-template-columns: var(--sidebar-width) minmax(0, 1fr); align-items: start; min-height: calc(100dvh - var(--header-height)); }
.creator-navigation { position: sticky; top: var(--header-height); }
.creator-navigation > summary { display: none; }
.ct-root .cc-body { min-width: 0; width: 100%; padding: 16px var(--layout-padding) 32px; }
@media (max-width: 1023px) {
  .ct-root { grid-template-columns: minmax(0, 1fr); }
  .creator-navigation { position: static; }
  .creator-navigation > summary { display: list-item; padding: 16px; cursor: pointer; background: var(--bg2); }
}
</style>
