/*
 * Copyright (c) 2025.  Bubble
 */

/**
 * WebSocket连接工具类
 * @author Bubble
 */
export class WebSocketHelper {
  // 单例模式
  private static _instance: WebSocketHelper

  private constructor() {}

  public static get instance() {
    if (!WebSocketHelper._instance) {
      WebSocketHelper._instance = new WebSocketHelper()
    }
    return WebSocketHelper._instance
  }

  private _client: WebSocket | null = null;

  private _initialized: Promise<void> | null = null;

  public async checkInitialized(): Promise<void> {
    if (this._initialized) {
      await this._initialized
    }
  }

  public init(path: string = 'ws'): void {
    const baseUrl = import.meta.env.BASE_URL
    const url = `${baseUrl}${path}`
    const ws = new WebSocket(url)

    this._initialized = new Promise((resolve, reject) => {
      ws.onopen = () => {
        console.log('WebSocket connection open on', url)
        resolve()
      }
      ws.onerror = (e) => {
        console.error('WebSocket connection error', e)
        reject(e)
      }
    })
    ws.onmessage = (e) => {
      console.log('WebSocket connection message', e)
    }
    ws.onclose = () => {
      console.log('WebSocket connection closed on', url)
    }
    this._client = ws;
  }

  public close(): void {
    if (!this._client) {
      return
    }
    if (this._client.readyState === WebSocket.OPEN) {
      this._client.close()
    }
  }

  public get client() {
    return this._client;
  }
}
