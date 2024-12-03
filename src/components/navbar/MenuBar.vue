<script setup lang="ts">
import { onMounted } from 'vue'
import { message } from 'ant-design-vue'
import type { MenuItemProps } from '@/utils/PropsType.ts'
import { openLink } from '@/utils/CommonUtil'

const props = defineProps<MenuItemProps>()

onMounted(() => {
  // message.info(`onMounted: ${JSON.stringify(props)}`)
})

</script>

<template>
  <div class="menu-container">
    <div
      class="menu-item"
      v-for="item in menuItems"
      :key="item.id"
      @click="openLink(item.url)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
}
.menu-item {
  inline-size: 80px;
  margin: 0 10px;
  text-align: center;
  transition: transform .2s ease-in-out;
  user-select: none;
}
.menu-item:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
</style>
