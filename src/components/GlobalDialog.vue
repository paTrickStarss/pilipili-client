<!--
  - Copyright (c) 2025. Bubble
  -->

<script setup lang="ts">

defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: false,
  },
})

defineEmits({
  closeDialog: () => true,
})
</script>

<template>
  <transition name="dialog-fade">
    <div class="dialog-container" v-if="visible">
      <div class="dialog-content">
        <div class="close-icon" @click="$emit('closeDialog')">
        </div>
        <div class="dialog-header">
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
  z-index: 1000;
}

.dialog-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background: white;
  padding: 52px 65px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 600px;
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
  position: absolute;
  width: 32px;
  height: 32px;
  right: 20px;
  top: 20px;
  background: url("../assets/icons/close.svg");
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
