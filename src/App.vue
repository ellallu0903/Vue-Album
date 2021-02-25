<template lang="pug">
  div#app
    b-navbar(toggleable='lg' type="dark" variant="dark")
      b-navbar-brand(to='/')
        div#logo.ml-3 ShareWo
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav)
        b-navbar-nav.ml-auto
          b-nav-item.nav_item(v-if="user.id.length === 0" to='/reg') Sign up
            span.ml-3.d-none.d-lg-inline-block |
          b-nav-item.nav_item.mr-3(v-if="user.id.length === 0" to='/login') Log in
          b-nav-item.nav_item(v-if="user.id.length > 0" @click="toShare()") My Wo
            span.ml-3.d-none.d-lg-inline-block |
          b-nav-item.nav_item(v-if="user.id.length > 0" to='/album') Manage
            span.ml-3.d-none.d-lg-inline-block |
          b-nav-item.nav_item.mr-3(v-if="user.id.length > 0" @click="logout") Log out
    router-view
    footer#footer.text-center © 2021 All Rights Reserved
</template>

<script>
export default {
  name: 'App',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    toShare () {
      if (this.$route.path !== '/share/' + this.user.id) {
        this.$router.push('/share/' + this.user.id)
      }
    },
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: 'Success！',
              text: 'Hope you come back soon'
            })

            // 清除 vuex
            this.$store.commit('logout')

            // 導回首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$swal({
              icon: 'error',
              title: 'Error !',
              text: res.data.message
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$swal({
            icon: 'error',
            title: 'Error !',
            text: error.response.data.message
          })
        })
    },
    heartbeat () {
      this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.user.id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              this.$swal({
                icon: 'error',
                title: '錯誤',
                text: '登入時效已過，請重新登入'
              })
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '發生錯誤'
          })
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>
