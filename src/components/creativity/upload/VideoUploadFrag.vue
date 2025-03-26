<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import IconUpload from '@/components/icons/IconUpload.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { WebSocketHelper } from '@/utils/WebSocketHelper'
import { useTokenStore } from '@/stores/token'
import VideoUploadingItem from '@/components/creativity/upload/VideoUploadingItem.vue'
import type {
  RadioInfoProps,
  SelectorInfoProps,
  VideoUploadingItemProps,
} from '@/types/PropsType'
import VideoUploadingFileItem from '@/components/creativity/upload/VideoUploadingFileItem.vue'
import { deepCopy, isEmptyString, randomInt } from '@/utils/CommonUtil'
import FileUtil from '@/utils/FileUtil'
import FormItem from '@/components/creativity/upload/FormItem.vue'
import FormItemInput from '@/components/creativity/upload/FormItemInput.vue'
import FormItemRadioGroup from '@/components/creativity/upload/FormItemRadioGroup.vue'
import FormItemSelector from '@/components/creativity/upload/FormItemSelector.vue'
import FomItemTagInput from '@/components/creativity/upload/FomItemTagInput.vue'
import FormItemDescInput from '@/components/creativity/upload/FormItemDescInput.vue'
import videoInfoAPI from '@/api/video/VideoInfoAPI'
import type {
  QueryCategoryListDTO,
  UploadTaskMessage,
} from '@/types/ApiRespType'
import ossAPI from '@/api/oss/OssAPI'
import { AxiosProgressEvent } from 'axios'
import type { CreateVideoInfoReq } from '@/types/ApiRequestType'

const token = useTokenStore()
const videoFileInput = ref()
const coverFileInput = ref()

const uploadFileCount = ref<number>(0)

// 拖拽上传文件
const isDragging = ref(false)
const handleDragEnter = () => {
  isDragging.value = true
}
const handleDragOver = () => {
  isDragging.value = true
}
const handleDragLeave = () => {
  isDragging.value = false
}
const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    uploadFile(file)
  }
}

const handleVideoFileChange = (event: Event) => {
  console.log('handleFileChange', event)
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    uploadFile(file)
  }
}

const abortController = ref<AbortController>()
// 上传视频文件
function uploadFile(file: File) {
  console.log('upload file', file)

  videoUrl.value = URL.createObjectURL(file)
  console.log('createObjectURL', videoUrl.value)

  // 默认视频标题为文件名
  videoInfoForm.value.title = FileUtil.sliceOffExtension(file.name)

  // 新增上传任务
  const uploadInfo: VideoUploadingItemProps = {
    id: ++uploadFileCount.value,
    fileName: file.name,
    fileSize: FileUtil.getFileSizeInMegabytes(file.size),
    progress: 0,
    speed: 0,
    eta: 0,
    paused: false,
  }
  uploadingQueue.value.push(uploadInfo)
  console.log('uploadingQueue', uploadingQueue.value)

  abortController.value = new AbortController()
  // 上传视频文件
  ossAPI
    .uploadVideo(file, uploadProgressHandler, abortController.value.signal)
    .then(({ data }) => {
      message.success('视频上传成功')
      console.log('upload file', data)
      const taskId = data.taskId
      const objectName = data.objectName
      if (taskId) {
        videoInfo.value.taskId = taskId
        videoInfo.value.contentUrl = objectName
      }
    })
}
const uploadProgressHandler = (event: AxiosProgressEvent) => {
  console.log('uploadProgress', event)
  const progress = event.progress || 0
  const rate = event.rate || 0
  const estimated = event.estimated || 0
  uploadingQueue.value[0].progress = progress * 100
  uploadingQueue.value[0].speed = rate / (1024 * 1024)
  uploadingQueue.value[0].eta = Math.round(estimated)
}

// 放弃上传文件
function abortUpload() {
  abortController.value?.abort('User Cancelled')
  abortController.value = undefined
  message.warn('取消上传')
}

// 点击上传文件
function clickUpload() {
  videoFileInput.value.click()
}

// 上传视频封面
function handleCoverFileChange(event: Event) {
  console.log('handleCoverFileChange', event)
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // 销毁上一个上传的封面
    if (videoCoverUrl.value) {
      URL.revokeObjectURL(videoCoverUrl.value)
    }

    videoCoverUrl.value = URL.createObjectURL(file)
    videoCover.value = videoCoverUrl.value
    // console.log('videoCoverUrl', videoCoverUrl.value)

    // 暂存视频封面文件，等保存时再上传
    videoCoverFile.value = file
  }
}
// 返回默认封面（清楚上传的封面）
function setDefaultCover() {
  if (videoCoverUrl.value) {
    URL.revokeObjectURL(videoCoverUrl.value)
  }
  videoCoverUrl.value = ''
  videoCoverFile.value = defaultVideoCoverFile.value
  videoCover.value = defaultVideoCoverB64.value
  // console.log('setDefaultCover', videoCover.value)
}

const wsClient = ref<WebSocket | null>()
// /**
//  * 发送消息
//  * @param msg
//  */
// function sendMessage(msg: string) {
//   const req: messageReq = {
//     id: count.value++,
//     message: msg,
//     createTime: DateTimeUtil.instance.getDate()
//   }
//   wsClient.value?.send(JSON.stringify(req))
// }
function handleMessage(msg: MessageEvent) {
  const { data } = msg
  // message.info(`getMessage(${data})`)
  const body: UploadTaskMessage = JSON.parse(data) as UploadTaskMessage
  console.log('getMessage', msg, body)
  // videoInfo.value.taskId = body.taskId
  if (body.msg) {
    message.info(body.msg)
  }
}

// 视频上传队列
const uploadingQueue = ref<VideoUploadingItemProps[]>([])

const showQueue = computed(() => uploadingQueue.value.length > 0)

const videoPlayer = ref()
const videoUrl = ref<string | null>()
const videoCoverFile = ref()
const videoCoverUrl = ref<string>('')
const videoCover = ref<string>('')
// 视频封面Base64编码
const defaultVideoCoverB64 = ref<string>('')
const defaultVideoCoverFile = ref()
// 获取上传视频第一帧画面
function getVideoFirstFrame() {
  if (videoPlayer.value) {
    const canvas = document.createElement('canvas')
    canvas.width = videoPlayer.value.videoWidth
    canvas.height = videoPlayer.value.videoHeight
    const ctx = canvas.getContext('2d')
    if (ctx) {
      videoPlayer.value.currentTime = 0.1
      videoPlayer.value.addEventListener('seeked', () => {
        ctx.drawImage(videoPlayer.value, 0, 0, canvas.width, canvas.height)
        defaultVideoCoverFile.value = null
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], 'default-video-cover.png', {
              type: 'image/png',
            })
            console.log('canvas.toBlob', file)
            defaultVideoCoverFile.value = file
          }
        })
        defaultVideoCoverB64.value = canvas.toDataURL('image/png')
        videoCover.value = defaultVideoCoverB64.value
        if (videoUrl.value) {
          URL.revokeObjectURL(videoUrl.value)
          videoUrl.value = null
        }
      })
      // videoPlayer.value.addEventListener('loadedmetadata', () => {
      //   videoInfo.value.duration = videoPlayer.value.duration
      // })
    }
  }
}
// 获取视频元信息
function getVideoMeta() {
  // document.createElement('video').du
  videoInfo.value.duration = Math.round(videoPlayer.value.duration)
}

interface VideoInfoFormProps {
  title: string
  coverUrl: string
  type: number
  category: number
  tags: string[]
  description: string
}
// 视频信息表单
const videoInfoForm = ref<VideoInfoFormProps>({
  title: '',
  coverUrl: '',
  type: 0,
  category: -1,
  tags: [],
  description: '',
})
const videoInfo = ref<CreateVideoInfoReq>({
  duration: 0,
  primaryCategoryId: 0,
  taskId: '',
  title: '',
  uid: 0,
})
// watch(() => videoInfoForm.value.tags, (val) => {
//   console.log('videoInfoForm field change', val)
// })

// 视频源类型
const typeCheckRadioGroup = ref<RadioInfoProps[]>([
  {
    key: 0,
    label: '自制',
  },
  {
    key: 1,
    label: '转载',
  },
])

// 视频分区
const categorySelectList = ref<SelectorInfoProps[]>([])

// 投稿视频
async function handleSubmit() {
  if (!videoCoverFile.value) {
    if (!defaultVideoCoverFile.value) {
      message.warn('请等待默认封面生成')
      return
    }
    videoCoverFile.value = defaultVideoCoverFile.value
  }

  // 检查视频信息表单
  if (!formCheck()) {
    message.warn('请填写完整视频信息')
    return
  }

  // 确认视频文件上传完毕
  if (uploadingQueue.value[0].progress < 100) {
    message.warn('请等待视频上传完成')
    return
  }

  // 上传视频封面
  try {
    const { data } = await ossAPI.uploadVideoCover(videoCoverFile.value)
    videoInfo.value.coverUrl = data.filePath
  } catch (error) {
    message.error('上传视频封面失败')
    console.error('上传视频封面失败', error)
    return
  }

  // todo: 保存视频信息
  message.info('保存视频信息')
  videoInfo.value.title = videoInfoForm.value.title
  videoInfo.value.uid = token.uid
  videoInfo.value.tag = videoInfoForm.value.tags.join(',')
  videoInfo.value.description = videoInfoForm.value.description
  videoInfo.value.sourceType = videoInfoForm.value.type
  videoInfo.value.primaryCategoryId = videoInfoForm.value.category
  videoInfo.value.reprintPermit = 1
  videoInfoAPI.save(videoInfo.value)
    .then(res => {
      message.success('保存成功')
      console.log('SaveVideoInfo', res)
    })
}
// 检查表单
function formCheck(): boolean {
  const form = videoInfoForm.value
  if (isEmptyString(form.title)) {
    return false
  }
  if (form.category === -1) {
    return false
  }
  return true
}

// 初始化WebSocket连接
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
    ws.onmessage = e => {
      handleMessage(e)
    }
    wsClient.value = ws
  } else {
    console.warn('WebSocket client null!')
  }
}
// 初始化测试数据
// function initTestData() {
//   for (let i = 0; i < 1; i++) {
//     const copy = deepCopy(demoFile.value)
//     copy.id = i + 1
//     copy.fileSize = randomInt(560, 1730) / 10
//     copy.speed = randomInt(20, 200) / 10
//     copy.progress = randomInt(1, 99)
//     uploadingQueue.value.push(copy)
//   }
// }
const beforeUnload = (event: BeforeUnloadEvent) => {
  const msg = '刷新页面将会丢失未保存内容，是否继续？'
  event.preventDefault()
  event.returnValue = msg
}
// 获取视频分区列表
async function fetchCategoryList() {
  try {
    const { data } = await videoInfoAPI.categoryList()
    categorySelectList.value.push({
      key: -1,
      label: '--请选择分区--',
    })
    data.forEach((item: QueryCategoryListDTO) => {
      categorySelectList.value.push({
        key: item.id,
        label: item.name,
      })
    })
  } catch (error) {
    console.log('fetchCategoryList', error)
  }
}

// Life-cycle hook
onMounted(async () => {
  window.addEventListener('beforeunload', beforeUnload)
  initWsClient().then()
  fetchCategoryList().then()
})
onUnmounted(() => {
  // WebSocketHelper.instance.close()
  window.removeEventListener('beforeunload', beforeUnload)
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
                  <IconUpload class="icon-upload" />
                  <div class="upload-text no-events" v-show="!isDragging">
                    拖拽到此处也可上传
                  </div>
                  <div class="upload-text no-events" v-show="isDragging">
                    释放以上传
                  </div>
                  <div class="upload-btn no-events">上传视频</div>
                  <div class="upload-audit-progress">
                    <span>当前审核队列</span>
                    <span
                      class="tag"
                      style="background-color: rgb(69, 129, 142)"
                      >快速
                      <span class="tag-block">预计审核完成时间：10分钟内 </span>
                    </span>
                  </div>
                </div>
                <input
                  ref="videoFileInput"
                  accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v"
                  multiple
                  type="file"
                  @change="handleVideoFileChange"
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
                <div class="task-list-content-btn"></div>
              </div>
              <div class="file-list">
                <div class="btns"></div>
                <div class="drag-list">
                  <div class="drag-handler">
                    <VideoUploadingFileItem
                      v-for="item in uploadingQueue"
                      :key="item.id"
                      :info="item"
                      @abort="abortUpload"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form">
          <div class="title">
            <span class="label" style="width: 120px"> 基本设置 </span>
            <span class="quick-fill-entrance">一键填写</span>
          </div>
          <form-item wrap-class="cover" label="封面" required>
            <div class="cover-content">
              <div class="cover-upload">
                <img class="img" :src="videoCover" alt="视频封面" />
                <video
                  v-if="videoUrl"
                  style="display: none"
                  ref="videoPlayer"
                  :src="videoUrl"
                  controls
                  @loadeddata="getVideoFirstFrame"
                  @loadedmetadata="getVideoMeta"
                />
                <input
                  ref="coverFileInput"
                  accept="image/png, image/jpeg"
                  type="file"
                  @change="handleCoverFileChange"
                  style="display: none"
                />
                <div class="cover-upload-mask-btn">
                  <span @click="coverFileInput.click()">更改封面</span>
                  <span @click="setDefaultCover">默认封面</span>
                </div>
              </div>
              <div class="cover-preview"></div>
            </div>
          </form-item>
          <form-item
            class="form-item-short-margin"
            wrap-class="video-title"
            label="标题"
            required
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
          <form-item wrap-class="video-human-type" label="分区" required>
            <form-item-selector
              class="selector-container"
              :list="categorySelectList"
              v-model:value="videoInfoForm.category"
            />
          </form-item>
          <form-item wrap-class="tag-container" label="标签" required>
            <div class="tag-input-wrp">
              <fom-item-tag-input v-model:tag-list="videoInfoForm.tags" />
            </div>
          </form-item>
          <form-item wrap-class="desc-container" label="简介">
            <div class="desc-text-wrp">
              <form-item-desc-input v-model:value="videoInfoForm.description" />
            </div>
          </form-item>

          <form-item wrap-class="submit-container" label="">
            <span class="submit-draft">存草稿</span>
            <span class="submit-add" @click="handleSubmit">立即投稿</span>
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
  font-family:
    PingFang SC,
    Source Han Sans CN,
    Microsoft YaHei,
    Arial,
    Helvetica,
    sans-serif;
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
.upload-body > div {
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
  padding: 0;
}
.bcc-upload-wrapper .icon-upload {
  color: #9a9a9a;
  margin-bottom: 20px;
  transform: scale(3);
}
.upload > div {
  flex: 1;
}
.icon-sprite {
  width: 20px;
  height: 20px;
  fill: currentColor;
  vertical-align: -0.15em;
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
  transition: background-color 0.3s ease;
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
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
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
  font-size: 14px !important;
  padding: 12px 16px !important;
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
  transition: height 0.5s ease-in-out;
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
  object-fit: cover;
  cursor: pointer;
}
.cover-upload-mask-btn {
  display: flex;
  opacity: 0.8;
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
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  padding: 6px 0;
  box-sizing: border-box;
  height: 28px;
}
.cover-upload-mask-btn:before {
  content: '';
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
.video-human-type .selector-container {
  display: flex;
  align-items: center;
}
.tag-container .tag-input-wrp {
  flex: 1;
  margin-top: 12px;
}
.desc-container .desc-text-wrp {
  width: 80%;
  min-width: 700px;
  flex: 1;
}
.submit-container .submit-add,
.submit-container .submit-draft {
  display: inline-block;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
  text-align: center;
  vertical-align: middle;
  width: 120px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.5s ease-in-out;
}
.submit-container .submit-draft {
  line-height: 38px;
  border: 1px solid #ccc;
  color: #505050;
  background: #fff;
}
.submit-container .submit-add {
  margin-left: 16px;
  line-height: 40px;
  color: #fff;
  background: #00a1d6;
}
</style>
