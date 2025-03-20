/*
 * Copyright (c) 2025.  Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginInfoType } from '@/types/ApiRespType'
// import type { StorageLike } from 'pinia-plugin-persistedstate'
// import Cookies from 'js-cookie'
//
// const cookiesStorage: StorageLike = {
//   setItem(key: string, value: string) {
//     Cookies.set(key, value)
//       // { path: '/', expires: Number(data.expires)/(24*60*60), secure: true, httpOnly: false })
//   },
//   getItem(key: string) {
//     return Cookies.get(key) || null
//   }
// }

export const useTokenStore = defineStore(
  'tokenInfo',
  () => {
    const tokenInfo = ref<LoginInfoType>()

    const isLogin = computed(() => {
      return tokenInfo.value != undefined
    })
    const accessToken = computed(() => {
      return tokenInfo.value?.accessToken || ''
    })
    const username = computed(() => {
      return tokenInfo.value?.username || ''
    })
    const uid = computed(() => {
      return Number(tokenInfo.value?.username) || 0
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
      username,
      uid,
      saveTokenInfo,
      clearTokenInfo,
    }
  },
  {
    persist: {
      key: 'tokenInfo',
      storage: localStorage,
    },
  },
)
