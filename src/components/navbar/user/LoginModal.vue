<!--
  - Copyright (c) 2024. Bubble
  -->

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { LoginReq, RegisterReq } from '@/types/ApiRequestType'
import { authAPI } from '@/api/auth/AuthAPI'
import { message } from 'ant-design-vue'
import { useTokenStore } from '@/stores/token'
import GlobalDialog from '@/components/global/GlobalDialog.vue'
import { useUserStore } from '@/stores/user'
import { CryptoUtil } from '@/utils/CryptoUtil'
import { userInfoAPI } from '@/api/user/UserInfoAPI'


const visible = defineModel<boolean>('visible', { required: true })
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
const loginTab = ref<boolean>(true)

watch(visible, (value) => {
  if (value) {
    loginTab.value = true
  }
})

const loginBody = reactive<LoginReq>({
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
const loginFormRef = ref()

const registerBody = reactive<RegisterReq>({
  nickname: '',
  password: '',
  email: '',
})
const passwordGroup = reactive({
  firstInput: '',
  lastInput: '',
})
const registerFormRules = reactive({
  // password: {
  //   required: true,
  //   message: '请输入密码',
  // },
  // passwordConfirm: {
  //   required: true,
  //   message: '请确认密码',
  // },
})
const registerFormRef = ref()

function loginCommit() {
  loginFormRef.value.validate()
    .then(() => {
      loading.value = true

      const encryptedPassword = CryptoUtil.instance.encrypt(loginBody.password || '')
      const signature = CryptoUtil.instance.sign(encryptedPassword)
      const body: LoginReq = {
        username: loginBody.username,
        password: encryptedPassword,
        signature,
      }

      authAPI
        .login(body)
        .then(({ data }) => {
          useTokenStore().saveTokenInfo(data)
          useUserStore().fetchCurrentUserInfo()
          emit('commit')
          message.success('登录成功！欢迎回来。')
          console.log('login success', data)
        })
        .catch((msg) => {
          message.error(msg)
        })
        .finally(() => {
          loading.value = false
        })
    })
}
function registerCommit() {
  if (passwordGroup.firstInput === '') {
    message.warn('请输入密码')
  } else if (passwordGroup.firstInput !== passwordGroup.lastInput) {
    message.warn('请确认二次输入密码一致')
  } else {
    const encryptedPassword = CryptoUtil.instance.encrypt(passwordGroup.firstInput)
    const signature = CryptoUtil.instance.sign(encryptedPassword)
    const body: RegisterReq = {
      nickname: registerBody.nickname,
      password: encryptedPassword,
      signature,
      email: registerBody.email
    }

    userInfoAPI.register(body)
      .then(({ data }) => {
        if (data.success) {
          message.success('注册成功')
          // 返回登录页面并填充账号密码
          loginTab.value = true
          loginBody.username = data.uid
          loginBody.password = passwordGroup.firstInput
        }
        console.log('register success', data)
      })
  }
}

function goToRegister() {
  passwordGroup.firstInput = passwordGroup.lastInput = ''
  loginTab.value = false
}
</script>

<template>
  <GlobalDialog v-model:visible="visible" @close-dialog="visible = false">
    <a-form
      ref="loginFormRef"
      :model="loginBody"
      :rules="loginFormRules"
      v-if="loginTab"
    >
      <a-form-item label="账号" name="username">
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
    <a-form
      ref="registerFormRef"
      :model="registerBody"
      :rules="registerFormRules"
      v-else
    >
      <a-form-item label="昵称" name="nickname">
        <a-input
          v-model:value="registerBody.nickname"
          placeholder="输入昵称..."
          autoComplete="new-password"
        />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input
          type="password"
          v-model:value="passwordGroup.firstInput"
          placeholder="输入密码..."
          autoComplete="new-password"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="passwordConfirm"
        v-if="passwordGroup.firstInput !== ''"
      >
        <a-input
          type="password"
          v-model:value="passwordGroup.lastInput"
          placeholder="请再次输入密码..."
          autoComplete="new-password"
        />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input
          type="email"
          v-model:value="registerBody.email"
          placeholder="输入邮箱..."
          autoComplete="new-password"
        />
      </a-form-item>
    </a-form>

    <template #header>
      <div>{{ loginTab? '密码登录' : '注册' }}</div>
    </template>

    <template #footer>
      <div class="footer-container" v-if="loginTab">
        <a-button
          class="footer-button"
          key=""
          type="dashed"
          @click="goToRegister"
        >
          注册
        </a-button>
        <a-button
          class="footer-button submit-button"
          key="submit"
          type="primary"
          :loading="loading"
          @click="loginCommit"
        >
          登录
        </a-button>
      </div>
      <div class="footer-container" v-else>
        <a-button
          class="footer-button"
          key=""
          type="dashed"
          @click="loginTab = true"
        >
          返回登录
        </a-button>
        <a-button
          class="footer-button submit-button"
          key="submit"
          type="primary"
          :loading="loading"
          @click="registerCommit"
        >
          注册
        </a-button>
      </div>
    </template>
  </GlobalDialog>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-evenly;
}
.footer-button {
  width: 200px;
  height: 40px;
}
.submit-button {
  background: #66ccff;
}
</style>
