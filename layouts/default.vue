<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-responsive :aspect-ratio="1 / 1" height="64">
          <nuxt-link
            class="logo"
            tag="img"
            :src="require('~/assets/img/pseudoLab.png')"
            to="/"
            width="64"
          />
        </v-responsive>
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
        <v-btn plain>
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
export default {
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
