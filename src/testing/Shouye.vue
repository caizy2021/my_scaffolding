<template>
  <div>
    首页
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index">
        <img slot="icon" v-if="selected=='index'" src="../assets/main_1.png" alt="">
        <img slot="icon" v-else src="../assets/main_0.png" alt="">
        首页
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img slot="icon" v-if="selected=='cart'" src="../assets/cart_1.png" alt="">
        <img slot="icon" v-else src="../assets/cart_0.png" alt="">
        购物车
      </mt-tab-item>
      <mt-tab-item id="me">
        <img slot="icon" v-if="selected=='me'" src="../assets/me_1.png" alt="">
        <img slot="icon" v-else src="../assets/me_0.png" alt="">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return{
      selected:'index'
    }
  },
  watch:{
    selected(newValue){
      if(newValue=='index'){
        this.$router.push('/shouye')
      }else if(newValue=='cart'){
        this.$router.push('/gouwuche')
      }else if(newValue=='me'){
        this.$router.push('/wode')
      }
    }
  }
}
</script>