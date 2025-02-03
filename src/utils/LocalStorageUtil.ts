/*
 * Copyright (c) 2025. Bubble
 */

import type { LoginInfoType } from '@/types/ApiRespType'

export const LocalStorageUtil = {
  /**
   * 保存用户Token信息到LocalStorage
   * @param data
   */
  saveTokenInfo(data: LoginInfoType) {
    localStorage.setItem("loginInfo", JSON.stringify(data))
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("username", data.username)
  },

  /**
   * 从LocalStorage中清除用户Token信息
   */
  clearTokenInfo() {
    localStorage.removeItem("loginInfo")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("username")
  },

  /**
   * 从LocalStorage中获取用户Token信息
   */
  getTokenInfo(): LoginInfoType {
    return JSON.parse(localStorage.getItem("loginInfo") || '')
  },

  /**
   * 用户是否已登录
   */
  isLogin() {
    return !!localStorage.getItem("username")
  },

}


