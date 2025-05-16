/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type { LoginReq } from '@/types/ApiRequestType'

export const authAPI = {
  /**
   * 用户登录
   * @param body
   */
  login(body: LoginReq) {
    return axios.get('/auth/session/login', { params: { ...body }, withCredentials: false })
  },

  /**
   * 用户登出
   * @param username
   */
  logout(username: string) {
    return axios.get('/auth/session/logout/', { params: { username } })
  },

  /**
   * 获取参数加密公钥
   */
  getPublicKey() {
    return axios.get('/auth/crypto/publicKey')
  },
}
