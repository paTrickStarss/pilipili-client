<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

defineProps({
  content: String
})
</script>

<template>
  <div
    class="bili-danmaku-x-dm bili-danmaku-x-roll bili-danmaku-x-show"
    style="
      --translateX: -1277px;
      --duration: 9s;
      --opacity: 0.47;
      --fontSize: 25px;
      --fontFamily: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
      --fontWeight: bold;
      --color: #e70012;
      --textShadow: 1px 1px 2px #000000,0 0 1px #000000;
    "
  >
    {{ content }}
  </div>
</template>

<style scoped>
/*.danmaku-wrap {
  --opacity: 0.47;
  --fontSize: 25px;
  --fontFamily: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
  --fontWeight: bold;
  --color: #e70012;
  --textShadow: 1px 1px 2px #000000,0 0 1px #000000;
}*/
.bili-danmaku-x-dm {
  position: absolute;
  line-height: 1.125;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: pre;
  -webkit-perspective: 500px;
  perspective: 500px;
  will-change: transform, opacity, top, left;
  font-weight: var(--fontWeight, bold);
  font-family: var(--fontFamily);
  font-size: var(--fontSize, 25px);
  color: var(--color, #ffffff);
  text-shadow: var(--textShadow);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  top: 0;
  opacity: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  left: -10px;
  z-index: 200;
}
.bili-danmaku-x-dm {
  will-change: transform, opacity, top, left;
}
.bili-danmaku-x-paused .bili-danmaku-x-dm {
  -webkit-animation-play-state: paused !important;
  animation-play-state: paused !important;
}

.bili-danmaku-x-dm.bili-danmaku-x-show {
  opacity: var(--opacity, 1);
  display: -webkit-box;
}

.bili-danmaku-x-dm.bili-danmaku-x-show.bili-danmaku-x-roll {
  -webkit-animation: roll linear var(--duration) forwards;
  animation: roll linear var(--duration) forwards;
}

@keyframes roll {
  0% {
    -webkit-transform: translateX(0) translateZ(0);
    transform: translateX(0) translateZ(0);
  }
  100% {
    -webkit-transform: translateX(var(--translateX)) translateZ(0);
    transform: translateX(var(--translateX)) translateZ(0);
  }
}
</style>
