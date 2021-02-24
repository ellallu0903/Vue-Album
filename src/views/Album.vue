<template lang="pug">
  #album.min_hight
    b-container
      h1.text-center.my-3 ❮ Manage My wo ❯
      b-button.btn_modal(@click="modalShow = !modalShow")
        img(src="../assets/images/add.svg")
      b-button.toTop
        a(href="#")
          img(src="../assets/images/arrow-up.svg")
      b-modal(v-model="modalShow" centered hide-footer title="Add" header-bg-variant="dark" headerTextVariant="light" body-bg-variant="light")
        b-row
          b-col(cols="12")
            b-form(@submit.prevent="onSubmit")
              b-form-group#input-group-1(
                label="About this image："
                label-for="input-1"
                :state="descState"
                description="Up to 200 characters"
                invalid-feedback="Invalid format !"
              )
                b-form-textarea#input-1(
                  v-model="description"
                  type="text"
                  placeholder="Please enter a description . . ."
                  :state="descState"
                )
              img-inputer.w-100.mx-auto.mb-4(
                v-model="image"
                placeholder="Choose image"
                bottom-text="Choose or drop image here"
                :max-size="1024"
                exceedSizeText="檔案大小不能超過"
                accept="image/*"
                )
              b-btn.w-100(type="submit" variant="danger") Submit
      Photoswipe.mt-4.mb-5
        b-row
          b-col.p-1(cols="12" md="60" lg="3" v-for="(image,idx) in images" :key="image._id")
            b-card
              b-card-img(:src="image.src" v-pswp="image")
              b-card-body
                b-form-textarea.my-2(v-if="image.edit" v-model="image.model")
                b-card-text.my-2(v-else style="white-space: pre-wrap") {{ image.title }}
                hr
                div.text-center
                  b-btn.mr-2(v-if="image.edit" variant="outline-dark" @click="save(image)")
                    b-icon(icon="check2")
                  b-btn(v-if="image.edit" variant="outline-danger" @click="cancel(image)")
                    b-icon(icon="x")
                  b-btn.mr-2(v-if="!image.edit" variant="outline-dark" @click="edit(image)")
                    b-icon(icon="pencil-fill")
                  //- b-btn(v-if="!image.edit" variant="outline-danger" @click="del(image, idx)")
                  b-btn(v-if="!image.edit" variant="outline-danger" @click="showMsgBoxTwo(image, idx)")
                    b-icon(icon="trash2")
</template>

<script>
export default {
  name: 'Album',
  data () {
    return {
      image: null,
      description: '',
      images: [],
      modalShow: false,
      boxTwo: ''
    }
  },
  computed: {
    descState () {
      if (this.description.length === 0) {
        return null
      } else if (this.description.length > 200) {
        return false
      } else {
        return true
      }
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    onSubmit () {
      if (this.image.size > 1024 * 1024) {
        this.$swal({
          icon: 'error',
          title: 'Error !',
          text: '圖片尺寸太大'
        })
      } else if (!this.image.type.includes('image')) {
        this.$swal({
          icon: 'error',
          title: 'Error !',
          text: '檔案格式錯誤'
        })
      } else {
        const fd = new FormData()
        fd.append('image', this.image)
        fd.append('description', this.description)

        this.axios.post(process.env.VUE_APP_API + '/albums/', fd)
          .then(res => {
            if (res.data.success) {
              // 將新增的圖片塞進相簿陣列
              res.data.result.src = process.env.VUE_APP_API + '/albums/file/' + res.data.result.file
              res.data.result.title = res.data.result.description
              res.data.result.edit = false
              res.data.result.model = res.data.result.description
              delete res.data.result.file
              delete res.data.result.description
              this.images.push(res.data.result)
              // 送出後清空表單
              this.image = null
              this.description = ''
              this.modalShow = false
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
    cancel (image) {
      image.edit = false
      image.model = image.title
    },
    save (image) {
      this.axios.patch(process.env.VUE_APP_API + '/albums/' + image._id, { description: image.model })
        .then(res => {
          if (res.data.success) {
            image.edit = false
            image.title = image.model
            this.$swal({
              icon: 'success',
              title: 'Saved successfully!'
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
    },
    edit (image) {
      image.edit = true
      image.title = image.model
    },
    del (image, idx) {
      this.axios.delete(process.env.VUE_APP_API + '/albums/' + image._id)
        .then(res => {
          if (res.data.success) {
            this.images.splice(idx, 1)
            this.$swal({
              icon: 'success',
              title: 'Delete successfully!'
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
    },
    showMsgBoxTwo (image, idx) {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this image.', {
        title: 'Please Confirm',
        size: 'md',
        buttonSize: 'md',
        okVariant: 'danger',
        okTitle: 'Delete',
        cancelTitle: 'Cencel',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxTwo = value
          if (this.boxTwo) {
            this.axios.delete(process.env.VUE_APP_API + '/albums/' + image._id)
              .then(res => {
                if (res.data.success) {
                  this.images.splice(idx, 1)
                  this.$swal({
                    icon: 'success',
                    title: 'Delete successfully!'
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
                console.log(err)
              })
          }
        })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/albums/user/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          // .map 把陣列的內容重新組合，再加上 edit & model
          this.images = res.data.result.map(image => {
            image.src = process.env.VUE_APP_API + '/albums/file/' + image.file
            image.title = image.description
            image.edit = false
            image.model = image.description
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
  }
}
</script>
