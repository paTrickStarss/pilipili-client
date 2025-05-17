/*
 * Copyright (c) 2025.  Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginInfoType } from '@/types/ApiRespType'
// import type { StorageLike } from 'pinia-plugin-persistedstate'
// import Cookies from 'js-cookie'

// const cookiesStorage: StorageLike = {
//   setItem(key: string, value: string) {
//     const obj = JSON.parse(value)
//     const accessToken = 'Baerer ' + obj.tokenInfo.accessToken
//     const expires = obj.tokenInfo.expires ? Number(obj.tokenInfo.expires)/(60*60*24) : 30
//     console.log('setItem', key, obj, obj.tokenInfo.expires, expires)
//     Cookies.set(key, accessToken,
//       { path: '/', expires: expires, secure: true, httpOnly: false })
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
    const isAdmin = computed(() => {
      return tokenInfo.value?.admin || false
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
      isAdmin,
      saveTokenInfo,
      clearTokenInfo,
    }
  },
  {
    persist: [
      {
        key: 'tokenInfo',
        storage: localStorage,
      },
      // {
      //   key: 'access_token',
      //   storage: cookiesStorage
      // },
    ]
  },
)
