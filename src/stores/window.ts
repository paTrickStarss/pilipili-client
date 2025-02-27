/*
 * Copyright (c) 2025.  Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useWindowStore = defineStore('window', () => {
  const slideDown = ref<boolean>(false)

  const slideDownComputed = computed(() => {
    return slideDown.value
  })

  function setSlideDown(value: boolean) {
    slideDown.value = value
  }

  return {
    slideDown,
    slideDownComputed,
    setSlideDown,
  }
})
