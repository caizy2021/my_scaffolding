<template>
  <div>
    <mt-swipe :style="{height:h}">
      <mt-swipe-item>
        <img src="../assets/1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/2.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/3.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/4.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/5.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/6.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data(){
    return{
      h:'110px'
    }
  },
  mounted(){
    // 初始化轮播图高度（图片高度*屏幕宽度）/图片宽度
    let screenWidth=window.screen.width
    let picWidth=1242
    let picHeight=355
    let h=Math.floor((picHeight*screenWidth)/picWidth)+"px"
    this.h=h
  },
}
</script>
<style scoped>
.mint-swipe{
  height: 110px;
}
.mint-swipe img{
  width: 100%;
}
</style>