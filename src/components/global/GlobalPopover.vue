<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  position: {
    type: String,
    default: 'bottom'
  },
  wrapClass: {
    default: ''
  },
  contentClass: {
    default: ''
  },
  contentStyle: {
    default: {}
  },
  popProhibit: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits({
  mouseenter: () => true,
  mouseleave: () => true,
})
// const visible = defineModel<boolean>('visible',
//   { required: true, default: false })
const visible = ref<boolean>(false)
let triggerEnter: boolean = false;
let contentEnter: boolean = false;

function showPopover() {
  visible.value = true
  emit('mouseenter')
}
function hidePopover() {
  visible.value = false
  emit('mouseleave')
}
function mouseTriggerEnter() {
  triggerEnter = true
  setTimeout(() => {
    if (triggerEnter && !contentEnter) {
      showPopover()
    }
  }, 200)

}
function mouseTriggerLeave() {
  triggerEnter = false
  setTimeout(() => {
    if (!contentEnter) {
      hidePopover()
    }
  }, 1000)
}
function mouseContentEnter() {
  contentEnter = true
}
function mouseContentLeave() {
  contentEnter = false
  if (!triggerEnter) {
    hidePopover()
  }
}
// style="--text-color: var(--text2); --icon-color: var(--text1);"

</script>

<template>
  <li class="v-popover-wrap" :class="wrapClass" style="--text-color: var(--text_white); --icon-color: var(--text_white);">
    <div
      class="trigger"
      ref="triggerRef"
      @mouseenter="mouseTriggerEnter"
      @mouseleave="mouseTriggerLeave"
    >
      <slot name="trigger"><button>trigger</button></slot>
    </div>

    <transition name="fade">
      <div
        class="v-popover"
        ref="popoverRef"
        v-show="!popProhibit && visible"
        @mouseenter="mouseContentEnter"
        @mouseleave="mouseContentLeave"
        :class="`position-${position}`"
      >
        <div class="v-popover-content" :style="contentStyle" :class="contentClass">
          <slot>Content...</slot>
        </div>
      </div>

    </transition>
  </li>
</template>

<style>
.trigger {
  position: relative;
}
.trigger a svg {
  transition: all .3s;
}
.trigger a svg:hover {
  transform: translate(0, -5px);
}
.v-popover-wrap {
  position: relative;
}
.pili-header .right-entry .right-entry-item {
  display: block;
  flex-shrink: 0;
  margin-right: 4px;
  min-width: 50px;
  text-align: center;
  cursor: pointer;
}
.header-avatar-wrap {
  position: relative;
  box-sizing: content-box;
  padding-right: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.header-avatar-wrap .header-avatar-wrap--container {
  position: relative;
  z-index: 2;
}
.pili-header .right-entry .right-entry-item--upload {
  margin: 0;
}
.pili-header .right-entry--message {
  position: relative;
}
.trigger .right-entry__outside {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 0;
  min-width: 50px;
  text-align: center;
  font-size: 13px;
}
.trigger .right-entry-text {
  word-break: keep-all;
  line-height: 1.25;
}
.trigger .right-entry__outside .right-entry-text {
  color: var(--text-color);
}
.trigger .right-entry__outside .right-entry-icon {
  margin-bottom: 2px;
  color: var(--icon-color);
  -webkit-font-smoothing: antialiased;
}
.pili-header .red-point--message {
  position: absolute;
  top: 0;
  left: 35px;
  z-index: 1;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fa5a57;
  color: #fff;
}
.pili-header .red-num--message {
  position: absolute;
  top: -6px;
  left: 25px;
  z-index: 1;
  padding: 0 3px;
  min-width: 15px;
  border-radius: 10px;
  background-color: #fa5a57;
  color: #fff;
  font-size: 12px;
  line-height: 15px;
}


.v-popover {
  position: absolute;
  transition: .3s;
  z-index: 1;
}
.v-popover-content {
  position: relative;
  background-color: var(--bg1_float);
  box-shadow: 0 0 30px rgba(0,0,0,.1);
  border-radius: 8px;
  border: 1px solid var(--line_regular);
  color: var(--text1);
}
.header-favorite-popover {
  overflow: hidden;
}

.position-top,
.position-bottom {
  transform: translate3d(-50%,0,0);
}
.position-top {
  margin-bottom: 15px;
  bottom: 100%;
  left: 50%;
}
.position-bottom {
  margin-top: 15px;
  top: 100%;
  left: 50%;
}

.position-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.position-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
