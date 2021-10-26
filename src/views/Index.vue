<template>
  <div>
    <!-- Header -->
    <mt-header title="学子问答" class="myheader" fixed>
      <mt-button icon="back" slot="left"></mt-button>
      <div slot="right" v-if="this.$store.state.islogin==0">
        <router-link to="/login">登录</router-link>
        &nbsp;
        <router-link to="/register">注册</router-link>
      </div>
      <div slot="right" v-else>
        <span>欢迎：{{this.$store.state.userInfo.username}}</span>
      </div>
    </mt-header>

    <!-- 顶部导航 -->
    <mt-navbar class="navbar" v-model="navActive" fixed>
      <mt-tab-item v-for="(item,i) in category" :key="i" :id="item.id.toString()">
        {{item.category_name}}
      </mt-tab-item>
    </mt-navbar>

    <!-- 面板 -->
    <mt-tab-container style="margin-top:90px; margin-bottom:55px;">
      <mt-tab-container-item
        v-infinite-scroll="loadMore"
        infinite-scroll-distace="20"
        infinite-scroll-disabled="busy"
        :infinite-scroll-immediate-check="true">
        <!-- 轮播图 -->
        <mt-swipe :style="{height:h}" :auto="3000" :speed="100">
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

        <!-- 文章列表 -->
        <!-- 单一文章信息开始 -->
        <div class="articleItem" v-for="(item,i) in articles" :key="i">
          <router-link :to="`/article/${item.id}`">
            <!-- 文章标题开始 -->
            <div class="articleItem-header">{{item.subject}}</div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始  -->
              <div class="articleImg">
                <img v-if="item.image" :src="item.image" />
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章简介开始 -->
              <div class="articleDes">
                {{item.description}}
              </div>
              <!-- 文章简介结束 -->
            </div>
            <!-- 文章图文信息结束 -->
          </router-link>
        </div>
        <!-- 单一文章信息结束 -->

      </mt-tab-container-item>
    </mt-tab-container>

    <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected" fixed>
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
      navActive:'1',
      selected:'index',
      h:'110px',
      category:[],
      articles:[],
      busy:false,
      page:1
    }
  },
  watch:{
    // 监听导航变化
    navActive(newValue){
      // 获取当前激活的选项卡的ID
      let cid=newValue
      this.page=1
      this.loadData(cid,this.page,(articles)=>{
        this.articles=articles
      })
    },

    // 监听底部选项卡
    selected(newValue){
      if(newValue=='index'){
        this.$router.push('/')
      }else{
        this.$router.push('/me')
      }
    }
  },
  methods:{
    // 无限滚动加载列表数据
    loadMore(){
      console.log(`调用loadMore方法`);
      let cid=this.navActive//当前类别ID
      this.page++//获取下一页的页码
      this.loadData(cid,this.page,(articles)=>{
        this.articles=[...this.articles,...articles]
      })
    },

    /**加载文章列表数据
     * cid：类别ID
     * page：页码
     * callback：文章列表获取后，要执行的回调函数 */
    loadData(cid,page,callback){
      console.log(`loadData: cid:${cid} page:${page}`);
      this.$indicator.open("加载中...")
      this.axios.get(`articles?cid=${cid}&page=${page}`)
      .then(res=>{
        console.log(`加载文章列表`);
        console.log(res);
        // 用require处理文章缩略图
        res.data.results.forEach(item=>{
          if(item.image){
            item.image=require('../assets/images/articles/'+item.image)
          }
        })
        // 直接调用回调函数
        callback(res.data.results)
        this.$indicator.close()
      })
    },

    // 初始化轮播图高度（图片高度*屏幕宽度）/图片宽度
    initSwipeHeight(){
      let screenWidth=window.screen.width
      let picWidth=1242
      let picHeight=355
      let h=Math.floor((picHeight*screenWidth)/picWidth)+"px"
      this.h=h
    },
    // 加载类别列表
    initCategory(){
      this.axios.get('/category')
        .then(res=>{
          console.log(`加载类别列表`);
          console.log(res);
          // 把类别列表存入data
          this.category=res.data.results
      })
    },
    // 加载文章列表
    initArticles(){
      let cid=1
      let page=1
      this.loadData(cid,page,(articles)=>{
        this.articles=articles
      })
    }
  },
  mounted(){
    // 初始化轮播图高度
    this.initSwipeHeight()

    // 加载类别列表
    this.initCategory()

    // 加载文章列表
    this.initArticles()
    
  },
}
</script>
<style scoped>
.navbar{
  margin-top: 40px;
}
.myheader a{
  color: white;
}
.mint-swipe{
  height: 110px;
}
.mint-swipe img{
  width: 100%;
}
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>