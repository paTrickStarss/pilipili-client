export class RequestError extends Error {
  status: number | undefined

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'RequestError'
    this.status = status
  }
}

export function validateResponse(data: { code?: number; success?: boolean; msg?: string }) {
  if (data.success === false || (typeof data.code === 'number' && data.code >= 400)) {
    throw new RequestError(data.msg || '请求失败，请稍后重试', data.code)
  }
}

export function getRequestError(error: unknown): RequestError {
  if (error instanceof RequestError) return error
  const detail = error as { code?: string; response?: { status?: number }; message?: string } | null
  const status = detail?.response?.status
  const messages: Record<number, string> = {
    401: '登录状态已失效，请重新登录',
    403: '没有权限执行此操作',
    404: '请求的内容不存在',
  }
  const text = status
    ? messages[status] || '服务暂时不可用，请稍后重试'
    : detail?.code === 'ECONNABORTED' || detail?.code === 'ETIMEDOUT'
      ? '请求超时，请重试'
      : '网络连接失败，请检查连接后重试'
  return new RequestError(text, status)
}
