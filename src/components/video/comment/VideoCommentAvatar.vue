<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

import { ASSETS_BASE_URL } from '@/utils/imgUtil'

defineProps({
  avatarUrl: {
    type: String,
    default: `${ASSETS_BASE_URL}/image/avatar-patrick.jpg@96w_96h_1c_1s.avif`
  }
})
</script>

<template>
  <div class="comment-avatar">
    <div id="canvas" style="--avatar-canvas-width: 64px; --avatar-canvas-height: 64px;">
      <div class="layers">
        <div class="layer center" style="width: 48px; height: 48px; opacity: 1; border-radius: 50%;">
          <div class="layer-res avatar-skeleton">
            <picture>
              <source type="image/avif" :srcset="avatarUrl">
              <img :src="avatarUrl" alt="" >
            </picture>
          </div>
        </div>

        <div class="layer vip-icon">
          <div
            class="layer-res"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.comment-avatar {
  display: inline-block;
  position: relative;
  width: var(--avatar-width, 48px);
  height: var(--avatar-height, 48px);
}

#canvas {
  width: var(--avatar-canvas-width, 64px);
  height: var(--avatar-canvas-height, 64px);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.layers {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.layer {
  position: absolute;
  isolation: isolate;
  overflow: hidden;
}
.layer.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.layer-res {
  width: 100%;
  height: 100%;
  isolation: isolate;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.layer-res picture {
  display: inline-block;
}
.layer-res div,
.layer-res picture,
.layer-res img {
  width: 100%;
  height: 100%;
}
.layer.vip-icon {
  left: 38px;
  top: 38px;
  width: 20px;
  height: 20px;
  opacity: 1;
  background-color: rgb(255, 255, 255);
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  box-sizing: border-box;
}
.layer.vip-icon .layer-res {
  background-image: url("@/assets/icons/big-vip.svg");
  transform: scale(110%);
}

</style>
