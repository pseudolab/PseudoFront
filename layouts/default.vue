<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item :to="item.to" router exact>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-for="(group, i) in groups" :key="i.title">
          <v-list-group v-model="group.isActive" exact router value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="group.title" />
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(child, i) in group.childs"
              :key="i"
              :to="child.to"
              router
              exact
            >
              <v-list-item-content class="ml-7">
                <v-list-item-title v-text="child.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed hide-on-scroll app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="mainTitle" />
      <v-spacer />
      <v-btn> 로그인 </v-btn>
      <!-- <v-btn v-if="isLoggedIn" text @click="logout">
        로그아웃
      </v-btn>
      <v-btn v-else text nuxt to="/login">
        로그인
      </v-btn> -->
    </v-app-bar>
    <v-main>
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
      items: [
        {
          title: '홈페이지',
          to: '/',
        },
      ],
      groups: [
        {
          title: '커뮤니티',
          childs: [
            {
              title: '커뮤니티 홈',
              to: '/community/',
            },
            {
              title: '질문공간',
              to: '/community/query/',
            },
          ],
        },
      ],
      mainTitle: '가짜 연구소',
    }
  },
}
</script>
