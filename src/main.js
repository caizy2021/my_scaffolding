import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 配置moment
import moment from 'moment'
Vue.prototype.moment=moment

// 配置axios
import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000/'
Vue.prototype.axios=axios

// 配置MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
