<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IconUpload from '@/components/icons/IconUpload.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import OssAPI from '@/api/oss/OssAPI'
import { message } from 'ant-design-vue'
import { WebSocketHelper } from '@/utils/WebSocketHelper'
import { useTokenStore } from '@/stores/token'
import { DateTimeUtil } from '@/utils/DateTimeUtil'


const token = useTokenStore()
const fileInput = ref()



// 拖拽上传文件
const isDragging = ref(false);
const handleDragEnter = () => {
  isDragging.value = true;
};
const handleDragOver = () => {
  isDragging.value = true;
};
const handleDragLeave = () => {
  isDragging.value = false;
};
const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    uploadFile(file);
  }
};

// 点击上传文件
const handleFileChange = (event: Event) => {
  console.log('handleFileChange', event);
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    uploadFile(file)
    // 在这里可以处理文件上传逻辑
  }
};
function uploadFile(file: File) {
  console.log('upload file', file);
  OssAPI.uploadVideo(file)
    .then((res) => {
      message.success('视频上传成功')
      console.log('upload file', res);
    })
}

function clickUpload() {
  fileInput.value.click()
}

interface messageReq {
  id: number;
  message: string;
  createTime: string;
}
const count = ref<number>(0);
const wsClient = ref<WebSocket | null>()
/**
 * 发送消息
 * @param msg
 */
function sendMessage(msg: string) {
  const req: messageReq = {
    id: count.value++,
    message: msg,
    createTime: DateTimeUtil.instance.getDate()
  }

  wsClient.value?.send(JSON.stringify(req))
}
function handleMessage(msg: MessageEvent) {
  const { data } = msg
  message.info(`getMessage(${data})`)
  console.log('getMessage', msg)
}

onMounted(async () => {
  const wsHelper = WebSocketHelper.instance
  wsHelper.init(`ws/oss/${token.uid}`)

  try {
    await wsHelper.checkInitialized()
  } catch (error) {
    console.log('WebSocket初始化失败', error)
  }

  const ws = wsHelper.client
  if (ws) {
    ws.onmessage = (e) => {
      handleMessage(e)
    }
  }

  wsClient.value = ws
})

onUnmounted(() => {
  WebSocketHelper.instance.close()
})
</script>

<template>
  <div class="upload-body">
    <div class="upload-body-content">
      <div class="upload-wrp">
        <!---->
        <div class="bcc-upload upload">
          <div class="bcc-upload-wrapper" @click="clickUpload">
            <div
              @dragover.prevent="handleDragOver"
              @dragenter="handleDragEnter"
              @dragleave="handleDragLeave"
              @drop.prevent="handleDrop"
            >
              <IconUpload class="icon-upload"/>
              <div class="upload-text no-events" v-show="!isDragging">
                拖拽到此处也可上传
              </div>
              <div class="upload-text no-events" v-show="isDragging">
                释放以上传
              </div>
              <div class="upload-btn no-events">
                上传视频
              </div>
              <div class="upload-audit-progress">
                <span>当前审核队列</span>
                <span
                  class="tag"
                  style="background-color: rgb(69, 129, 142)"
                >快速
                  <span class="tag-block"
                    >预计审核完成时间：10分钟内
                  </span>
                </span>
              </div>
            </div>
            <input
              ref="fileInput"
              accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v"
              multiple
              type="file"
              @change="handleFileChange"
              style="display: none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-body {
  padding: 8px 0 16px;
  height: calc(100% - 64px);
  overflow: auto;
}
.upload-body {
  margin-top: 150px;
}
.upload-body-content {
  position: relative;
}
.upload-body>div {
  max-width: 830px;
  margin: 0 auto;
}
.upload-wrp {
  margin-top: 10px;
  position: relative;
  border: 2px dashed #ccc;
}
.bcc-upload {
  position: relative;
  width: auto;
}
.upload {
  margin-top: 62px;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  position: relative;
  color: #999;
  font-size: 14px;
  text-align: center;
}
.bcc-upload-wrapper {
  cursor: pointer;
  padding-bottom: 20px;
  display: inline-block;
}
.bcc-upload-wrapper {
  padding: 0
}
.bcc-upload-wrapper .icon-upload {
  color: #9a9a9a;
  margin-bottom: 20px;
  transform: scale(3);
}
.upload>div {
  flex: 1;
}
.icon-sprite {
  width: 20px;
  height: 20px;
  fill: currentColor;
  vertical-align: -.15em;
  overflow: hidden;
  font-size: inherit;
  line-height: inherit;
}
.upload .no-events {
  pointer-events: none;
}
.upload .upload-icon {
  width: 40px;
  height: 40px;
  color: #999;
}
.upload .upload-text {
  font-size: 13px;
  color: #999;
  margin-top: 6px;
}
.upload .upload-btn {
  color: #fff;
  margin: 20px auto;
  width: 200px;
  height: 44px;
  cursor: pointer;
  background: #00a1d6;
  border-radius: 4px;
  transition: background-color .3s ease;
  text-align: center;
  line-height: 40px;
  white-space: nowrap;
}
.upload .upload-audit-progress {
  font-size: 13px;
  color: #999;
  width: 100%;
  margin: 0 auto;
  position: relative;
  cursor: default;
}
.upload .upload-audit-progress .tag {
  padding: 2px 8px;
  font-size: 12px;
  color: #fff;
  background-color: red;
  border-radius: 2px;
  margin-left: 8px;
  position: relative;
  cursor: pointer;
}
.upload .upload-audit-progress .tag-block {
  position: absolute;
  font-size: 12px;
  line-height: 20px;
  color: #99a2aa;
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.14);
  background-color: #fff;
  padding: 8px 10px;
  text-align: left;
  top: -8px;
  right: 0;
  transform: translate(100%);
  white-space: nowrap;
  z-index: 10;
  display: none;
}




</style>
