import { computed, reactive, ref, toRefs } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from '@/types/ApiRespType'
import { userInfoAPI } from '@/api/user/UserInfoAPI'
import { useTokenStore } from '@/stores/token'

function emptyUser(): UserInfoType {
  return {
    uid: 0, nickname: '', gender: 0, avatarUrl: '', backgroundUrl: '', email: '',
    description: '', vipStatus: 0, authority: 0, authorityDesc: '', validStatus: 0,
    role: 0, exp: 0, hcoin: 0, pcoin: 0, level: 0, followerCount: 0, fansCount: 0,
    dynamicCount: 0, uuid: '', favoredCount: 0,
  }
}

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive(emptyUser())
  const isFetching = ref(false)
  let requestVersion = 0
  const spaceUrl = computed(() => `/space/${userInfo.uid}`)
  const isLogin = computed(() => useTokenStore().isLogin && userInfo.uid !== 0)

  function clearUserInfo() {
    requestVersion++
    Object.assign(userInfo, emptyUser())
    isFetching.value = false
  }

  function saveUserInfo(info: UserInfoType) {
    Object.assign(userInfo, emptyUser(), info)
  }

  async function fetchCurrentUserInfo() {
    const token = useTokenStore()
    if (!token.isLogin) {
      clearUserInfo()
      return
    }
    const version = ++requestVersion
    const session = token.accessToken
    isFetching.value = true
    try {
      const { data } = await userInfoAPI.getUserInfo(token.username)
      if (version === requestVersion && session === token.accessToken) saveUserInfo(data)
      return data
    } finally {
      if (version === requestVersion) isFetching.value = false
    }
  }

  return { ...toRefs(userInfo), userInfo, isFetching, spaceUrl, isLogin,
    clearUserInfo, saveUserInfo, fetchCurrentUserInfo }
})
