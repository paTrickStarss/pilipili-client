// Development-only harness. No authentication persistence or backend writes.
import '../../src/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { installUi } from '../../src/plugins/ui'
import api from '../../src/api/axios'
import router from '../../src/router'
import App from '../../src/App.vue'
import { useTokenStore } from '../../src/stores/token'

const query = new URLSearchParams(location.search)
const route = query.get('route') || '/'
const mode = query.get('mode') || 'normal'
const cover = '/src/assets/image/carousel-cover-1.jpg@800w_512h_.avif'
const user = { uid: 42, nickname: '用于验证长昵称换行的测试用户', gender: 0, avatarUrl: cover,
  backgroundUrl: cover, email: '', description: '用于布局回归的固定数据', vipStatus: 0,
  authority: 0, authorityDesc: '', validStatus: 1, role: 1, exp: 100, hcoin: 0,
  pcoin: 0, level: 1, followerCount: 10, fansCount: 100, dynamicCount: 0 }
const videos = Array.from({ length: 10 }, (_, index) => ({
  vid: 42 + index, uid: 42, nickname: user.nickname,
  title: index === 0 ? '特别长的视频标题用于验证多行省略以及卡片尺寸是否会受内容影响'.repeat(3) : `布局回归测试视频 ${index + 1}`,
  description: '长视频简介。'.repeat(30), coverUrl: cover, contentUrl: '/tests/fixtures/missing.m3u8',
  duration: 123, sourceType: 0, reprintPermit: 1, tagList: ['布局测试', '长标签名称'.repeat(8)],
  status: 1, publishTime: '2026-09-05 12:00:00', uploadTime: '2026-09-05 12:00:00',
  updateTime: '2026-09-05 12:00:00', primaryCategoryId: 1, secondaryCategoryId: 1,
  viewCount: 1200, danmakuCount: 22, commentCount: 0, favorCount: 20,
  coinCount: 10, collectCount: 2, repostCount: 0, dewCount: 0,
}))
const respond = async url => {
  if (mode === 'error') throw new Error('测试：网络不可用')
  if (mode === 'slow') await new Promise(resolve => setTimeout(resolve, 1500))
  let data = videos
  if (url.includes('/api/user/isFollow')) data = { fromUid: 42, toUid: 42, isFollow: false, isSpecial: false, isMutual: false }
  else if (url.startsWith('/api/user/')) data = user
  else if (url.includes('/getUserVideo')) data = { favor: false, coin: false, collect: false, repost: false }
  else if (/\/api\/video\/\d+$/.test(url)) data = videos[0]
  else if (url.includes('/category')) data = [{ id: 1, name: '测试分区' }]
  else if (url.includes('/collection/')) data = [{ collectionId: 1, title: '测试收藏夹', coverUrl: cover, himitsu: 0, videoCount: 10 }]
  if (mode === 'empty' && Array.isArray(data)) data = []
  return { code: 200, success: true, data, pageNo: 1, pageSize: 10, total: Array.isArray(data) ? data.length : 1 }
}
api.get = respond
api.getPage = respond
for (const method of ['post', 'put', 'patch', 'delete']) api[method] = async () => { throw new Error('测试页面禁止写入后端') }
const pinia = createPinia()
const app = createApp(App).use(pinia).use(router)
installUi(app)
if (query.get('session') !== 'guest') useTokenStore(pinia).saveTokenInfo({ username: '42', accessToken: 'fixture-only', admin: true, expires: 3600 })
await router.isReady()
await router.replace(route)
app.mount('#app')
