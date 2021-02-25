<template lang="pug">
  #share.min_hight
    b-container
      b-button.toTop
        a(href="#")
          img(src="../assets/images/arrow-up.svg")
      h1.text-center.my-3 {{ users.account }} ❜s Wo
      div#url.text-center.col-11.col-lg-7.mx-auto
        span#copythis {{ this.url + this.userId }}
        span
          b-button.btn_Share(size="md" @click="CopyTextToClipboard('copythis')")
            b-icon(icon="clipboard")
      hr
      Photoswipe.mt-4.mb-5
        b-row
          b-col.p-1(cols="12" md="60" lg="3" v-for="(image,idx) in images" :key="image._id")
            div.profile-card-4.text-center
              img.img.img-responsive(:src="image.src" v-pswp="image")
              div.profile-content
                div.profile-description {{ image.title }}
    loading(:active.sync="isLoading" :can-cancel="true" background-color="black" loader="dots" height="70" width="70")
</template>
<script>
export default {
  data () {
    return {
      userId: this.$route.params.id,
      images: [],
      users: [],
      url: 'https://ellallu0903.github.io/vue-shareWo/#/share/',
      isLoading: true
    }
  },
  methods: {
    CopyTextToClipboard (id) {
      const TextRange = document.createRange()
      TextRange.selectNode(document.getElementById(id))
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(TextRange)
      document.execCommand('copy')
      this.$swal({
        icon: 'success',
        title: 'Success !',
        text: 'Copy successfully!'
      })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/albums/user/' + this.userId)
      .then(res => {
        if (res.data.success) {
          this.isLoading = false
          // .map 把陣列的內容重新組合，再加上 edit & model
          this.images = res.data.result.map(image => {
            image.src = process.env.VUE_APP_API + '/albums/file/' + image.file
            image.title = image.description

            delete image.file
            delete image.description
            return image
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

    this.axios.get(process.env.VUE_APP_API + '/users/' + this.userId)
      .then(res => {
        if (res.data.success) {
          // .map 把陣列的內容重新組合，再加上 edit & model
          this.users = res.data.result
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
}
</script>
