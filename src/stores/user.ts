/*
 * Copyright (c) 2024. Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { UserInfoType } from '@/types/ApiRespType'
import { userInfoAPI } from '@/api/user/UserInfoAPI'
import { message } from 'ant-design-vue'
import { useTokenStore } from '@/stores/token'

export const useUserStore = defineStore('user', () => {
  // const isLogin = ref(false)
  const uid = ref<number>(0)
  const uuid = ref<string>('')
  const nickname = ref<string>('')
  const gender = ref<number>(0)
  const avatarUrl = ref<string>('')
  const backgroundUrl = ref<string>('')
  const email = ref<string>('')
  const description = ref<string>('')
  const vipStatus = ref<number>(0)
  const authority = ref<number>(0)
  const authorityDesc = ref<string>('')
  const validStatus = ref<number>(0)
  const role = ref<number>(0)
  const exp = ref<number>(0)
  const hcoin = ref<number>(0)
  const pcoin = ref<number>(0)
  const level = ref<number>(0)

  const userInfo = computed(() => {
    return {
      uid,
      uuid,
      nickname,
      gender,
      avatarUrl,
      backgroundUrl,
      email,
      description,
      vipStatus,
      authority,
      authorityDesc,
      validStatus,
      role,
      exp,
      hcoin,
      pcoin,
      level,
      spaceUrl,
    }
  })

  const spaceUrl = computed(() => {
    return `/space/${uid.value}`
  })

  const isLogin = computed(() => {
    return uid.value !== 0
  })

  /**
   * 清空用户信息
   */
  function clearUserInfo() {
    // isLogin.value = false
    uid.value = 0
    nickname.value = ''
    gender.value = 0
    description.value = ''
    avatarUrl.value = ''
  }

  /**
   * 获取测试用户信息
   */
  function fetchDemoUserInfo() {
    uid.value = 233
    nickname.value = 'Bubble'
    gender.value = 1
    description.value = 'This is Bubble speaking.'
    avatarUrl.value = 'hhh'
  }

  /**
   * 保存用户信息
   * @param userInfo 保存的用户信息
   */
  function saveUserInfo(userInfo: UserInfoType) {
    // isLogin.value = true
    uid.value = userInfo.uid
    uuid.value = userInfo.uuid
    nickname.value = userInfo.nickname
    gender.value = userInfo.gender
    avatarUrl.value = userInfo.avatarUrl
    backgroundUrl.value = userInfo.backgroundUrl
    email.value = userInfo.email
    description.value = userInfo.description
    vipStatus.value = userInfo.vipStatus
    authority.value = userInfo.authority
    authorityDesc.value = userInfo.authorityDesc
    validStatus.value = userInfo.validStatus
    role.value = userInfo.role
    exp.value = userInfo.exp
    hcoin.value = userInfo.hcoin
    pcoin.value = userInfo.pcoin
    level.value = userInfo.level
  }

  /**
   * 获取当前用户信息
   */
  async function fetchCurrentUserInfo() {
    const token = useTokenStore()
    if (token.isLogin) {
      userInfoAPI.getUserInfo(token.username)
        .then(({ data }) => {
          saveUserInfo(data)
          message.success('getUserInfo success')
          console.log('userInfo', data)
        })
    }
  }

  return {
    isLogin,
    uid,
    nickname,
    spaceUrl,
    description,
    avatarUrl,
    vipStatus,
    userInfo,
    clearUserInfo,
    fetchDemoUserInfo,
    saveUserInfo,
    fetchCurrentUserInfo,
  }
})
