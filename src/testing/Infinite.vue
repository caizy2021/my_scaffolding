<template>
  <div>
    <h1>无限滚动</h1>
    <div infinite-scroll-distance="20"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    :infinite-scroll-immediate-check="true">
      <p v-for="(item,i) of n" :key="i">{{item}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      n:50,
      busy:false
    }
  },
  methods:{
    // 触底后执行
    loadMore(){
      // 进入繁忙状态
      this.busy=true
      // 弹出等待框
      this.$indicator.open("请稍后...")
      // 打印loadMore
      console.log("loadMore");
      // 模拟耗时请求，当响应返回后（2秒）再更新列表
      window.setTimeout(()=>{
        this.n+=30
        // 退出繁忙状态，进入空闲状态
        this.busy=false
        // 关闭等待框
        this.$indicator.close()
      },1000)
    },
  },
}
</script>
<style scoped>
p{
  text-align: center;
  line-height: 35px;
  height: 35px;
  border-bottom: 1px solid;
}
</style>