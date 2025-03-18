/*
 * Copyright (c) 2025.  Bubble
 */


import axios from 'axios'
import type { PageQueryVideoDanmakuReq, SaveDanmakuInfoReq } from '@/types/ApiRequestType'

export default {

  pageQueryVideoDanmaku(query: PageQueryVideoDanmakuReq) {
    return axios.get('/api/interact/danmaku/pageQueryByVid', { params: { ...query } })
  },
  pageQueryVideoUserDanmaku(query: PageQueryVideoDanmakuReq) {
    return axios.get('/api/interact/danmaku/pageQueryByVidAndUid', { params: { ...query } })
  },
  pageQueryUserDanmaku(query: PageQueryVideoDanmakuReq) {
    return axios.get('/api/interact/danmaku/pageQueryByUid', { params: { ...query } })
  },
  save(body: SaveDanmakuInfoReq) {
    return axios.post('/api/interact/danmaku/save', body )
  },
  delete(danmakuId: number) {
    return axios.delete(`/api/interact/danmaku/${danmakuId}`)
  },
  favor(danmakuId: number, uid: number) {
    return axios.patch('/api/interact/danmaku/favor', {},{ params: { danmakuId, uid }})
  },
  favorRevoke(danmakuId: number, uid: number) {
    return axios.patch('/api/interact/danmaku/favorRevoke', {},{ params: { danmakuId, uid }})
  },
  dew(danmakuId: number, uid: number) {
    return axios.patch('/api/interact/danmaku/dew', {},{ params: { danmakuId, uid }})
  },
  dewRevoke(danmakuId: number, uid: number) {
    return axios.patch('/api/interact/danmaku/dewRevoke', {},{ params: { danmakuId, uid }})
  }
}
