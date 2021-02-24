<template lang="pug">
  #reg.min_hight.flex_center
    div#reg_box.form_size
      b-row.w-100.p-4.p-lg-5
        b-col(cols="12")
          h1.text-center.font-weight-normal Sign up
          b-form(@submit.prevent="onSubmit" @reset="onReset")
            b-form-group#input-group-1(
              label="Account："
              label-for="input-1"
              :state="accountState"
              description="Account length must be between 4 and 20 characters."
              invalid-feedback="Invalid account !"
              )
              b-form-input#input-1(
                v-model="account"
                type="text"
                required placeholder="please enter account . . ."
                :state="accountState"
                )
            b-form-group#input-group-2(
              label="Password："
              label-for="input-2"
              :state="passwordState"
              description="Password length must be between 4 and 20 characters."
              invalid-feedback="Invalid password !"
              )
              b-form-input#input-2(
                v-model="password"
                type="password"
                required placeholder="please enter password . . ."
                :state="passwordState"
                )
            div.text-center.mt-5
              b-btn.w-100.mx-1.my-2(variant="secondary" type="submit") Submit
              //- b-btn.mx-1(variant="danger" type="reset") 重置
              hr
              b-link(to="/login") Log in
</template>

<script>
export default {
  name: 'Reg',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  computed: {
    accountState () {
      if (this.account.length === 0) {
        return null
      } else if (this.account.length >= 4 && this.account.length <= 20) {
        return true
      } else {
        return false
      }
    },
    passwordState () {
      if (this.password.length === 0) {
        return null
      } else if (this.password.length >= 4 && this.password.length <= 20) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 提交表單，post 到後台資料庫
    onSubmit () {
      // 如果帳號密碼驗證通過
      // 帳號 & 密碼都是 true 才會 post
      if (this.accountState && this.passwordState) {
        this.axios.post(process.env.VUE_APP_API + '/users/', this.$data)
          .then(res => {
            if (res.data.success) {
              this.$store.state.sign.account = this.account
              this.$swal({
                icon: 'success',
                title: 'Success！',
                text: 'Welcome to join ShareWo'
              }).then(() => {
                // sweet alert 對話框關掉後才跳到相簿頁
                this.$router.push('/login')
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Error !',
                text: res.data.message
              })
            }
          })
          .catch(err => {
            this.$swal({
              icon: 'error',
              title: 'Error !',
              text: err.response.data.message
            })
          })
      }
    },
    // 重置表單
    onReset () {
      this.account = ''
      this.password = ''
    }
  }
}
</script>
