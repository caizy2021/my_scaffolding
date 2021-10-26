<template>
  <div>
    <h1>我的个人信息页面</h1>
    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <img v-if="selected=='index'" slot="icon" src="../assets/main_1.png" alt="">
        <img v-else slot="icon" src="../assets/main_0.png" alt="">
        首页
      </mt-tab-item>
      <mt-tab-item id="me">
        <img v-if="selected=='me'" slot="icon" src="../assets/me_1.png" alt="">
        <img v-else slot="icon" src="../assets/me_0.png" alt="">
        我的
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>
<script>
export default {
  data(){
    return{
      selected:'me'
    }
  },
  watch:{
    selected(newValue){
      if(newValue=='index'){
        this.$router.push('/')
      }else{
        this.$router.push('/me')
      }
    }
  }
}
</script>
<style scoped>
.myheader a{
  color: white;
}
</style>