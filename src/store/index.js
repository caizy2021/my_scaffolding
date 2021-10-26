import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:window.sessionStorage.getItem('islogin')?1:0,//存储当前登录状态
    userInfo:window.sessionStorage.getItem('userInfo')?JSON.parse(window.sessionStorage.getItem('userInfo')):{}//存储当前登录成功的用户信息
  },
  mutations: {
    // 该方法用于修改state中的islogin数据
    // $store.commit('loginOK)
    loginOK(state,userInfo){
      state.islogin=1
      state.userInfo=userInfo
      // 更新sessionStorage中的数据，用于持久化存储（当前会话生效）
      window.sessionStorage.setItem('islogin',1)
      // 把userInfo转成JSON字符串存入sessionStorage
      window.sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
    }
  },
  actions: {
  },
  modules: {
  }
})
