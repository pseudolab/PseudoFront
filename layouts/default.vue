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
            <v-btn class="sign" plain v-bind="attrs" height="100%" v-on="on">
              <UserProfile
                v-if="isSignIn"
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
            <v-list-item to="/profile">
              <v-list-item-title>프로필</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-title>로그 아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-else class="sign" plain @click="signIn">
          <v-avatar size="30">
            <img :src="require('~/assets/img/google.png')" alt="sign-in" />
          </v-avatar>
          <span class="ml-2"> 로그인 </span>
        </v-btn>
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
  methods: {
    ...mapMutations({
      signIn: 'signIn/signIn',
      signOut: 'signIn/signOut',
    }),
  },
}
</script>
<style lang="scss" scoped>
.logo {
  cursor: pointer;
}
.sign {
  width: 300px;
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
