<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
const props = withDefaults(defineProps<{ visible: boolean; width?: number }>(), { width: 600 })
const emit = defineEmits<{ closeDialog: [] }>()
const dialog = ref<HTMLElement>()
const titleId = useId()
let previousFocus: HTMLElement | null = null
let previousOverflow: string | undefined
function release() {
  if (previousOverflow !== undefined) document.body.style.overflow = previousOverflow
  previousOverflow = undefined
  previousFocus?.focus()
  previousFocus = null
}
watch(() => props.visible, async visible => {
  if (!visible) { release(); return }
  previousFocus = document.activeElement as HTMLElement
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  await nextTick()
  dialog.value?.focus()
}, { immediate: true })
onBeforeUnmount(release)
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') { event.stopPropagation(); emit('closeDialog') }
  if (event.key !== 'Tab') return
  const elements = [...(dialog.value?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]') || [])].filter(el => !el.hasAttribute('disabled') && el.getClientRects().length)
  const first = elements[0]
  const last = elements[elements.length - 1]
  if (!first) { event.preventDefault(); return }
  if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.value)) {
    event.preventDefault(); last?.focus()
  } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.value)) {
    event.preventDefault(); first.focus()
  }
}
</script>

<template>
  <Teleport to="body">
  <transition name="dialog-fade">
    <div class="dialog-container" v-if="visible">
      <div ref="dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId" tabindex="-1" @keydown="onKeydown" class="dialog-content" :style="{ width: `${width}px` }">
        <button type="button" aria-label="关闭对话框" class="close-icon" @click="$emit('closeDialog')"></button>
        <div :id="titleId" class="dialog-header">
          <slot name="header">Title</slot>
        </div>
        <div class="dialog-body">
          <slot name="default">Body</slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer">
            <button class="button" @click="$emit('closeDialog')">关闭</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
  </Teleport>
</template>

<style scoped>
.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--layer-dialog);
  padding: 16px;
}

.dialog-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background: white;
  padding: 52px clamp(16px, 5vw, 65px) 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 600px;
  max-width: 100%;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
}

.dialog-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  font-size: 18px;
}

.button {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}

.dialog-body {
  margin-bottom: 15px;
}

.dialog-footer {
  text-align: right;
}

.close-icon {
  border: 0;
  position: absolute;
  width: 32px;
  height: 32px;
  right: 20px;
  top: 20px;
  background: url('../../assets/icons/close.svg');
  background-size: contain;
  cursor: pointer;
  z-index: 2;
}

/* 进入和离开的动画 */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
  transform: translate(0, 20px);
}
</style>
