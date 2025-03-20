import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import axios from './api/axios'

import Antd from 'ant-design-vue'
import { CryptoUtil } from '@/utils/CryptoUtil'
import "moment/dist/locale/zh-cn.js";
// import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersistState)

app.use(pinia)
app.use(router)
app.use(Antd)

app.config.globalProperties.$api = axios

const crypto = CryptoUtil.instance
try {
  await CryptoUtil.checkInitialized()
  app.config.globalProperties.$crypto = crypto
} catch (error) {
  console.error('CryptoUtil initialization error', error)
}

app.mount('#app')
