/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type { PageQueryUserRelaReq, RegisterReq, UpdateUserInfoReq } from '@/types/ApiRequestType'
import type { SimpleResponse, UserInfoType, UserRelaInfoType } from '@/types/ApiRespType'

export const userInfoAPI = {

  /**
   * 获取用户信息
   * @param uid
   */
  getUserInfo(uid: string): Promise<SimpleResponse<UserInfoType>> {
    return axios.get<UserInfoType>(`/api/user/${uid}`)
  },

  queryRela(fromUid: number, toUid: number) {
    return axios.get<UserRelaInfoType>(`/api/user/isFollow`, { params: { fromUid, toUid }})
  },
  queryFollowers(query: PageQueryUserRelaReq) {
    return axios.get('/api/user/pageQueryFollowers', { params: { ...query }})
  },
  queryFans(query: PageQueryUserRelaReq) {
    return axios.get('/api/user/pageQueryFans', { params: { ...query }})
  },
  /**
   * 注册用户
   * @param req
   */
  register(req: RegisterReq) {
    return axios.post<{ success: boolean; uid: number }>('/api/user/register', req)
  },
  updateUserInfo(body: UpdateUserInfoReq) {
    return axios.put('/api/user/update', body)
  },
  unfollow(fromUid: number, toUid: number) {
    return axios.patch('/api/user/unfollow', {}, { params: { fromUid, toUid }})
  },
  follow(fromUid: number, toUid: number, special: number) {
    return axios.patch('/api/user/follow', {}, { params: { fromUid, toUid, special }})
  }
}
