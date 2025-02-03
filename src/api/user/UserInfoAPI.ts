/*
 * Copyright (c) 2025. Bubble
 */

import axios from '@/api/axios'
import type { RegisterReq } from '@/types/ApiRequestType'

export const userInfoAPI = {

  /**
   * 注册用户
   * @param req
   */
  register(req: RegisterReq) {
    return axios.post('/api/user/register', req)
  },

  /**
   * 获取用户信息
   * @param uid
   */
  getUserInfo(uid: string) {
    return axios.get('/api/user/getUser', { params: { uid: uid } })
  }
}
