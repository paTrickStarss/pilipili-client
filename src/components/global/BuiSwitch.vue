<!--
  - Copyright (c) 2025.  Bubble
  -->

<script setup lang="ts">

defineProps({
  label: String,
})
const value = defineModel('value',
  { type: Boolean, required: true })
</script>

<template>
  <div class="bui bui-switch">
    <div class="bui-area">
      <input
        class="bui-switch-input"
        type="checkbox"
        :aria-label="label"
        :checked="value"
      >
      <label class="bui-switch-label">
        <span class="bui-switch-name">{{ label }}</span>
        <span class="bui-switch-body">
          <span class="bui-switch-dot">
            <span></span>
          </span>
        </span>
      </label>
    </div>
  </div>
</template>

<style>
.bui-switch {
  cursor: pointer;
  /*    display: -webkit-inline-box;*/
  display: -ms-inline-flexbox;
  display: inline-flex;
  position: relative;
  transition: color .2s ease-in-out;
}
.bui-switch:hover {
  color: #00a1d6;
}
.bui-switch .bui-switch-input {
  cursor: pointer;
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
.bui-switch .bui-switch-input:checked+.bui-switch-label .bui-switch-body .bui-switch-dot {
  fill: var(--bpx-fn-color,#00a1d6);
  color: var(--bpx-fn-color,#00a1d6);
  left: 100%;
  margin-left: -18px;
}
.bui-switch .bui-switch-label {
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  width: 100%;
}
.bui-switch .bui-switch-name {
  position: relative;
}
.bui-switch .bui-switch-body {
  background: #757575;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 20px;
  outline: none;
  vertical-align: middle;
  width: 30px;
}
.bui-switch .bui-switch-body,
.bui-switch .bui-switch-dot {
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: all .3s;
  transition: all .3s;
}
.bui-switch .bui-switch-input:checked+.bui-switch-label .bui-switch-body {
  background: #00a1d6;
  background: var(--bpx-fn-color,#00a1d6);
}
.bui-switch .bui-switch-dot {
  fill: #757575;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  align-items: center;
  background-color: #fff;
  border-radius: 100%;
  -webkit-box-shadow: 0 3px 1px 0 rgba(0,0,0,.05),0 2px 2px 0 rgba(0,0,0,.1),0 3px 3px 0 rgba(0,0,0,.05);
  box-shadow: 0 3px 1px 0 rgba(0,0,0,.05),0 2px 2px 0 rgba(0,0,0,.1),0 3px 3px 0 rgba(0,0,0,.05);
  color: #757575;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 16px;
  justify-content: center;
  left: 2px;
  line-height: 16px;
  text-align: center;
  top: 2px;
  width: 16px;
}
.bui-switch .bui-switch-dot span {
  display: inline-block;
  font-size: 0;
  height: 10px;
  width: 10px;
}

</style>
