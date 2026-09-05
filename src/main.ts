import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { installUi } from '@/plugins/ui'
import "moment/dist/locale/zh-cn.js";
// import 'ant-design-vue/dist/reset.css'

import IconDanmakuModeScroll from '@/components/icons/IconDanmakuModeScroll.vue'
import IconDanmakuModeTop from '@/components/icons/IconDanmakuModeTop.vue'
import IconDanmakuModeBottom from '@/components/icons/IconDanmakuModeBottom.vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersistState)

app.use(pinia)
app.use(router)
installUi(app)


app.component('IconDanmakuModeScroll', IconDanmakuModeScroll)
app.component('IconDanmakuModeTop', IconDanmakuModeTop)
app.component('IconDanmakuModeBottom', IconDanmakuModeBottom)


// Public pages can mount without waiting for the authentication service.
app.mount('#app')
