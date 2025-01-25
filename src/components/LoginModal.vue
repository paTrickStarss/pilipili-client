<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { LoginReqType } from '@/types/ApiRequestType'
import { authAPI } from '@/api/auth/AuthAPI'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

const visible = defineModel('visible', { required: true })
const emit = defineEmits({
  /**
   * modal关闭事件
   */
  close: () => true,
  /**
   * 登录提交事件
   */
  commit: () => true,
})
const loading = ref<boolean>(false)

const loginBody = reactive<LoginReqType>({
  username: '',
  password: '',
})
const loginFormRules = reactive({
  username: {
    required: true,
    message: 'Username is required',
    trigger: 'blur',
  },
  password: {
    required: true,
    message: 'Password is required',
    trigger: 'blur',
  },
})

function loginCommit() {
  loading.value = true
  authAPI.login(loginBody)
    .then(({ data }) => {
      localStorage.setItem("loginInfo", JSON.stringify(data))
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("username", data.username)
      Cookies.set("accessToken", data.accessToken,
        { path: '/', expires: Number(data.expires)/(24*60*60), secure: true, httpOnly: false })
      emit('commit')

      message.success('login success')
      console.log('login success', data)
    })
    .catch((error) => {
      message.error('login error', error)
    })
    .finally(() => {
      loading.value = false
    })

}
</script>

<template>
  <!--  <div class="modal-container" v-if="visible">-->
  <!--    <div class="modal-body">-->
  <!--      <a-button @click="$emit('close')">关闭</a-button>-->
  <!--    </div>-->
  <!--  </div>-->

  <div>
    <a-modal v-model:open="visible" title="登录">
      <!--      <a-skeleton/>-->
      <a-form ref="loginFormRef" :model="loginBody" :rules="loginFormRules">
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="loginBody.username"
            placeholder="输入用户UID..."
          />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            type="password"
            v-model:value="loginBody.password"
            placeholder="输入密码..."
          />
        </a-form-item>
      </a-form>

      <template #footer>
        <a-button key="back" @click="$emit('close')">Return</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="loginCommit"
        >
          Submit
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<style scoped>
/*.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  background: white;
  padding: 20px;
  border-radius: 5px;
}*/
</style>
