<template>
  <div>
    <!-- Header -->
    <mt-header title="学子问答">
      <mt-button icon="back" slot="left"></mt-button>
      <div slot="right" class="link">
        <router-link to="/login">登录</router-link>
      </div>
    </mt-header>

    <!-- Form -->
    <mt-field type="text" placeholder="请输入用户名" label="用户名" v-model="username" :state="usernameState"></mt-field>
    <mt-field type="password" placeholder="请输入密码" label="密码" v-model="pwd" :state="pwdState"></mt-field>
    <mt-field type="password" placeholder="请再次输入密码" label="确认密码" v-model="confirmPwd" :state="confirmPwdState"></mt-field>

    <!-- Button -->
    <mt-button type="primary" size="large" @click="checkForm">确认注册</mt-button>

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
      confirmPwd:'',
      confirmPwdState:''
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
    checkConfirmPwd(){
      if(this.pwd===this.confirmPwd){//成功
        this.confirmPwdState='success'
        return true
      }else{//失败
        this.confirmPwdState='error'
        this.$toast({
          message:'确认密码与密码内容不相同',
          position:'bottom',
          duration:3000
        })
        return false
      }
    },
    // 表单验证，用户名（6~15位单词字符），密码、确认密码（6位数字）
    checkForm(){
      // 验证表单
      // 三个表单都验证成功，则执行注册
      if(this.checkUsername()&&this.checkPwd()&&this.checkConfirmPwd()){
        // 注册业务
        let username=this.username
        let password=this.pwd
        this.axios.post('/register',
        `username=${username}&password=${password}`)
        .then(res=>{
          console.log(res);
          if(res.data.code==200){
            // 注册成功
            this.$router.push('/login')
          }else{
            // 注册失败
            this.$messagebox('提示','注册失败:'+res.data.message)
          }
        })
      }else{
        // 如果有验证失败的表单组件，提示
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