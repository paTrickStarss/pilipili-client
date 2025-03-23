<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IconUpload from '@/components/icons/IconUpload.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import OssAPI from '@/api/oss/OssAPI'
import { message } from 'ant-design-vue'
import { WebSocketHelper } from '@/utils/WebSocketHelper'
import { useTokenStore } from '@/stores/token'
import { DateTimeUtil } from '@/utils/DateTimeUtil'
import VideoUploadingItem from '@/components/creativity/upload/VideoUploadingItem.vue'
import type { RadioInfoProps, VideoUploadingItemProps } from '@/types/PropsType'
import VideoUploadingFileItem from '@/components/creativity/upload/VideoUploadingFileItem.vue'
import { deepCopy, randomInt } from '@/utils/CommonUtil'
import FileUtil from '@/utils/FileUtil'
import FormItem from '@/components/creativity/upload/FormItem.vue'
import FormItemLabel from '@/components/creativity/upload/FormItemLabel.vue'
import FormItemInput from '@/components/creativity/upload/FormItemInput.vue'
import FormItemRadioGroup from '@/components/creativity/upload/FormItemRadioGroup.vue'


const token = useTokenStore()
const fileInput = ref()



const uploadFileCount = ref<number>(0)

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
  const uploadInfo: VideoUploadingItemProps = {
    id: ++uploadFileCount.value,
    fileName: file.name,
    fileSize: FileUtil.getFileSizeInMegabytes(file.size),
    progress: 0,
    speed: 0
  }
  uploadingQueue.value.push(uploadInfo)
  console.log('uploadingQueue', uploadingQueue.value)
  // OssAPI.uploadVideo(file)
  //   .then((res) => {
  //     message.success('视频上传成功')
  //     console.log('upload file', res);
  //   })
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

const demoFile = ref<VideoUploadingItemProps>({
    id: 0,
    fileName: 'Yuan Shen 原神 2023.10.13 - 19.03.27.01',
    fileSize: 65.7,
    progress: 34,
    speed: 7.4
})
const uploadingQueue = ref<VideoUploadingItemProps[]>([])

const showQueue = computed(() =>
  uploadingQueue.value.length > 0
)

interface VideoInfoFormProps {
  title: string
  coverUrl: string
  type: string
  category: string
  tags: string[]
  description: string
}
const videoInfoForm = ref<VideoInfoFormProps>({
  title: '',
  coverUrl: '',
  type: '1',
  category: '',
  tags: [],
  description: ''
})

const typeCheckRadioGroup = ref<RadioInfoProps[]>([
  {
    key: '1',
    label: '自制'
  },
  {
    key: '2',
    label: '转载'
  }
])

async function initWsClient() {
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
}
function initTestData() {
  for (let i = 0; i < 1; i++) {
    const copy = deepCopy(demoFile.value)
    copy.id = i + 1
    copy.fileSize = randomInt(560, 1730)/10
    copy.speed = randomInt(20, 200)/10
    copy.progress = randomInt(1, 99)
    uploadingQueue.value.push(copy)
  }
}
onMounted(async () => {
  initTestData()
})

onUnmounted(() => {
  // WebSocketHelper.instance.close()
})
</script>

<template>

  <div id="video-up-app" class="video-up-app">
<!--    上传入口-->
    <div class="video-entrance" v-show="!showQueue">
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
    </div>

<!--    上传情况及信息填写-->
    <div class="video-basic-wrp" v-show="showQueue">
      <div class="video-basic">
        <div class="video-upload">
          <div class="upload-header">
            <div class="upload-header-top">
              <span class="upload-header-top-text">发布视频</span>
              <div class="upload-header-top-btn">
                <button class="bcc-button bcc-button--default btn small">
                  <span>批量操作</span>
                </button>
              </div>
            </div>
          </div>
          <div class="upload-queue">
            <div class="task-list">
              <div class="task-list-triangle"></div>
              <div class="task-list-content">
                <VideoUploadingItem
                  v-for="item in uploadingQueue"
                  :key="item.id"
                  :info="item"
                />
                <div class="task-list-content-btn">

                </div>
              </div>
              <div class="file-list">
                <div class="btns"></div>
                <div class="drag-list">
                  <div class="drag-handler">
                    <VideoUploadingFileItem
                      v-for="item in uploadingQueue"
                      :key="item.id"
                      :info="item"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="form">
          <div class="title">
            <span class="label" style="width: 120px">
              基本设置
            </span>
            <span class="quick-fill-entrance">一键填写</span>
          </div>
          <form-item wrap-class="cover" label="封面" required>
            <div class="cover-content">
              <div class="cover-upload">
<!--                    todo: 获取默认视频封面（视频第一帧）-->
                <div class="img"></div>
                <div class="cover-upload-mask-btn">
                  <span>更改封面</span>
                </div>
              </div>
              <div class="cover-preview"></div>
            </div>
          </form-item>
          <form-item
            class="form-item-short-margin"
            wrap-class="video-title"
            label="标题" required
          >
            <div class="video-title-content">
              <form-item-input
                v-model:value="videoInfoForm.title"
                placeholder="请输入标题"
                :maxlength="100"
              />
              <div class="msg"></div>
            </div>
          </form-item>
          <form-item wrap-class="type-check" label="类型" required>
            <div class="type-check-radio-wrp">
              <form-item-radio-group
                :radio-group="typeCheckRadioGroup"
                v-model:value="videoInfoForm.type"
              />
            </div>
          </form-item>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.video-up-app {
  height: 100%;
  min-width: 1000px;
  max-width: 1100px;
  margin: 0 auto 0;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 16px solid transparent;
  box-sizing: border-box;
  font-size: 0;
  font-family: PingFang SC,Source Han Sans CN,Microsoft YaHei,Arial,Helvetica,sans-serif;
  -webkit-font-smoothing: antialiased;
  font-variant-ligatures: normal;
  font-variant-caps: normal;
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  text-rendering: optimizelegibility;
}
.video-up-app {
  min-height: inherit;
}
.video-entrance * {
  box-sizing: border-box;
}

.upload-body {
  padding: 8px 0 16px;
  height: calc(100% - 64px);
  overflow: auto;
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

.video-basic-wrp {
  position: relative;
  display: flow-root;
  min-height: 100%;
  margin: 0 0 50px 0;
}
.video-basic {
  background: #fff;
  flex-direction: column;
}
.upload-header {
  height: 100%;
}
.upload-header-top {
  padding: 0 32px;
  position: relative;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  color: #212121;
  line-height: 28px;
  height: 70px;
  box-shadow: 0 1px 0 #e7e7e7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.upload-header-top-btn {
  position: relative;
}
.upload-header-top-btn .btn {
  color: #61666d;
  font-size: 14px!important;
  padding: 12px 16px!important;
}

.task-list {
  height: 100%;
  margin: 23px 32px 0;
  padding: 20px 12px;
  background: #f6f7f8;
  border-radius: 10px;
  position: relative;
}
.task-list-triangle {
  position: absolute;
  top: -20px;
  left: 25px;
  width: 0;
  height: 0;
  border: 10px solid;
  border-color: transparent transparent #f6f7f8 transparent;
}
.task-list-content {
  display: flex;
  align-items: center;
  border-radius: 10px;
  flex-wrap: wrap;
}

.file-list {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #18191c;
  position: relative;
}
.file-list .btns {
  display: flex;
  align-items: center;
}

.file-list .drag-list {
  transition: height .5s ease-in-out;
  overflow: hidden;
}
.file-list .drag-handler {
  margin-bottom: 6px;
}

.form {
  margin: 30px 30px 0 0;
  background: #fff;
  width: 80%;
  min-width: 900px;
}
.title {
  margin: 0 0 0 32px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  line-height: 22px;
}
.title .label {
  display: inline-block;
  width: 142px;
}
.quick-fill-entrance {
  position: relative;
  font-size: 12px;
  color: #61666d;
  font-weight: 400;
  cursor: pointer;
  border: 1px solid #e3e5e7;
  border-radius: 4px;
  padding: 6px 16px;
}

.cover-content,
.cover-upload {
  display: flex;
  align-items: flex-end;
}
.cover-upload {
  width: 169px;
  height: 127px;
  position: relative;
}
.cover-preview {
  padding: 1px 0 0 34px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.cover-upload .img {
  width: 169px;
  height: 127px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}
.cover-upload-mask-btn {
  display: flex;
  opacity: .8;
  position: absolute;
  bottom: 0;
  align-items: center;
  font-size: 12px;
  color: #fff;
  justify-content: center;
  text-align: center;
  width: 100%;
  border-radius: 0 0 4px 4px;
  z-index: 1;
  background: rgba(0,0,0,.7);
  cursor: pointer;
  padding: 6px 0;
  box-sizing: border-box;
  height: 28px;
}
.cover-upload-mask-btn:before {
  content: "";
  position: absolute;
  left: 50%;
  width: 1px;
  top: 6px;
  bottom: 6px;
  background-color: #fff;
}
.cover-upload-mask-btn span {
  height: 28px;
  line-height: 28px;
  width: 50%;
}

.video-title-content {
  flex: 1;
}
.video-title-content .msg {
  color: #fc403c;
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  margin: 5px 0;
}


</style>
