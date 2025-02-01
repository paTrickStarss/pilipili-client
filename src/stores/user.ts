/*
 * Copyright (c) 2024. Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { UserInfoType } from '@/types/ApiRespType'

export const useUserStore = defineStore('user', () => {
  // const isLogin = ref(false)
  const uid = ref<number>(0)
  const username = ref<string>('')
  const nickname = ref<string>('')
  const spaceUrl = ref<string>('')
  const gender = ref<number>(0)
  const desc = ref<string>('')
  const password = ref<string>('')
  const avatarUrl = ref<string>('')

  const userInfo = computed(() => {
    return {
      uid,
      username,
      nickname,
      spaceUrl,
      gender,
      desc,
    }
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
    username.value = ''
    nickname.value = ''
    spaceUrl.value = ''
    gender.value = 0
    desc.value = ''
    password.value = ''
    avatarUrl.value = ''
  }

  /**
   * 获取测试用户信息
   */
  function fetchDemoUserInfo() {
    uid.value = 233
    username.value = 'Bubble'
    nickname.value = 'Bubble'
    spaceUrl.value = 'https://space.bilibili.com/472980323'
    gender.value = 1
    desc.value = 'This is Bubble speaking.'
    password.value = 'xxx'
    avatarUrl.value = 'hhh'
  }

  /**
   * 保存用户信息
   * @param userInfo 保存的用户信息
   */
  function saveUserInfo(userInfo: UserInfoType) {
    // isLogin.value = true
    uid.value = userInfo.uid
    username.value = userInfo.nickname
    nickname.value = userInfo.nickname
    spaceUrl.value = userInfo.uid.toString()
    gender.value = userInfo.gender
    desc.value = userInfo.description || ''
  }

  return {
    isLogin,
    uid,
    username,
    nickname,
    spaceUrl,
    desc,
    avatarUrl,
    userInfo,
    clearUserInfo,
    fetchDemoUserInfo,
    saveUserInfo,
  }
})
