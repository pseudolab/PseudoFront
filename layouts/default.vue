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
        <v-tabs color="point" icons-and-text>
          <v-tab class="pa-0 ma-0" style="min-width: 0px" to="/" />
          <v-tab
            v-for="(item, index) in items"
            :key="index + 1"
            class="navigation"
            :to="item.to"
          >
            {{ item.title }}
            <v-icon class="mr-1">{{ item.icon }}</v-icon>
          </v-tab>
        </v-tabs>

        <v-menu offset-y nudge-bottom="8">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="isSignIn"
              v-ripple="{ class: `point--text` }"
              plain
              v-bind="attrs"
              height="100%"
              v-on="on"
            >
              <img class="profile-img" :src="profileImageURL" width="50px" />
              <span class="ml-2"> {{ userName }} </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-ripple="{ class: `point--text` }"
              to="/profile"
              color="point"
            >
              <v-list-item-title>프로필</v-list-item-title>
            </v-list-item>
            <v-list-item v-ripple="{ class: `point--text` }" @click="onSignOut">
              <v-list-item-title>로그 아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-show="!isSignIn" id="g-signin2" />
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

export default {
  name: 'Default',
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
    userName() {
      return this.$store.state.profile.userName
    },
    profileImageURL() {
      return this.$store.state.profile.profileImageURL
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
      setUserInfo: 'profile/SET_USER_INFO',
    }),
    async onSignIn(user) {
      try {
        const authResponse = await user.getAuthResponse()
        const idToken = authResponse.id_token
        this.$axios.setHeader('auth-token', idToken)
        const res = await this.$axios.$get('/profiles/my')
        this.setToken(idToken)
        this.setUserInfo(res)
        this.setIsSignIn(true)
      } catch (e) {
        console.error(e)
      }
    },
    onSignOut() {
      const auth2 = window.gapi.auth2.getAuthInstance()
      auth2.signOut().then(() => {
        this.setToken(null)
        this.setIsSignIn(false)
        this.profileImgUrl = ''
        this.$router.push('/')
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
  font-weight: bold;
  flex-grow: 1;
  &:nth-of-type(2) {
    margin-left: auto;
  }
  &:last-of-type {
    margin-right: auto;
  }
}

.profile-img {
  border-radius: 50%;
}
</style>
