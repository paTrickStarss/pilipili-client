<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  position: {
    type: String,
    default: 'bottom'
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
  if (!contentEnter) {
    showPopover()
  }
}
function mouseTriggerLeave() {
  triggerEnter = false
  setTimeout(() => {
    if (!contentEnter) {
      hidePopover()
    }
  }, 1)
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
  <div class="popover-container">
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
        class="popover-content"
        ref="popoverRef"
        v-show="visible"
        @mouseenter="mouseContentEnter"
        @mouseleave="mouseContentLeave"
        :class="`position-${position}`"
      >
        <slot>Content...</slot>
      </div>

    </transition>
  </div>
</template>

<style scoped>
.popover-container {
  position: relative;
  display: inline-block;
}

.trigger {
  cursor: pointer;
}

.popover-content {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.position-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.position-bottom {
  margin-top: 10px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
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
