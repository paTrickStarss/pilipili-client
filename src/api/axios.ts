/*
 * Copyright (c) 2024. Bubble
 */

import axios from 'axios'
import { useTokenStore } from '@/stores/token'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  // Do something before request...
  if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
    config.headers['Authorization'] = `Bearer ${useTokenStore().accessToken}`
  }
  return config
}, (error) => {
  // Catch request error

  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
  // HttpStatus 2xx

  return response.data
}, (error) => {
  // HttpStatus 3xx 4xx 5xx

  return Promise.reject(error)
})

export default axiosInstance
