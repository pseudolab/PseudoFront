<template>
  <section class="profile d-flex justify-center my-15">
    <UserInfo :user-name="userName" :img-url="imgUrl" />
    <div class="ml-3">
      <Summary />
    </div>
  </section>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import UserInfo from '@/components/profile/UserInfo.vue'
import Summary from '@/components/profile/Summary.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    UserInfo,
    Summary,
  },
  mixins: [headMixin],
  //   // TODO: 유저 정보 검색 후 없을 경우 에러페이지로 이동
  // async fetch({ params, error }) {
  //   error({ statusCode: 404 })
  //   this.userId = params.userId
  // },
  data() {
    return {
      userName: '',
      imgUrl: '',
      userId: '',
    }
  },
  computed: {
    idToken() {
      return this.$store.state.signIn.idToken
    },
  },
  async mounted() {
    try {
      this.$axios.setHeader('auth-token', this.idToken)
      const res = await this.$axios.$get('/profiles/my')
      this.userName = res.userName
      this.imgUrl = res.photos[0].value
      this.setUserMail(res.userMail)
    } catch (e) {
      console.error(e)
    }
  },

  methods: {
    ...mapMutations({
      setUserMail: 'profile/SET_USER_MAIL',
      setDescription: 'profile/SET_DESCRIPTION',
      setRegion: 'profile/SET_REGION',
    }),
  },
  head() {
    return this.getHead({ pageName: 'profile' })
  },
}
</script>
