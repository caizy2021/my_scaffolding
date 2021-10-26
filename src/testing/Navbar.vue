<template>
  <div>
    <!-- 导航 -->
    <mt-navbar v-model="navActive">
      <mt-tab-item id="1">导航1</mt-tab-item>
      <mt-tab-item id="2">导航2</mt-tab-item>
      <mt-tab-item id="3">导航3</mt-tab-item>
      <mt-tab-item id="4">导航4</mt-tab-item>
    </mt-navbar>

    <!-- 面板 -->
    <mt-tab-container class="tab-container" v-model="navActive">
      <mt-tab-container-item id="1">面板1</mt-tab-container-item>
      <mt-tab-container-item id="2">面板2</mt-tab-container-item>
      <mt-tab-container-item id="3">面板3</mt-tab-container-item>
      <mt-tab-container-item id="4">面板4</mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data(){
    return{
      navActive:'1'
    }
  }
}
</script>
<style scoped>
.tab-container{
  margin-top: 10px;
}
</style>