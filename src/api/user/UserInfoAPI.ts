/*
 * Copyright (c) 2025. Bubble
 */

import axios from '@/api/axios'

export const userInfoAPI = {
  getUserInfo(uid: string) {
    return axios.get('/api/user/getUser', { params: { uid: uid } })
  }
}
