<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import HomeAsideSection from '@/components/space/main/section/aside/HomeAsideSection.vue'
</script>

<template>
  <HomeAsideSection>
    <div class="auth-section">
      <div class="auth-guide">
        <div class="auth-entry">
          <div>点此申请pilipili认证</div>
          <div class="icon">
            <i
              class="vui_icon sic-BDC-arrow_forward_right_fill"
              style="font-size: 12px"
            />
          </div>
        </div>
        <div class="auth-tips">获得认证，享受多重认证福利！</div>
      </div>
    </div>
  </HomeAsideSection>
</template>

<style scoped>
.auth-section {
  background-color: var(--bg2);
  border-radius: 6px;
  width: 100%;
  padding: 20px 16px 24px;
  display: flex;
  justify-content: center;
}

.space-home .aside .home-aside-section > div:first-child {
  margin-bottom: 10px;
}

.auth-section .auth-entry {
  display: flex;
  color: var(--text1);
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
}

.auth-section .auth-entry .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
}

.auth-section .auth-tips {
  margin-top: 2px;
  line-height: 17px;
  font-size: 12px;
  color: var(--text2);
}
</style>
