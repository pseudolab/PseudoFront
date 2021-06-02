<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <nuxt-link
          class="logo"
          tag="img"
          :src="require('~/assets/img/pseudoLab.png')"
          to="/"
          height="100%"
        />
        <v-tabs>
          <v-tab class="pa-0 ma-0" style="min-width: 0px" to="/" />
          <v-tab
            v-for="(item, index) in items"
            :key="index + 1"
            class="navigation"
            :to="item.to"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>

        <v-menu v-if="isSignIn" offset-y nudge-bottom="8">
          <template v-slot:activator="{ on, attrs }">
            <v-btn plain v-bind="attrs" height="100%" v-on="on">
              <UserProfile
                :img-url="require('~/assets/img/test.png')"
                exp-color="red"
                :exp="30"
                :remain-exp="40"
                :width="50"
              />
              <span class="ml-2"> 사용자 1 </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="onSignOut">
              <v-list-item-title>로그 아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else id="g-signin2" />
        <v-btn @click="sendIdToken">서버로 토큰 보내기</v-btn>
      </v-app-bar>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import UserProfile from '@/components/common/UserProfile.vue'

export default {
  components: {
    UserProfile,
  },
  data() {
    return {
      drawer: false,
      activeTab: 0,
      items: [
        { title: '아카이브', to: '/archive' },
        { title: '커뮤니티', to: '/community' },
      ],
      mainTitle: '가짜 연구소',
    }
  },
  computed: {
    isSignIn() {
      return this.$store.state.signIn.isSignIn
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.gapi.signin2.render('g-signin2', {
        onsuccess: this.onSignIn,
      })
    })
  },
  methods: {
    ...mapMutations({
      setIsSignIn: 'signIn/SET_IS_SIGN_IN',
      setToken: 'signIn/SET_TOKEN',
    }),
    onSignIn(user) {
      const idToken = user.getAuthResponse().id_token
      console.log('ID Token: ' + idToken)
      this.setIsSignIn(true)
      this.setToken(idToken)
    },
    onSignOut() {
      this.setIsSignIn(false)
      this.setToken(null)
    },
    sendIdToken() {
      const idToken = this.$store.state.signIn.idToken
      if (idToken === null) {
        console.error('아이디 토큰이 없습니다. 로그인을 먼저 진행해주세요')
        return
      }
      this.$axios
        .$get(`http://localhost:4000/routes/profiles/my?id_token=${idToken}`)
        .then((res) => {
          console.log('success', res)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.logo {
  cursor: pointer;
}
.navigation {
  flex-grow: 1;
  &:nth-of-type(2) {
    margin-left: auto;
  }
  &:last-of-type {
    margin-right: auto;
  }
}
</style>
