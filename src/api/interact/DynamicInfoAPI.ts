/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type { PageQueryDynamicReq, SaveDynamicInfoReq, UpdateDynamicInfoReq } from '@/types/ApiRequestType'

export default {

  /**
   * 查询指定动态
   * @param did
   */
  get(did: number) {
    return axios.get(`/api/interact/dynamic/${did}`)
  },
  /**
   * 分页查询用户动态
   * @param query
   */
  queryUserDynamic(query: PageQueryDynamicReq) {
    return axios.get('/api/interact/dynamic/pageQueryByUid', { params: {...query } })
  },
  /**
   * 删除指定动态
   * @param did
   */
  delete(did: number) {
    return axios.delete(`/api/interact/dynamic/${did}`)
  },
  /**
   * 保存动态
   * @param body
   */
  save(body: SaveDynamicInfoReq) {
    return axios.post('/api/interact/dynamic/save', body)
  },
  /**
   * 更新动态信息
   * @param body
   */
  update(body: UpdateDynamicInfoReq) {
    return axios.put('/api/interact/dynamic/update', body)
  },
  favor(did: number, uid: number) {
    return axios.patch('/api/interact/dynamic/favor', {}, { params: { did, uid }})
  },
  favorRevoke(did: number, uid: number) {
    return axios.patch('/api/interact/dynamic/favorRevoke', {}, { params: { did, uid }})
  },
  repost(did: number, uid: number) {
    return axios.patch('/api/interact/dynamic/repost', {}, { params: { did, uid }})
  },
  comment(did: number, uid: number) {
    return axios.patch('/api/interact/dynamic/comment', {}, { params: { did, uid }})
  },

}
