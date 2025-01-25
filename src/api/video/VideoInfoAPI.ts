/*
 * Copyright (c) 2025. Bubble
 */

import axios from '@/api/axios'

export default {
  getVideoInfo(vid: string) {
    return axios.get('/api/video/getVideoInfo/', { params: { vid }})
  }
}
