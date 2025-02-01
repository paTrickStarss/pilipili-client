/*
 * Copyright (c) 2025. Bubble
 */

import type { LoginInfoType } from '@/types/ApiRespType'

/**
 * 保存用户Token信息到LocalStorage
 * @param data
 */
export function saveTokenInfo(data: LoginInfoType) {
  localStorage.setItem("loginInfo", JSON.stringify(data))
  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("username", data.username)
}

/**
 * 从LocalStorage中清除用户Token信息
 */
export function clearTokenInfo() {
  localStorage.removeItem("loginInfo")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("username")
}

/**
 * 从LocalStorage中获取用户Token信息
 */
export function getTokenInfo(): LoginInfoType {
  return JSON.parse(localStorage.getItem("loginInfo") || '')
}

/**
 * 用户是否已登录
 */
export function isLogin() {
  return !!localStorage.getItem("username")
}
