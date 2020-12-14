import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
// axios 套件
import axios from 'axios'
import VueAxios from 'vue-axios'
// sweetalert
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
// vue-img-inputer
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
// PhotoSwipe
import Photoswipe from 'vue-pswipe'
// vue-analytics
import VueAnalytics from 'vue-analytics'

import App from './App.vue'
import router from './router'
import store from './store'

// 傳送請求時一起傳送認證資訊
axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(Photoswipe)
Vue.component('ImgInputer', ImgInputer)
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
