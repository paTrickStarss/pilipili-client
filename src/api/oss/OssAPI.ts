/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'

export default {

  uploadVideo(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post('/api/oss/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
