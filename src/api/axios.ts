/*
 * Copyright (c) 2024-2025.  Bubble
 */

import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import { message } from 'ant-design-vue'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

axiosInstance.interceptors.request.use(
  config => {
    // Do something before request...
    if (!config.url?.includes('/login')
      && !config.url?.includes('/register')
      && !config.url?.includes('/publicKey')
    ) {
      config.headers['Authorization'] = `Bearer ${useTokenStore().accessToken}`
    }
    return config
  },
  error => {
    // Catch request error

    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => {
    // HttpStatus 2xx
    const { data } = response
    // console.log('response', data)
    if (data == null) {
      return Promise.reject(response)
    }

    const { code, msg } = data
    switch (code) {
      case 400:
      case 500:
        return Promise.reject(msg)
    }

    return data
  },
  error => {
    // HttpStatus 3xx 4xx 5xx

    let msg = 'API error'
    switch (error.response.status) {
      case 401: {
        msg += ': 登录状态失效! 请重新登录'
        // 清除登录状态
        useTokenStore().clearTokenInfo()
        break
      }
      case 403: {
        msg += ': Forbidden!'
        break
      }
      case 404: {
        msg += ': Not Found!'
        break
      }
      default: {
        msg += '!'
      }
    }
    message.error(msg)
    // console.error(error.response)

    return Promise.reject(error)
  },
)

export default axiosInstance
