<template>
  <div></div>
</template>
<script scope="js">
import { mapActions } from 'vuex'
export default {
  name: 'callback',
  methods: {
    ...mapActions('app', ['fetchSingleInfo']),
    getInfo () {
      const { authToken } = this.$route.query
      if (authToken) {
        this.fetchSingleInfo({ authToken }).then(res => {
          if (res.code === 200 && res.data.userType === 1) {
            this.$router.replace('/workplace')
          }
        })
      }
    }
  },
  mounted () {
    this.getInfo()
  }
}
</script>
