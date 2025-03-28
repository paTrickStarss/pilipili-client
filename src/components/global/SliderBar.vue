<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { computed } from 'vue'

const value = defineModel('value', {
  type: Number,
  required: true,
  validator: (value: number) => value >= 0 && value <= 100,
})

const thumbDotX = computed<number>(() =>
  value.value / 2
)

let isDragging = false;
let startY: number;
let startMouseY: number;
const ratio: number = 2;

function startDrag(event: MouseEvent) {
  isDragging = true;
  startY = value.value;
  startMouseY = event.clientY;
  console.log('startDrag', startY, startMouseY, ratio);
}
function drag(event: MouseEvent) {
  if (!isDragging) return;

  const deltaY = (event.clientY - startMouseY) * ratio;

  value.value = Math.max(0, Math.min(startY - deltaY, 100));
  console.log('drag', deltaY, value.value);
}
function stopDrag() {
  isDragging = false;
}
</script>

<template>
  <div class="bui bui-slider">
    <div class="bui-area">
      <div class="bui-track bui-track-vertical">
        <div class="bui-bar-wrap">
          <div
            class="bui-bar bui-bar-normal"
            :style="{ transform: `scaleY(${value/100})` }"
          ></div>
        </div>
        <div
          class="bui-thumb"
          :style="{ left: '-5px', transform: `translateY(-${thumbDotX}px)` }"
          @mousedown="startDrag"
          @mousemove="drag"
          @mouseup="stopDrag"
          @mouseleave="stopDrag"
        >
          <div class="bui-thumb-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bui-slider {
  cursor: pointer;
  height: 12px;
}
.bui-slider .bui-track {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 2px;
  position: relative;
  width: 100%;
}
.bui-slider .bui-track.bui-track-vertical {
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  height: 100%;
  width: 2px;
}
.bui-slider .bui-track.bui-track-vertical input {
  height: 100%;
  width: 100%;
  transform: rotate(90deg);
  transform-origin: 0 0;
}
.bui-slider .bui-track .bui-bar-wrap {
  background: #e7e7e7;
  border-radius: 1.5px;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
}
.bui-slider .bui-track .bui-bar-wrap .bui-bar {
  background: #00a1d6;
  background: var(--bpx-fn-color, #00a1d6);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.bui-slider .bui-track.bui-track-vertical .bui-bar-wrap .bui-bar {
  background: #00a1d6;
  background: var(--bpx-fn-color, #00a1d6);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
}
.bui-slider .bui-track .bui-thumb {
  cursor: pointer;
}
.bui-slider .bui-track.bui-track-vertical .bui-thumb {
  bottom: 0;
  position: relative;
  top: auto;
}
.bui-slider .bui-track .bui-thumb .bui-thumb-dot {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: var(--bpx-fn-color, #00a1d6);
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 12px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  vertical-align: middle;
  width: 12px;
}
</style>
