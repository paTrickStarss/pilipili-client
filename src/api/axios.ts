import axios, { type AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user'
import type { PageResponse, SimpleResponse } from '@/types/ApiRespType'
import { getRequestError, validateResponse } from '@/utils/requestError'

const transport = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

transport.interceptors.request.use(config => {
  const token = useTokenStore().accessToken
  const isPublic = /\/(login|register|publicKey)(?:\/|$)/.test(config.url || '')
  if (token && !isPublic) config.headers.set('Authorization', `Bearer ${token}`)
  return config
})

async function request<R extends SimpleResponse>(config: AxiosRequestConfig): Promise<R> {
  try {
    const { data } = await transport.request<R>(config)
    validateResponse(data)
    return data
  } catch (error) {
    if (axios.isCancel(error)) throw error
    const failure = getRequestError(error)
    if (failure.status === 401) {
      useTokenStore().clearTokenInfo()
      useUserStore().clearUserInfo()
    }
    message.error({ content: failure.message, key: 'api-error' })
    throw failure
  }
}

export default {
  get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return request<SimpleResponse<T>>({ ...config, method: 'GET', url })
  },
  getPage<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return request<PageResponse<T>>({ ...config, method: 'GET', url })
  },
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return request<SimpleResponse<T>>({ ...config, method: 'POST', url, data })
  },
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return request<SimpleResponse<T>>({ ...config, method: 'PUT', url, data })
  },
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return request<SimpleResponse<T>>({ ...config, method: 'PATCH', url, data })
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return request<SimpleResponse<T>>({ ...config, method: 'DELETE', url })
  },
}
