<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/navbar/NavBar.vue'

const title = ref('This is a Title')
const message = ref('This is a Message')


</script>

<template>
  <div>
    <a-flex class="parent" vertical>
      <div class="header">
        <NavBar/>
      </div>
      <div class="content">
        <a-row :gutter="24" class="landscape-card">
          <a-skeleton/>
        </a-row>
        <a-row :gutter="24" class="recommend-card">
          <a-col :span="12">
            <a-skeleton/>
          </a-col>
          <a-col :span="12">
            <a-skeleton/>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-skeleton/>
        </a-row>
      </div>
      <div class="footer">footer</div>
    </a-flex>
  </div>
</template>

<style scoped>
.parent {
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  position: fixed;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 1200px;
  line-height: 600px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: grey;
  height: 100px;
}

.landscape-card {
  height: 200px;
}
.recommend-card {
  height: 300px;
}

</style>
