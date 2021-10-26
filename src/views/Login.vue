<template>
  <div>
    <!-- Header -->
    <mt-header title="学子问答">
      <mt-button icon="back" slot="left"></mt-button>
      <div slot="right" class="link">
        <router-link to="/register">注册</router-link>
      </div>
    </mt-header>

    <!-- Form -->
    <mt-field type="text" placeholder="请输入用户名" label="用户名" v-model="username" :state="usernameState"></mt-field>
    <mt-field type="password" placeholder="请输入密码" label="密码" v-model="pwd" :state="pwdState"></mt-field>

    <!-- Button -->
    <mt-button type="primary" size="large" @click="checkForm">快速登录</mt-button>

  </div>
</template>
<script>
export default{
  data(){
    return{
      username:'',
      usernameState:'',
      pwd:'',
      pwdState:'',
    }
  },
  methods:{
    checkUsername(){
      let exp=/^\w{6,15}$/
      if(exp.test(this.username)){//成功
        this.usernameState='success'
        return true
      }else{//失败
        this.usernameState='error'
        this.$toast({
          message:'用户名格式错误（6~15位字母数字下划线）',
          position:'bottom',
          duration:3000
        })
        return false
      }
    },
    checkPwd(){
      let exp=/^\d{6}$/
      if(exp.test(this.pwd)){//成功
        this.pwdState='success'
        return true
      }else{//失败
        this.pwdState='error'
        this.$toast({
          message:'密码格式错误（6位数字）',
          position:'bottom',
          duration:3000
        })
        return false
      }
    },
    // 表单验证，用户名（6~15位单词字符），密码（6位数字）
    checkForm(){
      // 验证表单
      if(this.checkUsername()&&this.checkPwd()){//成功
        // 登录业务
        let username=this.username
        let password=this.pwd
        this.axios.post('/login',
        `username=${username}&password=${password}`)
        .then(res=>{
          console.log(res);
          if(res.data.code==200){
            // 登录成功
            // 修改vuex中的登录状态 islogin=1
            this.$store.commit('loginOK',res.data.result)
            // 跳转到主页index
            this.$router.push('/')
          }else{
            // 登录失败
            this.$messagebox('提示','登录失败:'+res.data.message)
          }
        })
      }else{//失败

      }
    }
  }
}
</script>
<style scoped>
.link a{
  color:white;
}
</style>