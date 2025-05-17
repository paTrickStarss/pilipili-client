<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import VideoPlayer from '@/components/video/player/VideoPlayer.vue'
import type { VideoDTOType } from '@/types/ApiRespType'
import GlobalDialog from '@/components/global/GlobalDialog.vue'
import { message } from 'ant-design-vue'
import VideoInfoAPI from '@/api/video/VideoInfoAPI'

const props = defineProps<{
  info: VideoDTOType
}>()
const show = defineModel('show',
  { type: Boolean, default: false, required: true })
const emits = defineEmits({
  /**
   * 刷新列表
   */
  refresh: () => true
})

function commit(status: number) {
  if (status === -1) {
    // 审核不通过
    // message.info('审核不通过')
    updateStatus(3)
  }
  if (status === 1) {
    // 审核通过
    // message.info('审核通过')
    updateStatus(2)
  }
}
async function updateStatus(status: number) {
  const key = 'updateStatus';
  message.loading({ content: '更新中', key })
  const resp = await VideoInfoAPI.updateAdmin({
    vid: props.info.vid,
    status
  })
  if (resp.success) {
    message.success({ content: '审核意见更新成功', key })
    show.value = false
    emits('refresh')
  } else {
    message.error({ content: resp.msg, key })
  }
}

</script>

<template>
  <GlobalDialog
    v-model:visible="show"
    @close-dialog="show = false"
    :width="1000"
  >
    <template #header>
      视频审核
    </template>
    <div class="dialog-body">
      <video-player
        ref="playerRef"
        v-if="show"
        :vid="info?.vid || 0"
        :src="info?.contentUrl || ''"
      />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <button class="button audit-block" @click="commit(-1)">审核不通过</button>
        <button class="button audit-passed" @click="commit(1)">审核通过</button>
        <button class="button" @click="show = false">关闭</button>
      </div>
    </template>
  </GlobalDialog>
</template>

<style scoped>
.button {
  width: 200px;
  height: 50px;
  color: var(--text_white);
  background-color: #b6b6b6;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s;
}
.button:hover {
  opacity: 0.7;
}
.audit-block {
  background-color: #ff5454;
}
.audit-passed {
  background-color: #2AC864;
}
.dialog-body {
  display: flex;
  justify-content: center;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
}

</style>
