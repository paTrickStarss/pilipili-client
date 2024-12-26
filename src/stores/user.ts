/*
 * Copyright (c) 2024. Bubble
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { UserInfoType } from '@/utils/PropsType'

export const useUserStore = defineStore('user', () => {
  const uid = ref<number>(0)
  const username = ref<string>('')
  const spaceUrl = ref<string>('')
  const gender = ref<number>(0)
  const desc = ref<string>('')
  const password = ref<string>('')
  const avatarUrl = ref<string>('')

  const userInfo = computed(() => {
    return {
      uid,
      username,
      spaceUrl,
      gender,
      desc,
    }
  })

  /**
   * 清空用户信息
   */
  function clearUserInfo() {
    uid.value = 0
    username.value = ''
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
    uid.value = userInfo.uid
    username.value = userInfo.username
    spaceUrl.value = userInfo.spaceUrl
    gender.value = userInfo.gender
    desc.value = userInfo.desc || ''
  }

  return {
    uid,
    username,
    spaceUrl,
    desc,
    avatarUrl,
    userInfo,
    clearUserInfo,
    fetchDemoUserInfo,
    saveUserInfo,
  }
})
