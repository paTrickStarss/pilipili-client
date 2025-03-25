/*
 * Copyright (c) 2025.  Bubble
 */

import axios from '@/api/axios'
import type { AxiosProgressEvent } from 'axios';

export default {

  /**
   * 上传视频
   * @param file
   * @param onUploadProgress 上传过程回调
   * @param abortSignal
   */
  uploadVideo(
    file: File,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
    abortSignal?: AbortSignal
  ) {
    return this.uploadFile('/api/oss/video', file, onUploadProgress, abortSignal)
  },
  /**
   * 上传视频封面
   * @param file
   */
  uploadVideoCover(file: File) {
    return this.uploadFile('/api/oss/image/cover/video', file)
  },


  /**
   * 上传文件
   * @param path 接口路径
   * @param file 文件
   * @param onUploadProgress 上传过程回调
   * @param abortSignal
   */
  uploadFile(
    path: string,
    file: File,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
    abortSignal?: AbortSignal
  ) {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Connection': 'keep-alive', // Error: Refused to set unsafe header "Connection"
      },
      onUploadProgress: onUploadProgress,
      signal: abortSignal,
      timeout: 600000
    })
  }
}
