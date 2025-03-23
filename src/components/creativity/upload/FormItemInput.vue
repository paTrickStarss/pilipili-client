<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">
import { computed } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'text',
    validator(value: string) {
      return ['text', 'password', 'email'].includes(value)
    }
  },
  maxlength: {
    type: Number,
    default: 10,
    validator(value: number) {
      return value > 0
    }
  },
  placeholder: String,
})
const value = defineModel('value',
  { type: String, required: true }
)
const length = computed(() => value.value.length)
</script>

<template>
  <div class="input input-container">
    <div class="input-instance">
      <input
        class="input-val"
        :type="type"
        :maxlength="maxlength"
        :placeholder="placeholder"
        v-model="value"
      >
    </div>
    <p class="input-max-tip">
      {{ `${length}/${maxlength}` }}
    </p>
  </div>
</template>

<style scoped>
.input-container {
  background: hsla(0,0%,84.7%,0);
  border: 1px solid #ccd0d7;
  border-radius: 4px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transition: border .3s ease;
}
.input-container .input-instance {
  flex: 1;
  min-width: 200px;
  margin: 6px 0;
}
.input-container .input-instance .input-val {
  display: block;
  width: 100%;
  color: #222;
  line-height: 22px;
  height: 22px;
  font-size: 14px;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background-color: transparent;
}

.input-container .input-max-tip {
  font-size: 14px;
  color: #9ba4ac;
  margin: 8px 0 8px 12px;
}

</style>
