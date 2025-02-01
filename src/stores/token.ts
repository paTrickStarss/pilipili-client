/*
 * Copyright (c) 2025. Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginInfoType } from '@/types/ApiRespType'

export const useTokenStore = defineStore('tokenInfo', () => {
  const tokenInfo = ref<LoginInfoType>()

  const isLogin = computed(() => {
    return tokenInfo.value != undefined
  })
  const accessToken = computed(() => {
    return tokenInfo.value?.accessToken || ''
  })

  function saveTokenInfo(tokenInfoSave: LoginInfoType) {
    tokenInfo.value = tokenInfoSave
  }

  function clearTokenInfo() {
    tokenInfo.value = undefined
  }

  return {
    tokenInfo,
    isLogin,
    accessToken,
    saveTokenInfo,
    clearTokenInfo,
  }
}, {
  persist: {
    key: 'tokenInfo',
    storage: localStorage,
  }
})
