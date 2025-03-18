/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type { RegisterReq, UpdateUserInfoReq } from '@/types/ApiRequestType'

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
    return axios.get(`/api/user/${uid}`)
  },
  updateUserInfo(body: UpdateUserInfoReq) {
    return axios.put('/api/user/update', body)
  },
}
