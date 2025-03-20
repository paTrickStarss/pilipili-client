/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type { PageQueryCommentReq, SaveCommentInfoReq } from '@/types/ApiRequestType'

export default {

  get(cid: number) {
    return axios.get(`/api/interact/comment/${cid}`)
  },
  delete(cid: number) {
    return axios.delete(`/api/interact/comment/${cid}`)
  },
  /**
   * 分页查询评论回复
   * 指定relaId和relaType
   * @param query
   */
  pageQueryCommentReply(query: PageQueryCommentReq) {
    return axios.get('/api/interact/comment/pageQueryCommentReply', { params: {...query } })
  },
  /**
   * 分页查询某对象评论
   * 指定parentRootId
   * @param query
   */
  pageQueryByRela(query: PageQueryCommentReq) {
    return axios.get('/api/interact/comment/pageQueryByRela', { params: {...query } })
  },
  save(body: SaveCommentInfoReq) {
    return axios.post('/api/interact/comment/save', body)
  },
  favor(cid: number, uid: number) {
    return axios.patch('/api/interact/comment/favor', {}, { params: { cid, uid }})
  },
  favorRevoke(cid: number, uid: number) {
    return axios.patch('/api/interact/comment/favorRevoke', {}, { params: { cid, uid }})
  },
  dew(cid: number, uid: number) {
    return axios.patch('/api/interact/comment/dew', {}, { params: { cid, uid }})
  },
  dewRevoke(cid: number, uid: number) {
    return axios.patch('/api/interact/comment/dewRevoke', {}, { params: { cid, uid }})
  },
}
