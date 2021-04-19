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
            <v-list-item @click="setIsSignIn(false)">
              <v-list-item-title>로그 아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-else plain @click="signInGoogle">
          <v-avatar size="30">
            <img :src="require('~/assets/img/google.png')" alt="sign-in" />
          </v-avatar>
          <span class="ml-2"> 로그인 </span>
        </v-btn>
        <div id="g-signin2"></div>
      </v-app-bar>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
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
    }),
    ...mapActions({
      signIn: 'signIn/signIn',
    }),
    signInGoogle() {
      console.log('loging - ing')
      this.$auth.login('google')
      console.log('loging - end')
    },
    onSignIn(user) {
      const profile = user.getBasicProfile()
      console.log('ID: ' + profile.getId())
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      // The ID token you need to pass to your backend:
      const idToken = user.getAuthResponse().id_token
      console.log('ID Token: ' + idToken)
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
