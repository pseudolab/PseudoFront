<template>
  <v-app>
    <v-main>
      <v-app-bar
        absolute
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
        height="64px"
      >
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
            <v-icon class="mr-1">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-tab>
        </v-tabs>

        <v-menu offset-y nudge-bottom="8">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="isSignIn"
              plain
              v-bind="attrs"
              height="100%"
              v-on="on"
            >
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
            <v-list-item to="/profile">
              <v-list-item-title>프로필</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-title>로그 아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-show="!isSignIn" id="g-signin2" />
        <v-btn v-else class="sign" plain @click="signIn">
          <v-avatar size="30">
            <img :src="require('~/assets/img/google.png')" alt="sign-in" />
          </v-avatar>
          <span class="ml-2"> 로그인 </span>
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="calc(100vh - 64px)"
        style="margin-top: 64px"
      >
        <v-container>
          <nuxt />
        </v-container>
      </v-sheet>
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
        { title: '아카이브', to: '/archive', icon: 'mdi-bank-outline' },
        { title: '커뮤니티', to: '/community', icon: 'mdi-chat' },
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
      this.setIsSignIn(true)
      this.setToken(idToken)
    },
    onSignOut() {
      const auth2 = window.gapi.auth2.getAuthInstance()
      auth2.signOut().then(() => {
        this.setIsSignIn(false)
        this.setToken(null)
      })
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
.sign {
  width: 200px;
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
