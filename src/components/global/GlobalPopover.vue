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

</script>

<template>
  <div class="v-popover-wrap" :class="wrapClass">
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
        v-show="visible"
        @mouseenter="mouseContentEnter"
        @mouseleave="mouseContentLeave"
        :class="`position-${position}`"
      >
        <div class="v-popover-content" :style="contentStyle" :class="contentClass">
          <slot>Content...</slot>
        </div>
      </div>

    </transition>
  </div>
</template>

<style scoped>
/*.popover-container {
  position: relative;
  !*display: inline-block;*!
}

.trigger {
  cursor: pointer;
}

.popover {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}*/

.v-popover-wrap {
  position: relative;
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
.bili-header .right-entry--message {
  position: relative;
}
.right-entry__outside {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 0;
  min-width: 50px;
  text-align: center;
  font-size: 13px;
}
.bili-header .red-point--message {
  position: absolute;
  top: 0px;
  left: 35px;
  z-index: 1;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fa5a57;
  color: #fff;
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
