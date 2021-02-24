import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'ShareWo',
      login: false
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      title: 'ShareWo | Sign up',
      login: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: 'ShareWo | Log in',
      login: false
    }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.vue'),
    meta: {
      title: 'ShareWo | Manage',
      login: true
    }
  },
  {
    path: '/share/:id',
    name: 'Share',
    component: () => import(/* webpackChunkName: "share" */ '../views/Share.vue'),
    meta: {
      login: false
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user) {
    next('/login')
  } else {
    next()
  }
})

// 如果是去相簿頁，就把 title 改成 '使用者的名稱' + 的相簿
router.afterEach((to, from) => {
  let title = ''
  if (to.name === 'Share') {
    title = store.state.user.name + ' ❜s Wo'
  } else {
    title = to.meta.title
  }

  document.title = title
})

export default router
