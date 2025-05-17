/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type { CreateVideoInfoReq, PageQueryVideoInfoReq, UpdateVideoInfoReq } from '@/types/ApiRequestType'
import type { PageResponse, SimpleResponse } from '@/types/ApiRespType'

export default {

  get(vid: number): Promise<SimpleResponse> {
    return axios.get(`/api/video/${vid}`)
  },
  /**
   * 查询用户视频互动状态
   * @param vid
   * @param uid
   */
  getUserVideo(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.get('/api/video/getUserVideo', { params: { vid, uid }})
  },
  /**
   * 分页查询视频（搜索引擎）
   * @param query
   */
  pageQuery(query: PageQueryVideoInfoReq): Promise<PageResponse> {
    return axios.get(`/api/video/pageQuery`, { params: { ...query } })
  },
  /**
   * 分页查询用户所有已上架视频（对外展示用）
   * @param query
   */
  pageQueryPassedByUid(query: PageQueryVideoInfoReq): Promise<PageResponse> {
    return axios.get(`/api/video/pageQueryPassedByUid`, { params: { ...query } })
  },
  /**
   * 分页查询用户所有视频（用户个人用，查询状态为 上传中、审核中、审核通过 的视频）
   * @param query
   */
  pageQueryByUid(query: PageQueryVideoInfoReq): Promise<PageResponse> {
    return axios.get(`/api/video/pageQueryByUid`, { params: { ...query } })
  },
  /**
   * 分页查询用户所有视频（管理员用，查询所有状态的视频）
   * @param query
   */
  pageQueryAllByUid(query: PageQueryVideoInfoReq): Promise<PageResponse> {
    return axios.get(`/api/video/pageQueryAllByUid`, { params: { ...query } })
  },
  delete(vid: string): Promise<SimpleResponse> {
    return axios.delete(`/api/video/${vid}`)
  },
  update(body: UpdateVideoInfoReq): Promise<SimpleResponse> {
    return axios.put('/api/video/update', body)
  },
  updateAdmin(body: UpdateVideoInfoReq): Promise<SimpleResponse> {
    return axios.put('/api/video/updateAdmin', body)
  },
  save(body: CreateVideoInfoReq): Promise<SimpleResponse> {
    return axios.post('/api/video/save', body)
  },
  repost(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/repost', {}, { params: { vid, uid } })
  },
  repostRevoke(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/repostRevoke', {}, { params : { vid, uid } })
  },
  triple(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/triple', {}, { params: { vid, uid } })
  },
  favor(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/favor', {}, { params: { vid, uid } })
  },
  favorRevoke(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/favorRevoke', {}, { params: { vid, uid } })
  },
  dew(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/dew', {}, { params: { vid, uid } })
  },
  dewRevoke(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/dewRevoke', {}, { params: { vid, uid } })
  },
  collect(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/collect', {}, { params: { vid, uid } })
  },
  collectRevoke(vid: number, uid: number) : Promise<SimpleResponse>{
    return axios.patch('/api/video/collectRevoke', {}, { params: { vid, uid } })
  },
  coin(vid: number, uid: number): Promise<SimpleResponse> {
    return axios.patch('/api/video/coin', {}, { params: { vid, uid } })
  },

  categoryList(): Promise<SimpleResponse> {
    return axios.get('/api/video/categoryList')
  },
}
