<template class="auth-test">
  <section>
    <div class="setting">
      <v-select
        v-model="method"
        class="method-selector"
        :items="methodTypes"
        outlined
        height="40px"
        dense
      />
      <v-text-field
        v-model="url"
        class="text-field"
        dense
        outlined
        height="40px"
      />
      <v-btn
        class="ml-3 primary white--text"
        height="40px"
        outlined
        @click="sendIdToken"
        >Send</v-btn
      >
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      methodTypes: ['post', 'get'],
      method: 'get',
      url: '',
    }
  },
  methods: {
    sendIdToken() {
      const idToken = this.$store.state.signIn.idToken
      if (idToken === null) {
        window.alert('아이디 토큰이 없습니다. 로그인을 먼저 진행해주세요')
        return
      }
      const method = '$' + this.method
      const axios = this.$axios[method]
      this.$axios.setHeader('auth-token', idToken)
      this.$nuxt.$loading.start()
      axios(this.url)
        .then((res) => {
          console.log('success', res)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.setting {
  display: flex;
  & .method-selector {
    flex: 1 0 100px;
  }
  & .text-field {
    flex: 5 0 500px;
  }
}
</style>
