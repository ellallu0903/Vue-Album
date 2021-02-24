<template lang="pug">
  div#home
    div.row.w-100.h-100.py-lg-5.pl-lg-5.m-0
      div.col-12.col-lg-4.p-0
        div.row.h-100.w-100.m-0
          div#home_content.col-12.text-center.text-lg-right.pr-lg-3
            div#home_title.mr-lg-2 ShareWo
            div#home_subtitle.mr-lg-2 Share yourself on this wall
            div.mt-4.mr-lg-2
              b-button.w-25.hvr-sweep-to-right(squared @click="getStart()") Start
      div#home_right.d-none.d-lg-block.col-8
</template>

<script>
export default {
  name: 'Home',
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    getStart () {
      if (this.user.id.length > 0) {
        this.$router.push('/album')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
