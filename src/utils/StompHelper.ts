/*
 * Copyright (c) 2025.  Bubble
 */

import { Client } from '@stomp/stompjs'
import { useTokenStore } from '@/stores/token'

/**
 * @deprecated
 */
export class StompHelper {
  // 单例模式
  private static _instance: StompHelper

  private constructor() {}

  public static get instance() {
    if (!StompHelper._instance) {
      StompHelper._instance = new StompHelper()
    }
    return StompHelper._instance
  }

  private stompClient: Client | null = null
  private clientMap: Map<string, Client> = new Map<string, Client>()

  public getClient(): Client | null {
    return this.stompClient
  }
  /**
   * 初始化
   */
  public init(wsPath: string) {
    // const client = this.clientMap.get(wsPath)
    // if (!client) {
    if (!this.stompClient) {
      if (!useTokenStore().isLogin) {
        console.warn('请先登录再初始化WebSocket连接')
        return
      }
      this.launchConnection(wsPath)
    } else {
      console.warn('WebSocket连接已经建立，不能重复建立')
    }
  }

  /**
   * 关闭连接
   */
  public close(): void {
    if (this.stompClient?.connected) {
      this.stompClient.deactivate()
    }
  }

  /**
   * 建立WebSocket连接
   * @private
   */
  private launchConnection(wsPath: string = 'ws') {
    console.log('launchConnection', wsPath)
    const baseURL = 'ws://localhost:8000/'//import.meta.env.VITE_BASE_URL
    const wsURL = baseURL + wsPath
    // client.webSocketFactory = function () {
    //   const sockJS = new SockJS(wsURL, null, {
    //     timeout: 10000
    //   })
    //
    //   const stompSocket: IStompSocket = {
    //     onclose(event) {
    //       if (sockJS.onclose) {
    //         sockJS.onclose(event)
    //       }
    //     },
    //     onerror(event) {
    //       if (sockJS.onerror) {
    //         sockJS.onerror(event)
    //       }
    //     },
    //     readyState: 0,
    //     url: wsURL,
    //     close(): void {
    //       sockJS.close()
    //     },
    //     send(data: string | ArrayBuffer): void {
    //       sockJS.send(JSON.stringify(data))
    //     },
    //     onopen(event) {
    //       if (sockJS.onopen) {
    //         sockJS.onopen(event)
    //       }
    //     },
    //     onmessage(event) {
    //       if (sockJS.onmessage) {
    //         sockJS.onmessage(event)
    //       }
    //     }
    //   }
    //   return stompSocket
    // }

    const client = new Client({
      brokerURL: wsURL,
      connectHeaders: {
        Authorization: `Bearer ${useTokenStore().accessToken}}`
      },
      debug: (msg) => console.log(msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 5000,
      heartbeatOutgoing: 5000,
    })
    client.activate()

    client.onConnect = () => {
      console.log('Connected!')
    }
    client.onDisconnect = () => {
      console.log('Disconnected!')
    }
    client.onStompError = (err) => {
      console.error('Stomp Error!', err)
    }

    this.stompClient = client
  }

}
