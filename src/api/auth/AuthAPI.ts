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
    return axios.post('/auth/session/login', body, { withCredentials: false })
  },

  /**
   * 用户登出
   * @param username
   */
  logout(username: string) {
    return axios.get('/auth/session/logout/', { params: { username } })
  },
}
