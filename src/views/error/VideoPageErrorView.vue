<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
// defineProps({
//   status: {
//     type: String,
//     default: '',
//     validator: (value: string) => ['', 'auditing'].includes(value),
//   },
// })

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import IndexView from '@/views/index/IndexView.vue'
import { ASSETS_BASE_URL } from '@/utils/imgUtil'

const status = ref<string>('')
const route = useRoute()

onMounted(() => {
  const params = route.params
  console.log('route params', params)
  if (params.status) {
    status.value = params.status as string
  }
})
</script>

<template>
  <index-view>
    <div id="mirror-vdcon" class="error-body">
      <div class="error-container">
        <div class="error-panel">
          <div class="error-msg">
            <div class="error-img">
              <img :src="`${ASSETS_BASE_URL}/icons/error-fallback.png`" alt="" />
            </div>
            <div class="error-prompt">
              <div class="error-text">
                {{
                  status === 'auditing'? '视频审核中，暂时不可见':
                    status === 'not-found'? '视频不见了？？？' :
                    status === 'forbidden'? '禁止访问！' :
                      '出错了！！！'
                }}
              </div>
              <div class="go-home-from-404">
                <a href="/" class="big-btn go-home">返回首页</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </index-view>
</template>

<style scoped>
.error-body {
  padding: 30px;
}
.error-container {
  width: 980px;
  margin: 0 auto;
  background: var(--bg1);
  border-radius: 10px;
}
.error-container .error-panel {
  padding: 40px 0;
  display: flex;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.error-container .error-panel .error-msg {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
.error-container .error-panel .error-msg .error-img {
  width: 160px;
  height: 100px;
  margin: 0 auto;
}
.error-container .error-panel .error-msg .error-prompt {
  padding: 40px 0 0 0;
  text-align: center;
}
.error-container .error-text {
  font-size: 26px;
  color: var(--text1);
  line-height: 26px;
  font-weight: bolder;
  padding: 0 0 12px 0;
}
.error-container .go-home-from-404 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
  font-size: 14px;
  color: var(--text2);
}
.error-container .big-btn {
  display: inline-block;
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  background: var(--brand_blue);
  color: var(--text_white);
  border-radius: 2px;
  font-size: 16px;
  transition: 0.2s;
  cursor: pointer;
}
.error-container .big-btn.go-home {
  width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  padding: 3px 10px;
  margin-top: 30px;
}
</style>
