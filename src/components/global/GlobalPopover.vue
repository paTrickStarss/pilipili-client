<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import type { CSSProperties } from 'vue'
const props = withDefaults(defineProps<{
  position?: string; wrapClass?: string; contentClass?: string;
  contentStyle?: CSSProperties; popProhibit?: boolean;
}>(), { position: 'bottom', wrapClass: '', contentClass: '', popProhibit: false })
const emit = defineEmits<{ mouseenter: []; mouseleave: [] }>()
const visible = ref(false)
const triggerRef = ref<HTMLElement>()
const popoverRef = ref<HTMLElement>()
const placement = ref<CSSProperties>({ left: '0px', top: '0px' })
let timer: ReturnType<typeof setTimeout> | undefined
let observer: ResizeObserver | undefined

function positionPopover() {
  const trigger = triggerRef.value?.getBoundingClientRect()
  const pop = popoverRef.value?.getBoundingClientRect()
  if (!trigger || !pop) return
  const maxX = document.documentElement.clientWidth - pop.width - 8
  const maxY = window.innerHeight - pop.height - 8
  let left = trigger.left + (trigger.width - pop.width) / 2
  let top = trigger.bottom + 12
  if (props.position === 'top' || top > maxY) top = trigger.top - pop.height - 12
  if (props.position === 'left') left = trigger.left - pop.width - 12
  if (props.position === 'right') left = trigger.right + 12
  placement.value = { left: `${Math.max(8, Math.min(left, maxX))}px`, top: `${Math.max(8, Math.min(top, maxY))}px` }
}
function cleanup() {
  clearTimeout(timer)
  window.removeEventListener('resize', positionPopover)
  window.removeEventListener('scroll', hidePopover, true)
  observer?.disconnect()
}
async function showPopover() {
  clearTimeout(timer)
  if (props.popProhibit || visible.value) return
  visible.value = true
  emit('mouseenter')
  await nextTick()
  if (!visible.value) return
  positionPopover()
  window.addEventListener('resize', positionPopover)
  window.addEventListener('scroll', hidePopover, true)
  observer = new ResizeObserver(positionPopover)
  if (popoverRef.value) observer.observe(popoverRef.value)
}
function hidePopover(event?: Event) {
  if (event && popoverRef.value?.contains(event.target as Node)) return
  cleanup()
  visible.value = false
  emit('mouseleave')
}
function mouseTriggerEnter() { clearTimeout(timer); timer = setTimeout(showPopover, 200) }
function mouseTriggerLeave() { clearTimeout(timer); timer = setTimeout(hidePopover, 250) }
function mouseContentEnter() { clearTimeout(timer) }
function mouseContentLeave() { mouseTriggerLeave() }
function onFocusOut(event: FocusEvent) {
  if (!popoverRef.value?.contains(event.relatedTarget as Node) && !triggerRef.value?.contains(event.relatedTarget as Node)) mouseTriggerLeave()
}
onBeforeUnmount(cleanup)
</script>

<template>
  <li class="v-popover-wrap" :class="wrapClass" style="">
    <div
      class="trigger"
      ref="triggerRef"
      @focusin="showPopover"
      @focusout="onFocusOut"
      @keydown.esc="hidePopover()"
      @mouseenter="mouseTriggerEnter"
      @mouseleave="mouseTriggerLeave"
    >
      <slot name="trigger">
        <button>trigger</button>
      </slot>
    </div>

    <Teleport to="body">
    <transition name="fade">
      <div
        class="v-popover"
        ref="popoverRef"
        v-show="!popProhibit && visible"
        @mouseenter="mouseContentEnter"
        @mouseleave="mouseContentLeave"
        :style="placement"
        @focusin="mouseContentEnter"
        @focusout="onFocusOut"
        @keydown.esc="hidePopover()"
      >
        <div
          class="v-popover-content"
          :style="contentStyle"
          :class="contentClass"
        >
          <slot>Content...</slot>
        </div>
      </div>
    </transition>
    </Teleport>
  </li>
</template>

<style>
.trigger {
  position: relative;
}

.trigger a svg {
  transition: all 0.3s;
}

.trigger:hover a svg {
  transform: translate(0, -5px);
}

.v-popover-wrap {
  position: relative;
  --text-color: var(--text_white);
  --icon-color: var(--text_white);
}

.pili-header .slide-down .v-popover-wrap {
  --text-color: var(--text1);
  --icon-color: var(--text1);
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
  padding: 0 4px;
  min-width: 15px;
  border-radius: 10px;
  background-color: #fa5a57;
  color: #fff;
  font-size: 12px;
  line-height: 15px;
}

.v-popover {
  position: fixed;
  z-index: var(--layer-popover);
  max-width: calc(100vw - 16px);
  max-height: calc(100dvh - 16px);
}

.v-popover-content {
  max-width: calc(100vw - 16px);
  max-height: calc(100dvh - 32px);
  overflow: auto;
  position: relative;
  background-color: var(--bg1_float);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid var(--line_regular);
  color: var(--text1);
}

.header-favorite-popover {
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
