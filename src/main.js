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
import VueGtag from 'vue-gtag'
// my_style
import myStyle from '../src/assets/css/my_style.css'
// bootstrap icon
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// vue-loading-overlay
import Loading from 'vue-loading-overlay' // component
import 'vue-loading-overlay/dist/vue-loading.css' // style

import App from './App.vue'
import router from './router'
import store from './store'

// 傳送請求時一起傳送認證資訊
axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.component('Loading', Loading)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(myStyle)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(Photoswipe)
Vue.component('ImgInputer', ImgInputer)
Vue.use(VueGtag, {
  config: {
    id: process.env.VUE_APP_GA
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
