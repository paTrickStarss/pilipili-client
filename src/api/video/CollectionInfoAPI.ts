/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type {
  ChangeCollectionVideoReq,
  PageQueryCollectionInfoReq, PageQueryCollectionVideoReq,
  SaveCollectionInfoReq,
  UpdateCollectionInfoReq
} from '@/types/ApiRequestType'

export default {

  save(body: SaveCollectionInfoReq) {
    return axios.post('/api/video/collection/save', body)
  },
  update(body: UpdateCollectionInfoReq) {
    return axios.put('/api/video/collection/update', body)
  },
  saveVideo(body: ChangeCollectionVideoReq) {
    return axios.post('/api/video/collection/saveVideo', body)
  },
  get(id: number) {
    return axios.put(`/api/video/collection/${id}`)
  },
  delete(id: number) {
    return axios.delete(`/api/video/collection/${id}`)
  },
  queryUserCollection(query: PageQueryCollectionInfoReq) {
    return axios.get('/api/video/collection/query', { params: { ...query } })
  },
  queryCollectionVideo(query: PageQueryCollectionVideoReq) {
    return axios.get('/api/video/collection/queryVideo', { params: { ...query } })
  },
  deleteCollectionVideo(params: ChangeCollectionVideoReq) {
    return axios.delete('/api/video/collection/deleteVideo', { params: { ...params } })
  }
}
